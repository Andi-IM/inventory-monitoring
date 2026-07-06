# Adopt TailAdmin Design System for Frontend UI

- Status: accepted
- Deciders: Developer, AI Assistant
- Date: 2026-07-06

## Context and Problem Statement

The application requires a cohesive, professional, and operational dashboard aesthetic. Recent uncommitted changes reflect a massive overhaul of the frontend UI to adopt the TailAdmin design system. We need to document this transition to ensure future development maintains the same visual language, accessibility standards, and operational clarity.

## Decision Drivers

- Need for a calm, dense, and highly legible operational dashboard.
- Requirement for consistent light and dark mode support.
- Must maintain WCAG 2.1 AA accessibility standards.
- Prefer a structured and efficient interface over unnecessary ornaments.

## Considered Options

- **Option 1: Adopt TailAdmin Design System**
  - Use a sidebar-first layout, sticky top bar, rounded surfaces, slate neutrals, and a blue/cyan accent system.
- **Option 2: Build Custom Generic UI**
  - Create a bespoke design system from scratch.

## Decision Outcome

Chosen option: **Option 1: Adopt TailAdmin Design System**, because it provides a strong visual reference point and established patterns (e.g., active-state pills, status badges, rounded table shells) that are perfect for a dense inventory management application. It saves development time while ensuring a polished, enterprise-ready look and feel.

### Consequences

- **Good**: Consistent and predictable user interface across all modules (Access, Inventory, Borrowing).
- **Good**: Built-in support for dark mode and accessibility considerations.
- **Good**: Standardized color palette and typography prevent design drift.
- **Bad**: Requires adhering to specific layout structures (e.g., sidebar-first) which might require refactoring some existing custom components.

## Implementation Plan

- **Affected paths**:
  - `DESIGN.md` (Design guidelines)
  - `resources/css/app.css`
  - `resources/js/components/app-layout.tsx`
  - `resources/js/components/tailadmin.tsx`
  - `resources/js/pages/**/*.tsx`
- **Pattern**: Follow the detailed guidelines in `DESIGN.md` (e.g., semantic colors only for state, brand blue for actions, rounded 2xl corners for panels).
- **Verification**: 
  - Ensure `npm run build` completes successfully.
  - Verify WCAG 2.1 AA contrast ratios.
  - Test dark mode toggle to ensure surfaces shift correctly to slate 900/950.
  - Confirm dense table layouts remain readable.
