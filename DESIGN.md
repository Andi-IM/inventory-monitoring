# Design

## Visual Direction

The product should feel like a polished operational dashboard: calm, dense, and highly legible.
Use the TailAdmin free dashboard template as the visual reference point, especially its sidebar-first layout, sticky top bar, rounded surfaces, slate neutrals, and blue/cyan accent system.

## Theme

- Default to a light dashboard with a full dark mode equivalent.
- Prioritize clarity over ornament.
- Keep the interface structured and efficient so inventory, borrowing, and approval workflows are easy to scan.

## Color System

Primary palette:

- Brand blue: `#465FFF`
- Deep brand blue: `#3641F5`
- Accent cyan: `#06B6D4` for focus, actions, and selected states

Neutrals:

- Slate backgrounds and borders for the shell
- White surfaces in light mode
- Slate 900 / 950 surfaces in dark mode

Semantic colors:

- Success: green
- Warning: amber / orange
- Error: red / rose
- Info: cyan / blue

Rules:

- Use brand blue for primary actions and active navigation.
- Use semantic colors only when they communicate state.
- Avoid muddy or cream-based neutrals.

## Typography

- Use a modern sans-serif with strong dashboard readability.
- Keep headings compact and confident.
- Use uppercase micro-labels sparingly for navigation groups, section labels, and metadata.
- Maintain strong contrast in body text and table content.

Recommended hierarchy:

- Page titles: large, semibold
- Section titles: medium-large, semibold
- Labels and table headers: small, tracked, semibold
- Supporting copy: muted slate, never too light

## Layout

- Left sidebar navigation on desktop.
- Sticky top header with search, utilities, and user actions.
- Main content constrained to a wide but readable maximum width.
- Use generous spacing between sections, but keep component density high enough for operational work.

Surface rules:

- Cards and panels should use rounded 2xl corners.
- Prefer subtle borders and soft shadows over heavy decoration.
- Use white or near-white surfaces in light mode and deep slate in dark mode.

## Components

Core patterns:

- Sidebar navigation with grouped sections and active-state pills
- Sticky header with search, notifications, theme toggle, and user menu
- Rounded table shells with sticky-like structure and clear row separation
- Form fields with soft borders, generous padding, and visible focus rings
- Status badges for neutral, success, warning, danger, and info states
- Empty states with dashed borders and concise actions

Component styling:

- Buttons should be rounded, direct, and clearly hierarchical.
- Inputs should feel calm and tactile, not glossy.
- Tables should stay readable at a glance even with dense datasets.

## Motion

- Keep motion minimal and functional.
- Use short transitions for hover, focus, and sidebar toggles.
- Animate overlays and drawers with restraint.
- Respect reduced motion preferences.

## Accessibility

- Maintain WCAG 2.1 AA contrast.
- Make focus states obvious, especially for navigation, buttons, and form controls.
- Support keyboard navigation for the sidebar, header actions, and data-entry flows.
- Ensure dark mode preserves the same information hierarchy as light mode.

## Implementation Notes

- TailAdmin is the visual baseline, but the product should remain an inventory-management app, not a generic SaaS clone.
- Keep charts, tables, and forms consistent across modules.
- Preserve dense operational clarity in all admin screens.
