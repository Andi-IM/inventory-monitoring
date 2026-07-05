# Automate Versioning and CHANGELOG Generation

- Status: accepted
- Deciders: Developer, AI Assistant
- Date: 2026-07-05

## Context and Problem Statement

Manually tagging releases and maintaining a `CHANGELOG.md` file in a fast-paced development project is tedious and prone to errors. We want version tags and release logs to be generated automatically upon successful integration of changes into the `main` branch.

## Decision Drivers

- Consistent release tracking following Semantic Versioning (SemVer) rules.
- Maintain a structured `CHANGELOG.md` in the repository following the *Keep a Changelog* format.
- Fully automated release pipeline requiring no manual intervention.

## Considered Options

- **Option 1: Manual Tagging & Release Management**: Developers manually run `git tag` and update `CHANGELOG.md` before pushing to `main`.
- **Option 2: Automated Release CI on main**: A workflow runs on push to `main` that calculates the next tag, parses conventional commits, updates `CHANGELOG.md`, commits it back to `main`, and pushes the tag automatically.

## Decision Outcome

Chosen option: **Option 2: Automated Release CI on main**, because it removes manual effort and ensures that every merge to `main` is immediately documented and tagged starting from `v0.1.0` (patch bumps: `v0.1.1`, `v0.1.2`, etc.).

### Consequences

- **Good**: `CHANGELOG.md` is always up-to-date and reflects conventional commit categories (Added, Fixed, Other Changes).
- **Good**: Automated GitHub Release creation with assets.
- **Bad**: We must use `[skip ci]` in the automated changelog commit message to prevent triggering recursive CI/CD builds.

## Implementation Plan

- **Affected paths**:
  - `.github/workflows/release.yml`
  - `CHANGELOG.md`
- **Verification**: Verify that push to `main` triggers `Release CI`, commits updated `CHANGELOG.md` with `[skip ci]`, and creates a new `v0.x.y` Git tag.
