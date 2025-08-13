# User Authentication System

A complete **User Authentication System** built with:

- **Backend:** Java Spring Boot  
- **Frontend:** React (Vite)  
- Features: Sign Up, Sign In, Sign Out, Forgot Password (with email verification & reset)

---

## 📂 Project Structure

```
UserAuthSystem/
  ├── backend/    # Spring Boot API
  └── frontend/   # React frontend (Vite)
```

---

## 🚀 Backend Setup (Spring Boot)

### 1️⃣ Navigate to backend folder
```bash
cd backend
```

### 2️⃣ Configure Database
Edit `src/main/resources/application.properties` (or `.yml`) with your database credentials:
```properties
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=UserLoginDB
spring.datasource.username=YOUR_DB_USERNAME
spring.datasource.password=YOUR_DB_PASSWORD
```

### 3️⃣ Run the backend
If using IntelliJ:
- Open `backend` folder
- Run `UserAuthSystemApplication` main class

Or using Maven:
```bash
mvn spring-boot:run
```

---

## 🎨 Frontend Setup (React + Vite)

### 1️⃣ Navigate to frontend folder
```bash
cd frontend
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Start the development server
```bash
npm run dev
```

The app will be available at:  
👉 `http://localhost:5173` (default Vite port)

---

## 🔑 Features

- **User Sign Up** – Create an account with username, email, and password
- **User Sign In** – Authenticate with username & password
- **Sign Out** – Secure logout with no-cache headers
- **Forgot Password** – Email-based reset code
- **Reset Password** – Update password securely

---

## 🛠 Tech Stack

**Backend:**
- Java 17
- Spring Boot
- Spring Security
- Spring Data JPA
- SQL Server
- BCrypt Password Encoding

**Frontend:**
- React (Vite)
- CSS Modules
- Axios

---

## 📧 Email Service
The password reset feature uses Gmail SMTP.  
Configure your credentials in `application.properties`:

```properties
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=YOUR_GMAIL_ADDRESS
spring.mail.password=YOUR_APP_PASSWORD
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true

