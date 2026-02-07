#!/bin/bash

# Performance Baseline Testing Script
# Tests key pages and collects metrics

echo "==================================================================="
echo "PERFORMANCE BASELINE TEST - jon.design portfolio"
echo "==================================================================="
echo ""
echo "Testing localhost:3000..."
echo ""

# Wait for dev server to be ready
echo "Waiting for dev server to be ready..."
for i in {1..30}; do
  if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "✓ Dev server is ready!"
    break
  fi
  sleep 1
done

# Array of pages to test
declare -a PAGES=(
  "/"
  "/about"
  "/dance"
  "/showcase"
  "/collaborations"
  "/contact"
  "/media-kit"
)

echo ""
echo "Running Lighthouse audits on key pages..."
echo ""

# Create output directory
mkdir -p ./performance-reports

# Test each page
for page in "${PAGES[@]}"; do
  echo "Testing: http://localhost:3000$page"
  
  # Run lighthouse with simplified output
  npx lighthouse "http://localhost:3000$page" \
    --output=json \
    --output-path="./performance-reports${page}.json" \
    --chrome-flags="--headless=new --no-sandbox" \
    --quiet \
    2>/dev/null
  
  if [ $? -eq 0 ]; then
    echo "  ✓ Audit complete"
  else
    echo "  ✗ Audit failed"
  fi
  
  # Small delay between tests
  sleep 2
done

echo ""
echo "==================================================================="
echo "Lighthouse audits complete!"
echo "Reports saved to: ./performance-reports/"
echo "==================================================================="
