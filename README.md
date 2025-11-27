Personal Expense Tracker – Backend API
Node.js + Express + PostgreSQL + Sequelize
1. Overview

This project is a backend-focused Personal Expense Tracker API, developed as part of a One-Day Assignment.

It demonstrates important backend engineering skills:

REST API development

Routing & controllers

Request validation

Database modelling (Sequelize ORM)

Clean architecture (services + controllers)

Proper error handling

Structured JSON responses

PostgreSQL integration using Sequelize

Optional JWT authentication

2. Objective

The API enables users to:

Add expenses

Update expenses

Delete expenses

Fetch all expenses

Fetch a single expense

Get category-wise + total summary

(Bonus) Pagination, filters, monthly statistics

(Bonus) Basic JWT Authentication

Database storage is done in PostgreSQL (Render), using Sequelize ORM.

3. Requirements
3.1 Core API Endpoints
Action	Method	Route
Create Expense	POST	/api/expenses
List All Expenses	GET	/api/expenses
Get Single Expense	GET	/api/expenses/:id
Update Expense	PUT	/api/expenses/:id
Delete Expense	DELETE	/api/expenses/:id
Summary	GET	/summary
Expense Fields

title – string (required)

category – string (required)

amount – decimal, > 0 (required)

date – date (required)

3.2 Optional Bonus Features Implemented

Pagination (page, limit)

Date range filter (start_date, end_date)

Category filter (?category=Food)

Monthly statistics endpoint – /api/expenses/stats/monthly

JWT Authentication (basic)

Seeder script with sample data

3.3 SQL Schema (From Migrations)

Migration file:
src/migrations/20251127015701-create-expense.js

expenses Table Structure

id → integer (PK, auto-increment)

title → string (required)

category → string (required)

amount → decimal(12,2)

date → DATE

createdAt → timestamp

updatedAt → timestamp

4. Sample API JSON
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

5. Setup Instructions
5.1 Clone Repository
git clone <your-repo-url>
cd expense-tracker

5.2 Install Dependencies
npm install

5.3 Configure Environment Variables

Create a .env file:

DB_HOST=<your-host>
DB_PORT=5432
DB_NAME=<your-db-name>
DB_USER=<your-username>
DB_PASS=<your-password>

DATABASE_URL=postgres://user:pass@host:5432/dbname

JWT_SECRET=supersecret123
PORT=3000
NODE_ENV=development

5.4 Run Migrations
npx sequelize-cli db:migrate

5.5 (Optional) Seed Data
npx sequelize-cli db:seed:all

5.6 Start Server
Development
npm run dev

Production
npm start

6. API Testing (Postman)
6.1 Authentication (Bonus)
Login:

POST → /auth/login

{
  "username": "admin",
  "password": "admin123"
}


Use the returned token in Postman → Authorization → Bearer Token

6.2 Expenses CRUD
Create Expense

POST → /api/expenses

List All Expenses

GET → /api/expenses

Supports:

page

limit

start_date

end_date

category

Single Expense

GET → /api/expenses/:id

Update

PUT → /api/expenses/:id

Delete

DELETE → /api/expenses/:id

6.3 Summary Endpoint

GET → /summary

Returns:

total expense

per-category totals

6.4 Monthly Statistics

GET → /api/expenses/stats/monthly

Example response:

{
  "2025-11": 1510
}
