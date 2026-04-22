#!/usr/bin/env bash
set -euo pipefail
SRC="$(cd "$(dirname "$0")" && pwd)/open-design"
DEST="${CLAUDE_SKILLS_DIR:-$HOME/.claude/skills}/open-design"
mkdir -p "$(dirname "$DEST")"
if [ -L "$DEST" ]; then
  [ "$(readlink "$DEST")" = "$SRC" ] && { echo "already linked: $DEST -> $SRC"; exit 0; }
  [ "${1:-}" = "--force" ] || { echo "stale symlink at $DEST points elsewhere; re-run with --force"; exit 1; }
  rm "$DEST"
elif [ -e "$DEST" ]; then
  echo "real file/dir exists at $DEST — refusing to overwrite; move it aside first"; exit 1
fi
ln -s "$SRC" "$DEST"
echo "linked $DEST -> $SRC"
echo "restart any open Claude Code session to pick up the skill."
