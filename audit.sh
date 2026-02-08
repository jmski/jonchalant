#!/bin/bash

# Quick Lighthouse Audit Script

REPORTS_DIR="./performance-reports"
mkdir -p "$REPORTS_DIR"

echo "========================================"
echo "Performance Baseline - Lighthouse Audits"
echo "========================================"
echo ""

# Test if server is running
if ! curl -s http://localhost:3000 > /dev/null 2>&1; then
  echo "Error: Dev server not running on localhost:3000"
  echo "Start with: npm run dev"
  exit 1
fi

echo "✓ Dev server is running"
echo ""

# Pages to audit
declare -a pages=("/" "/dance" "/collaborations")

for page in "${pages[@]}"; do
  echo "Auditing: http://localhost:3000$page"
  
  filename=$(echo "$page" | sed 's/\///' | sed 's/\//dash/g' | tr -d '[:space:]')
  [ -z "$filename" ] && filename="home"
  
  npx --yes lighthouse "http://localhost:3000$page" \
    --output=json \
    --output-path="$REPORTS_DIR/${filename}.json" \
    --chrome-flags="--headless=new --no-sandbox" \
    --disable-device-emulation \
    2>&1 | grep "Performance\|Accessibility\|Best\|SEO" || true
  
  echo ""
  sleep 3
done

echo "Reports saved to: $REPORTS_DIR/"
ls -lh "$REPORTS_DIR" 2>/dev/null | tail -5
