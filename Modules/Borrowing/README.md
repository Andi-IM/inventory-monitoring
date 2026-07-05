# Borrowing Module

This module manages the system's item lending (loans) and return workflows.

---

## 📂 Module Structure

- **Controllers** (`app/Http/Controllers/`):
  - `LoanController.php`: Manages loan registrations and active loans.
  - `LoanReturnController.php`: Handles returning of borrowed items.
  - `BorrowingController.php`: Core dashboard or general borrowing queries.
- **Models** (`app/Models/`):
  - `Loan.php`: Represents a loan transaction (header).
  - `LoanItem.php`: Represents individual items borrowed within a loan (details).
- **Requests** (`app/Http/Requests/`):
  - `StoreLoanRequest.php`, `ReturnLoanItemRequest.php`.
- **Database** (`database/`):
  - Migration: `2026_07_05_121320_create_borrowing_tables.php` (sets up loans and loan items tables with status tracking).
  - Seeder: `BorrowingDatabaseSeeder.php` (seeds sample loans and returns).
- **Frontend Pages** (`resources/js/pages/borrowing/`):
  - `loans.tsx`: Active loans and returns registry interface.
