# Adjust Release CI Trigger Strategy

- Status: accepted
- Deciders: Developer, AI Assistant
- Date: 2026-07-07

## Context and Problem Statement

ADR 0003 originally documented the release workflow as running on pushes to `main` so release automation could update changelog metadata and prepare releases after integration. The repository now needs release validation to happen before changes reach `main`, because direct pushes to protected branches are restricted and release-impacting changes should be reviewed through pull requests.

The existing `.github/workflows/release.yml` trigger is therefore being moved from `push` on `main` to `pull_request` targeting `main`.

## Decision Drivers

- Keep release-impacting changes visible during pull request review.
- Align release governance with protected-branch workflows.
- Avoid relying on direct push access to `main`.
- Preserve the release workflow as a single place for build, type analysis, tests, and release preparation checks.
- Keep the trigger syntax valid for GitHub Actions by using `pull_request`.

## Considered Options

- **Option 1: Keep release workflow on `push` to `main`**: Preserve ADR 0003 exactly as written.
- **Option 2: Move release workflow to `pull_request` targeting `main`**: Validate release readiness before merge.
- **Option 3: Split release validation and release publication into separate workflows**: Run validation on pull requests and publication after merge.

## Decision Outcome

Chosen option: **Option 2: Move release workflow to `pull_request` targeting `main`**, because the immediate need is to ensure release-related validation happens through the pull request path instead of requiring direct push behavior.

This ADR amends the trigger portion of ADR 0003. ADR 0003 remains the source of truth for the broader goal of automated versioning and changelog generation.

### Consequences

- **Good**: Release workflow checks run before code reaches `main`.
- **Good**: The process aligns better with branch protection and review-based governance.
- **Good**: Release-impacting failures are visible earlier.
- **Bad**: Release publication behavior may need a later split if automatic release creation must happen only after merge to `main`.

## Implementation Plan

- **Affected paths**:
  - `.github/workflows/release.yml`
- **Pattern**:
  - Use the GitHub Actions `pull_request` event targeting `main`.
  - Keep existing path ignores for documentation-only changes.
  - Keep release workflow validation steps centralized in `release.yml`.
- **Verification**:
  - Confirm the workflow uses valid GitHub Actions event syntax.
  - Confirm the workflow still targets pull requests into `main`.
  - Watch the next pull request run to verify expected Release CI behavior.
