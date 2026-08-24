#!/usr/bin/env bash
# Scaffolds a new client prototype inside this monorepo, creates its Vercel
# project (scoped to the `nivaror` team) with the right Root Directory, wires
# it to auto-deploy on push, and commits/pushes the initial scaffold.
#
# Every project also gets a vercel.json with an `ignoreCommand`, so a push to
# main only rebuilds THIS project when its own folder actually changed —
# without it, every push rebuilds every project in the team (found 2026-08-24
# after this drained the whole free-tier daily deployment quota off ~5
# prototypes' worth of pushes; see core/prototype-workflow.md).
#
# Usage: scripts/new-prototype.sh <slug> [template]
#   slug      required, lowercase kebab-case (e.g. consultorios-kem)
#   template  optional, name of a folder under _templates/ (default: nextjs-basic)
set -euo pipefail

SLUG="${1:?Usage: scripts/new-prototype.sh <slug> [template]}"
TEMPLATE="${2:-nextjs-basic}"

if [[ ! "$SLUG" =~ ^[a-z0-9]+(-[a-z0-9]+)*$ ]]; then
  echo "Error: slug must be lowercase kebab-case (letters, digits, hyphens). Got: $SLUG" >&2
  exit 1
fi

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PROTO_DIR="$REPO_ROOT/prototypes/$SLUG"
TEMPLATE_DIR="$REPO_ROOT/_templates/$TEMPLATE"
TEAM_SLUG="nivaror"
PROJECT_NAME="prototipos-$SLUG"

if [[ -e "$PROTO_DIR" ]]; then
  echo "Error: $PROTO_DIR already exists." >&2
  exit 1
fi

if [[ ! -d "$TEMPLATE_DIR" ]]; then
  echo "Error: template not found at $TEMPLATE_DIR" >&2
  echo "Available templates:" >&2
  ls "$REPO_ROOT/_templates" >&2
  exit 1
fi

echo "==> Scaffolding $PROTO_DIR from _templates/$TEMPLATE"
cp -R "$TEMPLATE_DIR" "$PROTO_DIR"
rm -rf "$PROTO_DIR/.git" "$PROTO_DIR/node_modules" "$PROTO_DIR/.next" "$PROTO_DIR/.vercel"

if [[ ! -f "$PROTO_DIR/vercel.json" ]]; then
  echo "==> Writing vercel.json (ignoreCommand, so this project only rebuilds when its own folder changes)"
  cat > "$PROTO_DIR/vercel.json" <<'EOF'
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "ignoreCommand": "git diff --quiet HEAD^ HEAD -- ."
}
EOF
fi

if [[ -f "$PROTO_DIR/package.json" ]] && command -v node >/dev/null; then
  node -e "
    const fs = require('fs');
    const p = '$PROTO_DIR/package.json';
    const j = JSON.parse(fs.readFileSync(p, 'utf8'));
    j.name = '$PROJECT_NAME';
    fs.writeFileSync(p, JSON.stringify(j, null, 2) + '\n');
  "
fi

if [[ -f "$PROTO_DIR/package.json" ]]; then
  echo "==> Installing dependencies"
  (cd "$PROTO_DIR" && npm install --silent)
fi

echo "==> Creating Vercel project ($PROJECT_NAME) in team $TEAM_SLUG"
(cd "$PROTO_DIR" && vercel link --yes --project "$PROJECT_NAME" --scope "$TEAM_SLUG")

PROJECT_ID="$(node -e "console.log(require('$PROTO_DIR/.vercel/project.json').projectId)")"
ORG_ID="$(node -e "console.log(require('$PROTO_DIR/.vercel/project.json').orgId)")"

VERCEL_AUTH_FILE="$HOME/Library/Application Support/com.vercel.cli/auth.json"
VERCEL_TOKEN="$(node -e "console.log(require('$VERCEL_AUTH_FILE').token)")"

echo "==> Setting Root Directory to prototypes/$SLUG"
curl -s -X PATCH "https://api.vercel.com/v9/projects/$PROJECT_ID?teamId=$ORG_ID" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"rootDirectory\":\"prototypes/$SLUG\"}" >/dev/null

echo "==> Connecting Vercel project to GitHub (auto-deploy on push)"
(cd "$REPO_ROOT" && VERCEL_ORG_ID="$ORG_ID" VERCEL_PROJECT_ID="$PROJECT_ID" vercel git connect --yes)

echo "==> Committing and pushing scaffold"
cd "$REPO_ROOT"
git add "prototypes/$SLUG"
git commit -m "Scaffold prototype: $SLUG"
git push

echo
echo "Done. $SLUG will deploy automatically on every push to main that touches prototypes/$SLUG."
echo "Production URL: https://$PROJECT_NAME.vercel.app (live after the first deploy finishes)"
echo
echo "Next: record it in the vault at Nivaror Vault/prototypes/$SLUG.md (type, stack, deploy_url, status, used_by)."
