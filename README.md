## Personal Expense Tracker – Backend API
## Node.js + Express + PostgreSQL + Sequelize
## Overview 

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

## 2 - Objective


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

## Requirements

## Core API Endpoints
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

## Optional Bonus Features Implemented

Pagination (page, limit)

Date range filter (start_date, end_date)

Category filter (?category=Food)

Monthly statistics endpoint – /api/expenses/stats/monthly

JWT Authentication (basic)

Seeder script with sample data

## SQL Schema (from migrations)

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

### 5 - Setup Instructions
## Clone Repository
## git clone <your-repo-url>
## cd expense-tracker
## Install Dependencies
## npm install

##  Configure Environment Variables
## Create a .env file:

DB_HOST=<your-host>
DB_PORT=5432
DB_NAME=<your-db-name>
DB_USER=<your-username>
DB_PASS=<your-password>

DATABASE_URL=postgres://user:pass@host:5432/dbname

JWT_SECRET=supersecret123
PORT=3000
NODE_ENV=development

## Run Migrations
npx sequelize-cli db:migrate

##  (Optional) Seed Data
npx sequelize-cli db:seed:all

##  Start Server
Development
npm run dev

## Production
npm start

##  API Testing (Postman)
## Authentication (Bonus)
Login:

POST → /auth/login

{
  "username": "admin",
  "password": "admin123"
}


Use the returned token in Postman → Authorization → Bearer Token

## Expenses CRUD
Create Expense

POST → /api/expenses

## List All Expenses

## GET → /api/expenses

Supports:

page

limit

start_date

end_date

category

Single Expense

## GET → /api/expenses/:id

Update

## PUT → /api/expenses/:id

Delete

## DELETE → /api/expenses/:id

## Summary Endpoint

## GET → /summary

Returns:

total expense

per-category totals

##  Monthly Statistics

## GET → /api/expenses/stats/monthly

Example response:

{
  "2025-11": 1510
}
