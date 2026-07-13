# Expense Tracker

A full-stack expense tracking app built with React and Express. Users can register, log in, and manage their own personal expenses, all backed by a MongoDB database — so your data is tied to your account and persists across sessions and devices.

## Features

- **User authentication** — register and log in with email/password (JWT-based sessions)
- **Password visibility toggle** on login and registration forms
- **Per-user expense tracking** — add, edit, and delete expenses tied to your account
- **Persistent storage** — expenses are saved in MongoDB, not just local state, so they're still there after logging out and back in
- **Protected API routes** — only the logged-in user can view or modify their own expenses

## Tech Stack

**Frontend**
- React (Vite)
- React Router
- React Hook Form + Zod (validation)
- lucide-react (icons)

**Backend**
- Node.js + Express
- MongoDB with Mongoose
- JWT (jsonwebtoken) for authentication
- bcryptjs for password hashing
- CORS

## Project Structure

```
my-react-app/
├── src/                    # React frontend
│   ├── loginform.jsx
│   ├── register.jsx
│   ├── home.jsx             # Expense tracker UI
│   └── ...
├── backend/
│   ├── src/
│   │   ├── config/          # Database connection
│   │   ├── controllers/     # Route logic (auth, expenses)
│   │   ├── middleware/       # JWT auth middleware
│   │   ├── models/          # Mongoose schemas (User, Expense)
│   │   ├── routes/          # API route definitions
│   │   ├── app.js
│   │   └── index.js
│   └── package.json
└── package.json
```

## Getting Started

### Prerequisites

- Node.js installed
- A MongoDB database (e.g. a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)

### 1. Clone the repository

```bash
git clone git@github.com:Lordwick5/Expense-Tracker.git
cd Expense-Tracker
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret_string
```

Start the backend server:

```bash
node src/index.js
```

The API will run on `http://localhost:4000` by default.

### 3. Set up the frontend

From the project root:

```bash
npm install
```

Create a `.env` file in the project root with:

```
VITE_API_URL=http://localhost:4000
```

Start the frontend dev server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## API Endpoints

| Method | Endpoint              | Description                          | Auth required |
|--------|-----------------------|--------------------------------------|----------------|
| POST   | `/api/auth/register`  | Create a new account                 | No             |
| POST   | `/api/auth/login`     | Log in and receive a JWT             | No             |
| GET    | `/api/expenses`       | Get all expenses for the logged-in user | Yes         |
| POST   | `/api/expenses`       | Add a new expense                    | Yes            |
| PUT    | `/api/expenses/:id`   | Update an existing expense           | Yes            |
| DELETE | `/api/expenses/:id`   | Delete an expense                    | Yes            |

Authenticated requests require an `Authorization: Bearer <token>` header, where `<token>` is the JWT returned on login/registration.

## Roadmap / Ideas

- Expense categories and filtering
- Monthly spending summaries or charts
- Export expenses to CSV

## License

Copyright (c) 2026 Prashant Chaudhary. All rights reserved.
 
This project was created for personal and educational purposes. You may view and reference the code for learning purposes, but copying, redistributing, or using it for commercial purposes without permission is not allowed.
