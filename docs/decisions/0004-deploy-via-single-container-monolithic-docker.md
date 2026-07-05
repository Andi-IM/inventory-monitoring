# Deploy via Single Container Monolithic Docker

- Status: accepted
- Deciders: Developer, AI Assistant
- Date: 2026-07-05

## Context and Problem Statement

The application is structured as a Modular Monolith, meaning all modules are kept in a single codebase. While we want separate logical testing, the deployment should remain as simple as possible. We need a single deployment unit that bundles both the web server (Nginx) and PHP processor (PHP-FPM) in a single production container, supporting both SQLite and PostgreSQL.

## Decision Drivers

- Simple production deployment (single container artifact).
- Support for database migration on startup.
- Automated testing to verify that the container compiles and launches correctly.

## Considered Options

- **Option 1: Multi-Container Setup**: Separate containers for Nginx, PHP-FPM, and database (requires orchestration like Kubernetes or docker-compose in production).
- **Option 2: Single Monolithic Container**: A single Docker container running both Nginx and PHP-FPM managed by Supervisor, with database migrations running on startup.

## Decision Outcome

Chosen option: **Option 2: Single Monolithic Container**, because it fits our monolithic architecture perfectly. It allows the app to be deployed easily on VPS, App Engines, or PaaS platforms as a single container, while supporting SQLite for small installs and PostgreSQL for production environments.

### Consequences

- **Good**: Extremely simple deployment—only one image to push and run.
- **Good**: Automatically handles PostgreSQL connection waiting and database migration on container start.
- **Bad**: Independent scaling of the web server (Nginx) and the application runner (PHP-FPM) is not possible.

## Implementation Plan

- **Affected paths**:
  - `Dockerfile`
  - `docker-compose.yml`
  - `.dockerignore`
  - `.github/workflows/docker-build.yml`
- **Verification**: Run `docker compose up --build -d` and ensure the web service is healthy and responds to `curl http://localhost:8000`. Tested in CI via `docker-build.yml`.
