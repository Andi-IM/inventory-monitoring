---
name: semantic-commit-message
description: Generate concise Conventional Commits / semantic commit messages from git status and diffs. Use when the user asks for a semantic commit message, conventional commit, commit title/body, commit wording, or wants help naming a commit from staged or unstaged changes.
---

# Semantic Commit Message

## Workflow

1. Inspect the repo state before writing the message.
   - Run `git status --short --branch`.
   - Prefer staged changes: inspect `git diff --cached --stat` and `git diff --cached`.
   - If nothing is staged, inspect unstaged changes with `git diff --stat` and `git diff`, and clearly say the message is based on unstaged changes.
   - If both staged and unstaged changes exist, base the message only on staged changes unless the user explicitly asks otherwise.

2. Identify whether the diff is one coherent change.
   - If files contain unrelated concerns, recommend splitting into multiple commits and provide one message per concern.
   - Do not invent intent that is not visible in the diff. Use neutral wording when motivation is unclear.

3. Choose the Conventional Commit type.
   - `feat`: new user-facing capability or workflow.
   - `fix`: bug fix or corrected behavior.
   - `refactor`: internal restructuring without intended behavior change.
   - `perf`: performance improvement.
   - `test`: tests only.
   - `docs`: documentation only.
   - `style`: formatting or visual/code style without behavior change.
   - `build`: build system, dependency, or packaging changes.
   - `ci`: CI/CD workflow changes.
   - `chore`: maintenance that does not fit another type.
   - `revert`: revert of an earlier commit.

4. Choose a narrow scope when it improves clarity.
   - Derive scope from the feature area, module, package, or dominant path.
   - Keep scope lowercase and hyphenated when needed, for example `auth`, `inventory`, `borrowing`, `access`, `ui`, `forms`, `theme`, `tests`, `ci`, `deps`.
   - Omit scope if the change spans several unrelated areas and a split is not possible.

## Message Format

Use this default shape:

```text
<type>(<scope>): <summary>
```

Rules:
- Keep the subject at 72 characters or fewer when practical.
- Use imperative, present-tense wording: `add`, `fix`, `refine`, `sync`, `remove`.
- Start the summary lowercase after the colon unless a proper noun is required.
- Do not end the subject with a period.
- Prefer one precise verb over vague verbs like `update` unless the diff is truly broad.

Add a body only when it materially helps future readers understand why, risk, migration notes, or user-visible behavior:

```text
<type>(<scope>): <summary>

Explain why the change was needed and what behavior changed. Wrap body lines near 72 characters.
```

Add footers for issue references or breaking changes:

```text
BREAKING CHANGE: describe the incompatible change
Refs: #123
```

## Output Style

- If the user asks for only the commit message, output only the message in a fenced `text` block.
- Otherwise provide a primary recommendation first, then at most two alternatives if useful.
- Mention whether the recommendation is based on staged or unstaged changes.
- If generated files, lockfiles, build artifacts, or unrelated files are present, call that out before the message.
- Do not stage, commit, push, or amend unless the user explicitly requests it.

## Examples

```text
feat(borrowing): add multi-unit return modal
```

```text
fix(theme): show sun icon when dark mode is active
```

```text
refactor(forms): align inventory modals with TailAdmin layout
```
