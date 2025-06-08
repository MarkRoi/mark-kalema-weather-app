# mark-kalema-weather-app

This project is a **Software Engineer Intern Task** submission – a Weather App built with **FastAPI** (backend), **React** (frontend), and **Supabase (PostgreSQL)**, featuring JWT authentication and ETL for real-time weather data from the **Open-Meteo API**.

---

## 🌟 Stack Choices & Why

- **Backend**: FastAPI  
  Async capabilities, automatic Swagger docs, and fast API development.

- **Database**: Supabase (PostgreSQL)  
  Free tier, easy setup, and SQLAlchemy compatibility.

- **Frontend**: React with Vite  
  Fast development and modern UI features.

- **Auth**: JWT  
  Simple implementation and a demo token for read-only access.

- **ETL**:  
  Implemented as a FastAPI background task with **3 retries** and **exponential backoff** for reliability.

- **Testing**: Pytest  
  Chosen for backend ETL testing due to its simplicity and seamless integration with FastAPI.

---

## 🚀 Quick Start Instructions

### 1️⃣ Prerequisites

✅ Docker and Docker Compose installed  
✅ Supabase account with a PostgreSQL database created  
✅ Connection URL for the database  
✅ Generate a JWT secret key (e.g., `openssl rand -hex 32`)

---

### 2️⃣ Setup

- **Clone the repo:**
- git clone --branch master https://github.com/MarkRoi/mark-kalema-weather-app.git
- cd mark-kalema-weather-app

- copy .env.example .env
- Set DB_URL and SECRET_KEY in .env

- **Start the app**
- docker compose up --build

---

### 3️⃣ Regenerate Demo Token ((Optional))

✅ Ensure generate_token.py exists (create it if missing using the earlier script)
✅ Run: cd D:\Programs\WEATHER-APP >> python generate_token.py
   
---

## Testing Instructions
- **Run Pytest for Backend ETL**:
  - pytest # From project root
# OR
  - cd backend
  - pytest tests/

---

### 🌐 Access

- **Backend API**: [http://localhost:8000](http://localhost:8000)  
- **Frontend UI**: [http://localhost:5173](http://localhost:5173)  
- **Trigger ETL**:  http POST [http://localhost:8000/fetch-weather](http://localhost:8000/fetch-weather)

---

### 🔑 Demo Token or Test Credentials

- **Demo Token**:  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkZW1vX3VzZXIifQ.o88Jdd-_76Gs2s3wvjLDORBbjpBdS7pPmLl2UJbAhbA (replace with a freshly generated token using the script in the repo; expires 30 minutes from generation)
Usage: Include in Authorization header as Bearer <token> for /weather endpoint access.

---

### 📌 What I'd Do Next with More Time

✅ Add pagination to the /weather endpoint
✅ Implement a CI pipeline with GitHub Actions for testing and deployment
✅ Enhance UI with search/filter options for weather data
✅ Add more tests for API endpoints and frontend components