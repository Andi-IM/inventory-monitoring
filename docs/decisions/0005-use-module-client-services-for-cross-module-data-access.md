# Use Module Client Services for Cross-Module Data Access

- Status: accepted
- Deciders: Developer, AI Assistant
- Date: 2026-07-06

## Context and Problem Statement

The Access, Inventory, and Borrowing domains need to consume each other's data, but direct cross-module Eloquent queries couple controllers to foreign module models and make refactoring harder. The recent refactor introduced service contracts, client services, and DTOs so each module can expose a stable read/update boundary without leaking persistence details.

## Decision Drivers

- Preserve module boundaries inside the modular monolith.
- Avoid direct controller-to-model coupling across modules.
- Make cross-module data access easier to refactor and test.
- Keep shared data shapes explicit through DTOs.

## Considered Options

- **Option 1: Direct Cross-Module Model Queries**: Controllers and services query foreign module models directly with Eloquent.
- **Option 2: Shared Repository Layer**: A common repository layer exposes models and queries to all modules.
- **Option 3: Module Client Services and DTOs**: Each module exposes contracts and services that return DTOs or perform focused updates.

## Decision Outcome

Chosen option: **Option 3: Module Client Services and DTOs**, because it preserves module autonomy while still allowing other modules to read and update the data they need through a narrow, explicit API.

### Consequences

- **Good**: Controllers depend on module contracts instead of foreign model classes.
- **Good**: Returned data is normalized into DTOs, so frontend payloads are explicit and stable.
- **Good**: Module internals can change without forcing unrelated controllers to be rewritten.
- **Bad**: More classes are required for contracts, services, and DTOs.
- **Bad**: Some queries are now split across modules, so developers must reason about boundary joins in service code instead of one large Eloquent query.

## Implementation Plan

- **Affected paths**:
  - `Modules/Access/app/Contracts/`
  - `Modules/Access/app/Services/`
  - `Modules/Access/app/DTOs/`
  - `Modules/Inventory/app/Contracts/`
  - `Modules/Inventory/app/Services/`
  - `Modules/Inventory/app/DTOs/`
  - `Modules/Borrowing/app/Contracts/`
  - `Modules/Borrowing/app/Services/`
  - `Modules/Borrowing/app/Http/Controllers/LoanController.php`
  - `app/Http/Controllers/DashboardController.php`
- **Verification**: Run `composer types:check`, `vendor/bin/pint --dirty --format agent`, and `php artisan test`.
