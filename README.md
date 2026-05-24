# 🚼 DevPulse API

> Internal Tech Issue & Feature Tracker API  
> A collaborative backend platform for software teams to report bugs, suggest features, and manage issue workflows.

---

# 🌐 Live Links

- 🔗 Live API: https://devpulse-b7a2.onrender.com/

---

# ✨ Features

## 🔐 Authentication & Authorization
- User Registration
- User Login with JWT
- Password Hashing using bcrypt
- Role-based Authorization
- Protected Routes

## 🐞 Issue Management
- Create Issues
- Get All Issues
- Get Single Issue
- Update Issues
- Delete Issues
- Issue Filtering & Sorting

## 👥 User Roles
### Contributor
- Create issue
- View issues
- Update own issue (only if status is `open`)

### Maintainer
- All contributor permissions
- Update any issue
- Delete any issue
- Change issue status independently

---

# 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| Node.js | Runtime Environment |
| Express.js | Backend Framework |
| TypeScript | Type Safety |
| PostgreSQL | Database |
| pg | PostgreSQL Driver |
| JWT | Authentication |
| bcrypt | Password Hashing |
| dotenv | Environment Variables |
| cors | Cross-Origin Resource Sharing |

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/ars2k03/DevPulse_B7A2.git
```

## 2️⃣ Move Into Project Directory

```bash
cd DevPulse_B7A2
```

## 3️⃣ Install Dependencies

```bash
npm install
```

## 4️⃣ Create `.env` File

```env
PORT=8000

DATABASE_URL=your_postgresql_database_url

JWT_SECRET=your_super_secret_key

```

## 5️⃣ Run Development Server

```bash
npm run dev
```

---

# 🗄️ Database Schema

## 👤 Users Table

| Field | Type |
|---|---|
| id | SERIAL PRIMARY KEY |
| name | VARCHAR |
| email | VARCHAR UNIQUE |
| password | TEXT |
| role | VARCHAR |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

---

## 🐞 Issues Table

| Field | Type |
|---|---|
| id | SERIAL PRIMARY KEY |
| title | VARCHAR(150) |
| description | TEXT |
| type | VARCHAR |
| status | VARCHAR |
| reporter_id | INTEGER |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

---

# 🔐 Authentication API

## ✅ Register User

### Endpoint
```http
POST /api/auth/signup
```

### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "contributor"
}
```

---

## ✅ Login User

### Endpoint
```http
POST /api/auth/login
```

### Request Body

```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

---

# 🐞 Issues API

## ✅ Create Issue

### Endpoint
```http
POST /api/issues
```

## ✅ Get All Issues

### Endpoint
```http
GET /api/issues
```

## ✅ Get Single Issue

### Endpoint
```http
GET /api/issues/:id
```

## ✅ Update Issue

### Endpoint
```http
PATCH /api/issues/:id
```

## ✅ Delete Issue

### Endpoint
```http
DELETE /api/issues/:id
```

---

# 🔒 Authorization Rules

| Action | Contributor | Maintainer |
|---|---|---|
| Create Issue | ✅ | ✅ |
| View Issues | ✅ | ✅ |
| Update Own Open Issue | ✅ | ✅ |
| Update Any Issue | ❌ | ✅ |
| Delete Issue | ❌ | ✅ |
| Change Status | ❌ | ✅ |

---

# 📜 Scripts

```bash
npm run dev
npm run build
npm start
```

---

# 👨‍💻 Author

### A R S
Student, CSE — RUET
