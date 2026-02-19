-- schema.sql
-- BudgetingApp Database Schema
-- Matches the project ERD with improvements noted below.
-- Usage: psql -U <username> -f schema.sql

DROP DATABASE IF EXISTS budgetingapp;
CREATE DATABASE budgetingapp;

\c budgetingapp;

-- 1. USER table (from ERD)
CREATE TABLE "user" (
      user_id SERIAL PRIMARY KEY,
      full_name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      password_rules VARCHAR(255),
      date_joined TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

-- 2. Category table (added to support Budget.CategoryID FK)
-- NOTE: This table was added because the ERD's Budget table references
-- CategoryID as a foreign key but no Category table existed in the ERD.
CREATE TABLE category (
      category_id SERIAL PRIMARY KEY,
      user_id INT NOT NULL REFERENCES "user"(user_id) ON DELETE CASCADE,
      name VARCHAR(50) NOT NULL,
      color VARCHAR(30) DEFAULT 'bg-primary',
      icon VARCHAR(30)
  );

-- 3. Transaction table (from ERD)
CREATE TABLE transaction (
      transaction_id SERIAL PRIMARY KEY,
      user_id INT NOT NULL REFERENCES "user"(user_id) ON DELETE CASCADE,
      category_id INT REFERENCES category(category_id) ON DELETE SET NULL,
      name VARCHAR(100) NOT NULL,
      amount DECIMAL(10, 2) NOT NULL,
      transaction_date DATE NOT NULL DEFAULT CURRENT_DATE,
      icon VARCHAR(30)
  );

-- 4. Budget table (from ERD)
CREATE TABLE budget (
      budget_id SERIAL PRIMARY KEY,
      user_id INT NOT NULL REFERENCES "user"(user_id) ON DELETE CASCADE,
      category_id INT NOT NULL REFERENCES category(category_id) ON DELETE CASCADE,
      limit_amount DECIMAL(10, 2) NOT NULL,
      time_period VARCHAR(20) NOT NULL DEFAULT 'monthly'
  );

-- 5. Analysis table (from ERD)
CREATE TABLE analysis (
      analysis_id SERIAL PRIMARY KEY,
      user_id INT NOT NULL REFERENCES "user"(user_id) ON DELETE CASCADE,
      analysis_name VARCHAR(100) NOT NULL,
      analysis_type VARCHAR(50) NOT NULL,
      generate_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

-- 6. GOAL table (from ERD)
CREATE TABLE goal (
      goal_id SERIAL PRIMARY KEY,
      user_id INT NOT NULL REFERENCES "user"(user_id) ON DELETE CASCADE,
      goal_name VARCHAR(100) NOT NULL,
      goal_description TEXT,
      target_amount DECIMAL(10, 2) NOT NULL,
      current_amount DECIMAL(10, 2) DEFAULT 0.00,
      status VARCHAR(20) DEFAULT 'active'
  );
