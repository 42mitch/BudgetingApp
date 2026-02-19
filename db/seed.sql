-- seed.sql
-- BudgetingApp Sample Data
-- Run this after schema.sql to populate with test data.
-- Usage: psql -U <username> -d budgetingapp -f seed.sql

-- 1. Users
INSERT INTO "user" (full_name, email, password_hash, password_rules, date_joined) VALUES
('Alex Johnson', 'alex@example.com', '$2b$10$placeholder_hash_value_here', 'min8chars,1upper,1number', '2025-09-01'),
('Jordan Smith', 'jordan@example.com', '$2b$10$placeholder_hash_value_here', 'min8chars,1upper,1number', '2025-10-15');

-- 2. Categories (for Alex, user_id = 1)
INSERT INTO category (user_id, name, color, icon) VALUES
(1, 'Food & Drink', 'bg-primary', 'coffee'),
(1, 'Shopping', 'bg-chart-2', 'shopping-bag'),
(1, 'Education', 'bg-chart-3', 'book-open'),
(1, 'Transport', 'bg-chart-4', 'car'),
(1, 'Subscriptions', 'bg-chart-5', 'repeat'),
(1, 'Entertainment', 'bg-primary', 'film'),
(1, 'Health', 'bg-chart-2', 'heart'),
(1, 'Utilities', 'bg-chart-3', 'zap');

-- 3. Transactions (for Alex)
INSERT INTO transaction (user_id, category_id, name, amount, transaction_date, icon) VALUES
(1, 1, 'Starbucks',         -5.75,  '2026-02-19', 'coffee'),
(1, 2, 'Amazon',            -32.99, '2026-02-19', 'shopping-bag'),
(1, 3, 'Campus Bookstore',  -89.00, '2026-02-18', 'book-open'),
(1, 1, 'Chipotle',          -12.45, '2026-02-18', 'utensils'),
(1, 5, 'Spotify',           -5.99,  '2026-02-12', 'repeat'),
(1, 4, 'Uber',              -14.50, '2026-02-17', 'car'),
(1, 6, 'Movie Night',       -15.00, '2026-02-16', 'film'),
(1, 1, 'Grocery Store',     -47.82, '2026-02-15', 'coffee'),
(1, 7, 'Campus Pharmacy',   -12.99, '2026-02-14', 'heart'),
(1, 8, 'Phone Bill',        -45.00, '2026-02-01', 'zap');

-- 4. Budgets (monthly limits for Alex)
INSERT INTO budget (user_id, category_id, limit_amount, time_period) VALUES
(1, 1, 400.00, 'monthly'),
(1, 2, 300.00, 'monthly'),
(1, 3, 200.00, 'monthly'),
(1, 4, 150.00, 'monthly'),
(1, 5, 50.00,  'monthly'),
(1, 6, 100.00, 'monthly'),
(1, 7, 75.00,  'monthly'),
(1, 8, 80.00,  'monthly');

-- 5. Analysis (spending reports for Alex)
INSERT INTO analysis (user_id, analysis_name, analysis_type, generate_date) VALUES
(1, 'February Spending Report',    'monthly',   '2026-02-19'),
(1, 'Q4 2025 Quarterly Review',    'quarterly', '2026-01-01'),
(1, 'Category Breakdown Feb 2026', 'category',  '2026-02-19');

-- 6. Goals (savings goals for Alex)
INSERT INTO goal (user_id, goal_name, goal_description, target_amount, current_amount, status) VALUES
(1, 'Emergency Fund',    'Build a $1,000 emergency savings buffer',           1000.00, 750.00,  'active'),
(1, 'Spring Break Trip', 'Save for spring break vacation with friends',       800.00,  320.00,  'active'),
(1, 'New Laptop',        'Replace aging laptop for school',                   1200.00, 900.00,  'active'),
(1, 'Textbooks Fund',    'Cover next semester textbook costs',                400.00,  200.00,  'active'),
(1, 'Summer Housing',    'First and last month rent deposit for summer apt',  3000.00, 1500.00, 'active');
