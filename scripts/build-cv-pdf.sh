#!/usr/bin/env bash
# Regenerate files/David-Amebley-CV.pdf from the CV data (_data/cv.yml and _publications/).
#
# Renders the unpublished print page (_pages/cv-pdf.html, layout _layouts/cv-pdf.html) into a
# temporary folder and prints it with headless Google Chrome or Chromium, which writes a tagged
# PDF (headings, lists, links, bookmarks, title and language). Run from anywhere:
#
#   scripts/build-cv-pdf.sh
#
# Requires Bundler (see README.md, "Local preview") and Chrome or Chromium. Set CHROME to the
# browser executable if it is not found automatically.
set -euo pipefail

repo="$(cd "$(dirname "$0")/.." && pwd)"
output="$repo/files/David-Amebley-CV.pdf"

chrome="${CHROME:-}"
if [ -z "$chrome" ]; then
  for candidate in \
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
    "$(command -v google-chrome || true)" \
    "$(command -v chromium || true)"; do
    if [ -n "$candidate" ] && [ -x "$candidate" ]; then
      chrome="$candidate"
      break
    fi
  done
fi
if [ -z "$chrome" ]; then
  echo "Chrome or Chromium not found; set CHROME to its executable." >&2
  exit 1
fi

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

cd "$repo"
# Jekyll output (mostly template Sass deprecation notices) is shown only if the build fails
if ! JEKYLL_ENV=production bundle exec jekyll build --unpublished --destination "$tmp/site" > "$tmp/build.log" 2>&1; then
  cat "$tmp/build.log" >&2
  exit 1
fi

mkdir -p "$(dirname "$output")"
"$chrome" --headless --disable-gpu --no-pdf-header-footer --generate-pdf-document-outline \
  --print-to-pdf="$output" "file://$tmp/site/cv-pdf/index.html" 2>/dev/null

echo "Wrote $output"
