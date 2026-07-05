# Inventory Monitoring System

A modern modular monolithic application built with Laravel, React, Inertia.js, and TailwindCSS to manage and monitor inventory borrowing and users.

---

## 🛠 Tech Stack

- **Backend**: PHP 8.4 / Laravel 13
- **Frontend**: React 19 / Inertia.js v3 (SPA) / TypeScript / TailwindCSS v4
- **Testing**: Pest PHP v4
- **Database**: SQLite (default local) / PostgreSQL (supported)
- **Containerization**: Docker / Docker Compose (includes Nginx, PHP-FPM, Supervisor, and PostgreSQL)
- **Tooling**: ESLint v9 / Prettier v3 / PHP Pint

---

## 📐 Architecture & Modular Structure

This project follows a **Modular Monolith** architecture. The core application acts as the shell, while specific business domains are decoupled into self-contained modules located in the `Modules/` directory.

### Core Modules:
1. **Access Module** (`Modules/Access`): Manages authentication, user registration, group access, and external borrower registry.
2. **Inventory Module** (`Modules/Inventory`): Manages categories, items, and unit specifications.
3. **Borrowing Module** (`Modules/Borrowing`): Handles item lending (loans) and return workflows.

---

## 🚀 Getting Started

### Prerequisites
- PHP 8.4 or Docker
- Composer
- Node.js 22 & NPM

---

### Option A: Local Development (Bare Metal)

1. **Clone the Repository** and navigate to the project directory.
2. **Install PHP Dependencies**:
   ```bash
   composer install
   ```
3. **Install Node Dependencies**:
   ```bash
   npm ci
   ```
4. **Environment Setup**:
   Copy `.env.example` to `.env` and configure your database.
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
5. **Run Migrations & Seeders**:
   ```bash
   php artisan migrate --seed
   ```
6. **Start Development Servers**:
   Run both PHP and Vite concurrently:
   ```bash
   npm run dev
   # Or composer dev
   ```

---

### Option B: Docker Development (PostgreSQL)

You can run the entire application stack (including Nginx, PHP-FPM, and PostgreSQL database) using Docker Compose:

1. **Build and Start Containers**:
   ```bash
   docker compose up --build -d
   ```
   *This command compiles frontend assets, sets up the PostgreSQL database, runs migrations automatically, and serves the app on `http://localhost:8000`.*

2. **Accessing the Database**:
   Postgres is bound to `127.0.0.1:5432` with username `laravel`, database `inventory_monitoring`, and password `secret_password`.

3. **Stop Containers**:
   ```bash
   docker compose down -v
   ```

---

## 🧪 Testing, Linting & Formatting

We maintain code quality using static analysis and automated testing:

```bash
# Run PHP Pint (Formatting)
composer lint

# Run PHPStan (Type check)
composer types:check

# Run Pest Tests
php artisan test

# Run ESLint (JS/TS Linting)
npm run lint:check

# Run Prettier Check
npm run format:check
```

---

## ⛓️ CI/CD Pipelines (GitHub Actions)

The repository includes a modern, optimized CI/CD pipeline setup under `.github/workflows/`:

1. **Per-Module CI** (`module-access.yml`, `module-inventory.yml`, `module-borrowing.yml`):
   - Triggered only when files inside a specific module or global project settings are modified.
   - Saves CI build minutes by selectively running tests on PRs.
2. **Docker Build CI** (`docker-build.yml`):
   - Verifies the validity of the production `Dockerfile` and `docker-compose.yml` by building the image, launching the containers, checking database health, and performing an HTTP smoke test.
3. **Release CI** (`release.yml`):
   - Automatically bumps version tag on push to `main` (starting from `v0.1.0`), updates `CHANGELOG.md` with conventional commit groupings, and creates a GitHub Release.
