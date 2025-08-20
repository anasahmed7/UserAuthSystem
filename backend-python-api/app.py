import os
import re
import pyodbc
import google.generativeai as genai
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load env
load_dotenv()

# Gemini
genai.configure(api_key=os.getenv("AIzaSyBSDaaYqVWEQ0V_3Ip_mSHTbX6u9Gp3mPM"))
model = genai.GenerativeModel("gemini-1.5-flash")

# FastAPI app
app = FastAPI(title="NLQ → SQL API")

# CORS (allow your React app)
allowed = os.getenv("ALLOWED_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in allowed],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_conn():
    """Create a new SQL Server connection."""
    driver = os.getenv("DB_DRIVER", "ODBC Driver 17 for SQL Server")
    conn = pyodbc.connect(
        f"DRIVER={{{driver}}};"
        f"SERVER={os.getenv('DB_SERVER', 'localhost')};"
        f"DATABASE={os.getenv('DB_NAME', 'UserLoginDB')};"
        f"UID={os.getenv('DB_USER', 'sa')};"
        f"PWD={os.getenv('DB_PASSWORD', 'agent_pass')};"
    )
    return conn


def ai_generate_sql(user_input: str) -> str:
    prompt = f"""
    You convert English to SQL (Microsoft SQL Server).
    Table: Client(columns: client_id, customer_first_name, customer_middle_name, customer_last_name,
    customer_name, assign_date, date_of_birth, email, address1, zip, country, expiration_date,
    status, region, Customer_PVC, issue_date).

    Rules:
    - Generate only safe, read-only SELECT queries.
    - Prefer a WHERE clause to avoid SELECT * on whole table.
    - Output ONLY the SQL (no explanations, no markdown).

    English: {user_input}
    """
    resp = model.generate_content(prompt)
    sql = (resp.text or "").strip()

    # extract SELECT … if model adds extra text
    m = re.search(r"(SELECT[\s\S]+)", sql, re.IGNORECASE)
    if m:
        sql = m.group(1).strip()

    # remove code fences if any
    sql = re.sub(r"^```sql|```$", "", sql, flags=re.IGNORECASE).strip()

    if not sql.lower().startswith("select"):
        raise ValueError("Unsafe query detected. Only SELECT is allowed.")
    return sql


class QueryIn(BaseModel):
    question: str


@app.get("/api/ping")
def ping():
    return {"ok": True, "msg": "pong"}


@app.post("/api/nlq")
def nlq(q: QueryIn):
    try:
        sql = ai_generate_sql(q.question)
        with get_conn() as conn:
            cur = conn.cursor()
            cur.execute(sql)
            cols = [c[0] for c in cur.description] if cur.description else []
            rows = [list(r) for r in cur.fetchall()] if cur.description else []
        return {"ok": True, "sql": sql, "columns": cols, "rows": rows}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
