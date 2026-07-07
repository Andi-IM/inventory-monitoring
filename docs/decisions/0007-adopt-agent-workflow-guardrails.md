# Adopt Agent Workflow Guardrails

- Status: accepted
- Deciders: Developer, AI Assistant
- Date: 2026-07-07

## Context and Problem Statement

AI-assisted implementation in this repository can touch architecture, frontend UI, tests, CI, and GitHub publishing workflows. Without explicit operating rules, agents may skip Architecture Decision Records (ADRs), mix unrelated work into one commit, make frontend changes without design-system review, or finish without the lint and type checks that protect the Laravel/Inertia codebase.

We need a documented set of workflow guardrails so future prompts are handled consistently and remain aligned with the project's architecture and responsibility boundaries.

## Decision Drivers

- Preserve ADRs as the source of architectural constraints.
- Keep commits and pull requests scoped to one responsibility.
- Ensure frontend work follows the TailAdmin design-system decision and Impeccable review workflow.
- Require verification after changes, especially PHP formatting/static checks, JavaScript linting, and TypeScript type checking.
- Avoid staging or pushing unrelated local changes from a mixed worktree.

## Considered Options

- **Option 1: Keep workflow expectations implicit**: Rely on the active assistant session to remember conventions.
- **Option 2: Document agent guardrails in `AGENTS.md` and bind them to an ADR**: Make the expected behavior explicit and durable.

## Decision Outcome

Chosen option: **Option 2: Document agent guardrails in `AGENTS.md` and bind them to an ADR**, because these rules affect how all future implementation prompts are executed and should be treated as project governance, not temporary chat preferences.

### Consequences

- **Good**: Future work starts from current ADR context before code changes.
- **Good**: Frontend changes consistently activate Impeccable and remain aligned with `DESIGN.md`.
- **Good**: Verification expectations are explicit and failures must be reported with exact blockers.
- **Good**: Branches, commits, and PRs are scoped more cleanly by responsibility.
- **Bad**: Small changes require a little more upfront context gathering and reporting.

## Implementation Plan

- **Affected paths**:
  - `AGENTS.md`
  - `docs/decisions/README.md`
- **Pattern**:
  - Inspect `docs/decisions/README.md` and relevant ADRs before acting on prompts.
  - Create a scoped branch for implementation work when requested.
  - Activate Impeccable for UI/frontend work.
  - Run relevant PHP lint/format checks, JavaScript lint checks, and TypeScript type checking after changes.
  - Stage and commit only files that belong to the requested responsibility.
- **Verification**:
  - Confirm Markdown changes are limited to agent workflow governance files.
  - For code changes in future tasks, run the relevant checks described in `AGENTS.md`.
