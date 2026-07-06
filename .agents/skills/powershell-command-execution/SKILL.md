---
name: powershell-command-execution
description: Use whenever Codex runs shell commands in a Windows or PowerShell environment, especially in this repository. Applies to file inspection, git commands, npm/composer/php/artisan commands, pipelines, quoting, path handling, environment variables, background processes, and troubleshooting command failures caused by PowerShell syntax or Windows path semantics.
---

# PowerShell Command Execution

Run commands as PowerShell, not Bash. Assume the active shell is Windows PowerShell unless the environment says otherwise.

## Command Style

- Prefer native PowerShell cmdlets for filesystem work: `Get-ChildItem`, `Get-Content`, `Select-String`, `Copy-Item`, `Move-Item`, `Remove-Item`.
- Use `rg` / `rg --files` for fast search when available.
- Use `;`, `&&`, `||`, pipes, redirects, and subshells only when they are genuinely needed. Split unrelated commands into separate tool calls or `multi_tool_use.parallel`.
- Do not use Bash-only syntax such as `VAR=value command`, `export VAR=value`, `cat <<EOF`, `2>/dev/null`, or Bash heredocs.
- Use PowerShell environment variables: `$env:APP_ENV = 'testing'`.
- Use PowerShell command substitution only when needed: `$(Get-Location)`.

## Paths And Quoting

- Quote paths with spaces using single quotes: `'D:\01_Projects\inventory-monitoring'`.
- Prefer relative paths from the workspace when possible.
- Use forward slashes only for tools that accept them reliably; use backslashes or quoted literal paths for PowerShell cmdlets.
- For exact filesystem paths, prefer `-LiteralPath` when the path may contain brackets, wildcards, or special characters.

## File Reading

- Read whole small files with `Get-Content -Raw 'path'`.
- Read line windows with:

```powershell
$i = 1; Get-Content 'path' | ForEach-Object { if ($i -ge 20 -and $i -le 80) { '{0,4}: {1}' -f $i, $_ }; $i++ }
```

- Inspect binary or encoding issues with `Format-Hex -Path 'path' | Select-Object -First 2`.

## Editing And Safety

- Use `apply_patch` for manual edits. Do not write files with `Set-Content`, `Out-File`, heredocs, or redirection unless a formatter or generator owns the output.
- Never run destructive recursive commands unless the target absolute path has been verified and the user explicitly requested or approved it.
- Do not compose destructive operations by enumerating paths and passing them to another shell. Keep file operations in PowerShell with native cmdlets and `-LiteralPath`.

## Common Translations

| Bash habit | PowerShell equivalent |
| --- | --- |
| `ls -la` | `Get-ChildItem -Force` |
| `cat file` | `Get-Content -Raw 'file'` |
| `grep -R "x" .` | `rg "x"` or `Select-String -Path .\* -Pattern 'x'` |
| `which tool` | `Get-Command tool` |
| `rm -rf dir` | `Remove-Item -LiteralPath 'dir' -Recurse -Force` after path verification |
| `FOO=bar cmd` | `$env:FOO = 'bar'; cmd` |

## Verification Commands In This Repo

- PHP format after PHP edits: `vendor/bin/pint --dirty --format agent`
- Frontend lint examples: `npx eslint resources/js/pages/foo.tsx`
- Build: `npm run build`
- Laravel routes: `php artisan route:list --except-vendor`
- PHP syntax: `php -l path/to/file.php`

If `npm run build` fails in the sandbox with Tailwind oxide `spawn EPERM`, rerun the exact build with escalated permissions because the native Windows dependency needs to spawn outside the sandbox.
