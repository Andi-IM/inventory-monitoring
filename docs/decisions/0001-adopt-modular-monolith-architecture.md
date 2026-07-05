# Adopt Modular Monolith Architecture

- Status: accepted
- Deciders: Developer, AI Assistant
- Date: 2026-07-05

## Context and Problem Statement

The application requires clear separation of business domains (Access/Auth, Inventory, Borrowing) to allow clean development and future scaling. However, building and deploying separate microservices from the start would introduce significant operational overhead (networks, separate repositories, deployment coordination, testing complexity). We need a way to keep development decoupled without the complexity of microservices.

## Decision Drivers

- Maintain clean code boundaries between domain models, controllers, and pages.
- Keep the local development environment simple and single-command.
- Keep testing straightforward using a single database/test suite.

## Considered Options

- **Option 1: Standard Laravel MVC (Flat app/)**: Organize everything under `app/Http/Controllers`, `app/Models`, etc.
- **Option 2: Microservices (Multiple repositories)**: Split each domain into its own codebase, deployment unit, and database.
- **Option 3: Modular Monolith (Modules/ directory)**: Decouple domain logic into independent modules under `Modules/` in a single repository.

## Decision Outcome

Chosen option: **Option 3: Modular Monolith**, because it provides the domain separation of microservices (Option 2) while keeping the deployment, testing, and operational simplicity of a single repository (Option 1).

### Consequences

- **Good**: Clean separation of concerns; developers can work on one module (e.g., Access) without touching others.
- **Good**: Easy to extract a module into a microservice in the future if scale demands it.
- **Bad**: Developers must enforce dependency discipline (avoiding direct cross-module database/model references) without compiler enforcement.

## Implementation Plan

- **Affected paths**:
  - `Modules/Access/`
  - `Modules/Inventory/`
  - `Modules/Borrowing/`
  - `resources/js/pages/access/`
  - `resources/js/pages/inventory/`
  - `resources/js/pages/borrowing/`
- **Verification**: Pest tests (`php artisan test`) run successfully on all modules.
