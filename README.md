Personal Expense Tracker – Backend API

Node.js + Express + PostgreSQL + Sequelize

1. Overview

This project is a backend-focused Personal Expense Tracker API, built as part of the One-Day Assignment.
The goal is to demonstrate backend design skills including:

REST API development

Routing & controllers

Validation

Database modelling

Clean code and service-layer architecture

Proper error handling

Structured responses

A minimal backend-only solution is implemented using Node.js, Express, and PostgreSQL (Render).

2. Objective

The API allows users to:

Add expenses

Update expenses

Delete expenses

Fetch all expenses

Fetch a single expense

Fetch category-wise + total summary

(Bonus) Apply pagination, filters, monthly statistics

(Bonus) JWT-based lightweight authentication

Store data using PostgreSQL with Sequelize ORM

3. Requirements
   3.1 Core API Endpoints
   Action Method Route
   Create Expense POST /api/expenses
   List All Expenses GET /api/expenses
   Get Single Expense GET /api/expenses/:id
   Update Expense PUT /api/expenses/:id
   Delete Expense DELETE /api/expenses/:id
   Summary GET /summary

Expense Fields:

title (string, required)

category (string, required)

amount (decimal, required, > 0)

date (date, required)

3.2 Optional Bonus Features Implemented

Pagination (page, limit)
Date-range filter (start_date, end_date)
Category filter (?category=Food)
Monthly stats endpoint (GET /api/expenses/stats/monthly)
JWT Authentication (Bonus)
Seeder script with sample data

3.3

## SQL Schema (from migrations)

The database schema is defined through Sequelize migrations.

Migration file: `src/migrations/20251127015701-create-expense.js`

This migration creates the `expenses` table with the following structure:

- id: integer (PK, auto-increment)
- title: string (required)
- category: string (required)
- amount: decimal(12,2)
- date: DATE
- createdAt: timestamp
- updatedAt: timestamp

6.  Sample API JSON
    POST /api/expenses (Request)
    {
    "title": "Lunch at Subway",
    "category": "Food",
    "amount": 250,
    "date": "2025-11-25"
    }

GET /summary (Response)
{
"total_expense": 3450,
"category_totals": {
"Food": 1250,
"Travel": 900,
"Bills": 1300
}
}

7. Setup Instructions
1. Clone Repository
   git clone <your-repo-url>
   cd expense-tracker

1. Install Dependencies
   npm install

1. Configure Environment Variables

Create a .env:

DB_HOST=<your-host>
DB_PORT=5432
DB_NAME=<your-db-name>
DB_USER=<your-username>
DB_PASS=<your-password>
DATABASE_URL=postgres://user:pass@host:5432/dbname
JWT_SECRET=supersecret123
PORT=3000
NODE_ENV=development

4. Run Migrations
   npx sequelize-cli db:migrate

5. (Optional) Seed Data
   npx sequelize-cli db:seed:all

6. Start Server

Development:

npm run dev

Production:

npm start

8. API Testing (Postman)
   Authentication

Before calling protected routes:

POST /auth/login

{
"username": "admin",
"password": "admin123"
}

Use returned token in Postman → Authorization → Bearer Token

Expenses CRUD
Create Expense

POST /api/expenses

List All Expenses

GET /api/expenses
Supports:

page, limit

start_date, end_date

category

Single Expense

GET /api/expenses/:id

Update

PUT /api/expenses/:id

Delete

DELETE /api/expenses/:id

Summary Endpoint

GET /summary
Returns total + per-category totals.

Monthly Statistics

GET /api/expenses/stats/monthly
Returns:

{ "2025-11": 1510 }
