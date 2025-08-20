# User Authentication System

A complete **User Authentication System** built with:

- **Backend (Java):** Spring Boot (handles user authentication, database, email reset)
- **Backend (Python):** FastAPI (extra API services such as NLQ → SQL, or integrations)
- **Frontend:** React (Vite)

---

## 📂 Project Structure

```
UserAuthSystem/
  ├── backend-java/        # Java Spring Boot backend API
  ├── backend-python-api/  # Python FastAPI backend API
  └── frontend/            # React frontend (Vite)
```

---

## 🚀 Backend Setup (Java Spring Boot)

### 1️⃣ Navigate to Java backend folder

```sh
cd backend-java
```

### 2️⃣ Configure Database

Edit `src/main/resources/application.properties` with your database credentials:

```properties
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=UserLoginDB
spring.datasource.username=YOUR_DB_USERNAME
spring.datasource.password=YOUR_DB_PASSWORD
```

### 3️⃣ Run the backend

**Option 1 (IntelliJ):**

- Open `backend-java`
- Run `UserAuthSystemApplication` main class

**Option 2 (Maven):**

```sh
mvn spring-boot:run
```

Backend will run on 👉 `http://localhost:8080`

---

## ⚡ Backend Setup (Python FastAPI)

### 1️⃣ Navigate to Python backend folder

```sh
cd backend-python-api
```

### 2️⃣ Create & activate virtual environment

```sh
python -m venv venv
# On Windows PowerShell
venv\Scripts\Activate.ps1
# On macOS/Linux
source venv/bin/activate
```

### 3️⃣ Install dependencies

```sh
pip install -r requirements.txt
```

### 4️⃣ Run the FastAPI server

```sh
uvicorn main:app --reload
```

FastAPI will run on 👉 `http://127.0.0.1:8000`

You can test the API docs at 👉 `http://127.0.0.1:8000/docs`

---

## 🎨 Frontend Setup (React + Vite)

### 1️⃣ Navigate to frontend folder

```sh
cd frontend
```

### 2️⃣ Install dependencies

```sh
npm install
```

### 3️⃣ Start the development server

```sh
npm run dev
```

Frontend will be available at 👉 `http://localhost:5173` (default Vite port)

---

## 🔑 Features

- **User Sign Up** – Create an account with username, email, and password
- **User Sign In** – Authenticate with username & password
- **Sign Out** – Secure logout with no-cache headers
- **Forgot Password** – Email-based reset code
- **Reset Password** – Update password securely
- **Python API** – Extendable API layer (e.g., natural language queries, data services, ML integration)

---

## 🛠 Tech Stack

### Backend (Java):

- Java 17
- Spring Boot
- Spring Security
- Spring Data JPA
- SQL Server
- BCrypt Password Encoding

### Backend (Python):

- Python 3.10+
- FastAPI
- Uvicorn
- Pydantic
- SQLAlchemy / PyODBC (optional for DB access)

### Frontend:

- React (Vite)
- CSS Modules
- Axios

---

## 📧 Email Service (Java backend)

The password reset feature uses Gmail SMTP.  
Configure your credentials in `application.properties`:

```properties
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=YOUR_GMAIL_ADDRESS
spring.mail.password=YOUR_APP_PASSWORD
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

⚠️ Use an **App Password** instead of your real Gmail password for security.

---

## 🤝 Contributing

1. Fork the repo
2. Create a new branch (`feature/my-feature`)
3. Commit your changes (`git commit -m "Add my feature"`)
4. Push to your branch (`git push origin feature/my-feature`)
5. Open a Pull Request

---
