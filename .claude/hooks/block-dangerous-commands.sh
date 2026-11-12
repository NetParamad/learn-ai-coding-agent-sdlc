#!/usr/bin/env bash
# PreToolUse Hook: Block dangerous commands (rm -rf, git push --force)

set -euo pipefail

# Read stdin JSON payload from Claude Code
INPUT=$(cat)

# Extract command string using node or jq or python
COMMAND=$(node -e "
  try {
    const data = JSON.parse(process.argv[1]);
    const cmd = data.tool_input?.command || data.command || '';
    process.stdout.write(cmd);
  } catch(e) {
    process.stdout.write('');
  }
" "$INPUT" 2>/dev/null || true)

if [ -z "$COMMAND" ]; then
  exit 0
fi

# Check for rm -rf or rm -r -f
if echo "$COMMAND" | grep -Eq '\brm\s+.*(-[a-zA-Z]*r[a-zA-Z]*f|-[a-zA-Z]*f[a-zA-Z]*r|--recursive\s+--force|--force\s+--recursive|-rf|-fr)\b'; then
  echo "[BLOCKED] rm -rf command is prohibited by safety policy." >&2
  exit 2
fi

# Check for git push --force or git push -f
if echo "$COMMAND" | grep -Eq '\bgit\s+push\b.*(\s+-f\b|\s+--force\b|\s+--force-with-lease\b|\+refs/)'; then
  echo "[BLOCKED] git push --force command is prohibited by safety policy." >&2
  exit 2
fi

exit 0
