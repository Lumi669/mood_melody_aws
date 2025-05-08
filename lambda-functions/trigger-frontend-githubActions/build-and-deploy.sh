#!/usr/bin/env bash
set -euo pipefail

# Determine script directory (so you can run from anywhere)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$SCRIPT_DIR"
DEPLOY_TMP="$(mktemp -d)"

# 1) Install dependencies (include devDeps if lockfile exists; otherwise allow install)
if [ -f "$ROOT/pnpm-lock.yaml" ]; then
  pnpm install --frozen-lockfile
else
  pnpm install --no-frozen-lockfile
fi

# 2) Build your TypeScript
pnpm run build

# 3) Copy only the built code and package.json into the temp folder
cp -R "$ROOT/dist" "$DEPLOY_TMP/"
cp "$ROOT/package.json" "$DEPLOY_TMP/"

# 4) In the temp folder, install only prod deps (copy lockfile if present)
pushd "$DEPLOY_TMP" >/dev/null
if [ -f "$ROOT/pnpm-lock.yaml" ]; then
  cp "$ROOT/pnpm-lock.yaml" .
  pnpm install --prod --frozen-lockfile
  rm pnpm-lock.yaml
else
  pnpm install --prod --no-frozen-lockfile
fi
popd >/dev/null

# 5) Remove any previous ZIP so we start fresh
rm -f "$ROOT/trigger-frontend-build.zip"

# 6) Zip it up
(
  cd "$DEPLOY_TMP"
  zip -r "$ROOT/trigger-frontend-build.zip" .
)

# 7) Clean up
rm -rf "$DEPLOY_TMP"

echo "✅ trigger-frontend-build.zip is ready"
