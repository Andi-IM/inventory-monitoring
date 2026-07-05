# Access Module

This module is responsible for user registration, authentication, authorization groups, and external borrower management.

---

## 📂 Module Structure

- **Controllers** (`app/Http/Controllers/`):
  - `AuthController.php`: Handles user login, logout, and session state.
  - `UserController.php`: Manages user profiles and accounts.
  - `GroupController.php`: Manages authorization groups and permissions.
  - `ExternalBorrowerController.php`: Manages external borrower entities.
- **Models** (`app/Models/`):
  - `Group.php`: Represents user roles or permission groups.
  - `ExternalBorrower.php`: Represents guest/external borrowing entities.
- **Requests** (`app/Http/Requests/`):
  - `LoginRequest.php`, `StoreUserRequest.php`, `UpdateUserRequest.php`, `GroupRequest.php`, `ExternalBorrowerRequest.php`.
- **Database** (`database/`):
  - Migration: `2026_07_05_121300_create_access_tables.php` (sets up groups, external borrowers, and mapping tables).
  - Seeder: `AccessDatabaseSeeder.php` (seeds default groups and users).
- **Frontend Pages** (`resources/js/pages/access/`):
  - `users.tsx`: User management interface.
  - `groups.tsx`: Group management interface.
  - `external-borrowers.tsx`: External borrower directory.

---

## 🔑 Authentication Flow

- Uses Laravel's standard session-based authentication integrated with Inertia.js.
- Web routes are protected by Laravel's standard `auth` middleware.
