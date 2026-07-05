# Adopt Per-Module CI/CD Pipelines

- Status: accepted
- Deciders: Developer, AI Assistant
- Date: 2026-07-05

## Context and Problem Statement

As the application is structured as a Modular Monolith, developers often make changes that affect only a single module. Running a single global CI/CD pipeline on every commit/PR for the whole codebase consumes unnecessary build minutes and slows down feedback loops. We need a way to trigger testing intelligently based on which module's files were modified.

## Decision Drivers

- Reduce GitHub Actions build minutes.
- Provide faster feedback to developers.
- Ensure that changes do not break other parts of the application.

## Considered Options

- **Option 1: Single Global CI/CD Workflow**: A single workflow that runs on any push and executes all tests.
- **Option 2: Path-Filtered Workflows Per Module**: Separate workflows for `Access`, `Inventory`, and `Borrowing` that trigger only when files inside their respective directories or global configurations (like `composer.json`) change.

## Decision Outcome

Chosen option: **Option 2: Path-Filtered Workflows Per Module**, because it reduces CI run times by ignoring unrelated commits (e.g., changing Access docs won't trigger Inventory CI) while retaining global safety by running the full test suite (`php artisan test`) during execution to prevent regression.

### Consequences

- **Good**: Significant reduction in CI/CD pipeline wait times and resource consumption.
- **Good**: Better traceability of module-specific builds.
- **Bad**: Slightly higher maintenance overhead due to having multiple workflow YAML files (`module-access.yml`, `module-inventory.yml`, `module-borrowing.yml`).

## Implementation Plan

- **Affected paths**:
  - `.github/workflows/module-access.yml`
  - `.github/workflows/module-inventory.yml`
  - `.github/workflows/module-borrowing.yml`
- **Verification**: Verify that push to `Modules/Access/` triggers only `Module Access CI` and runs `php artisan test` successfully.
