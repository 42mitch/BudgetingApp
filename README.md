# BudgetBuddy (BudgetingApp)

## App Summary

BudgetBuddy helps users (primarily college students) track spending and stay within their budget. The primary user is someone who wants to set category-based spending limits (e.g., Food, Transport, Subscriptions), see how much they’ve spent vs. their limit, and adjust limits over time. The product provides a dashboard, budget management with per-category limits, goals, analytics, and an AI coach. It solves the problem of overspending and lack of visibility by centralizing budgets, transactions, and progress in one place. It also helps to teach young adults to become financially independent.

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React 19, Next.js 16, TypeScript, Tailwind CSS, Radix UI, Recharts, React Hook Form, Zod |
| **Backend** | Next.js API Routes (App Router) |
| **Database** | PostgreSQL (via `pg` driver) |
| **Authentication** | None (single hardcoded user in API for now) |
| **External services / APIs** | None |

## Architecture Diagram

```text
                    ┌─────────────┐
                    │    User     │
                    │  (browser)  │
                    └──────┬──────┘
                           │ HTTP (fetch)
                           ▼
                    ┌─────────────┐
                    │  Frontend   │
                    │ Next.js +   │
                    │ React (UI)  │
                    └──────┬──────┘
                           │ PATCH /api/budget/[categoryId]
                           │ (JSON: limit_amount)
                           ▼
                    ┌─────────────┐
                    │   Backend   │
                    │ Next.js API │
                    │   Routes    │
                    └──────┬──────┘
                           │ SQL (pg Pool)
                           ▼
                    ┌─────────────┐
                    │  PostgreSQL │
                    │  (budget,   │
                    │  category,  │
                    │   user…)    │
                    └─────────────┘
```

- **User → Frontend:** User interacts with the app in the browser (e.g., Budget page, edit limit, save).
- **Frontend → Backend:** Frontend sends `PATCH` requests to `/api/budget/[categoryId]` with `limit_amount` to update a category budget.
- **Backend → Database:** Backend uses the `pg` pool and `query()` to run `UPDATE budget SET limit_amount = $1 WHERE ...` and return the updated row.

## Prerequisites

Install and configure the following before running the project locally:

| Software | Purpose | Verify |
|----------|---------|--------|
| **Node.js** (LTS, e.g. 20+) | Runtime for Next.js and npm/pnpm | `node -v` |
| **npm** or **pnpm** | Package manager | `npm -v` or `pnpm -v` |
| **PostgreSQL** | Database server | `psql --version` |
| **psql** (in system PATH) | Run `schema.sql` and `seed.sql` | `psql --version` |

- **Node.js:** [https://nodejs.org/](https://nodejs.org/)  
- **PostgreSQL:** [https://www.postgresql.org/download/](https://www.postgresql.org/download/)  
- **psql** is included with PostgreSQL; ensure the `bin` directory is on your PATH.

## Installation and Setup

1. **Clone the repo and go to the project folder**
   ```bash
   cd /path/to/BudgetingApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   Or with pnpm: 
   
   ```pnpm install```

3. **Create the database and load schema**
   From the project root, run (replace `<username>` with your PostgreSQL user):
   ```bash
   psql -U <username> -f db/schema.sql
   ```
   This drops and recreates the `budgetingapp` database and creates tables (`user`, `category`, `transaction`, `budget`, `analysis`, `goal`).

4. **Load seed data**
   ```bash
   psql -U <username> -d budgetingapp -f db/seed.sql
   ```
   This inserts sample users, categories, transactions, budgets, analyses, and goals (for user_id 1).

5. **Configure environment variables**
   Create a `.env.local` in the project root with either:
   - **Option A – connection string**
     ```env
     DATABASE_URL=postgresql://<user>:<password>@localhost:5432/budgetingapp
     ```
   - **Option B – individual variables**
     ```env
     DB_HOST=localhost
     DB_PORT=5432
     DB_NAME=budgetingapp
     DB_USER=<your_postgres_username>
     DB_PASSWORD=<your_postgres_password>
     ```
   If both are set, `DATABASE_URL` takes precedence.

## Running the Application

1. **Start the dev server** (backend and frontend run together in Next.js):
   ```bash
   npm run dev
   ```
   Or:
   ```pnpm dev```

2. **Open the app**
   In your browser go to: [http://localhost:3000](http://localhost:3000)

3. **Navigate**
   Use the sidebar or mobile nav to open **Budget**, **Goals**, **Analytics**, **AI Coach**, etc. The Budget page is where you can update category budget limits (vertical slice).

## Verifying the Vertical Slice

The vertical slice is **updating a category’s budget limit**: UI → API → database.

1. **Trigger the feature**
   - Open [http://localhost:3000](http://localhost:3000).
   - Click **Budget** in the sidebar.
   - For any category (e.g. “Food & Drink”), click the pencil (edit) icon.
   - Change the budget value (e.g. from `400` to `450`).
   - Click the checkmark (save) or press Enter.

2. **Confirm the UI**
   - A “Budget updated” toast should appear.
   - The category row should show the new limit (e.g. `$342 / $450`).

3. **Confirm the database was updated**
   In a terminal, connect to the database and check the `budget` table (user_id 1, category_id 1 for “Food & Drink”):
   ```bash
   psql -U <username> -d budgetingapp -c "SELECT category_id, limit_amount, time_period FROM budget WHERE user_id = 1 AND category_id = 1;"
   ```
   You should see the new `limit_amount` (e.g. `450.00`).

4. **Confirm persistence**
   - Run the same `SELECT` again (or after restarting the app). The row should still show the updated `limit_amount`.
   - The backend stores the change in PostgreSQL; once the Budget view loads data from an API (e.g. a future GET endpoint), the new value will also appear after a full page refresh.
