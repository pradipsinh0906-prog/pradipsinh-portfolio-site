#!/bin/bash
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PUB="$DIR/public"

mkdir -p "$PUB"

echo "Generating 512x512 master favicon..."
convert -size 512x512 xc:none \
  -fill "#0D1117" -stroke "#6366F1" -strokewidth 24 \
  -draw "roundrectangle 16,16,496,496,105,105" \
  -fill white -stroke none -font "Helvetica-Bold" -pointsize 260 -gravity center -draw "text 0,0 'PJ'" \
  "$PUB/favicon-512x512.png"

cp "$PUB/favicon-512x512.png" "$PUB/favicon.png"

echo "Generating 192x192 favicon..."
convert -size 192x192 xc:none \
  -fill "#0D1117" -stroke "#6366F1" -strokewidth 9 \
  -draw "roundrectangle 6,6,186,186,39,39" \
  -fill white -stroke none -font "Helvetica-Bold" -pointsize 98 -gravity center -draw "text 0,0 'PJ'" \
  "$PUB/favicon-192x192.png"

echo "Generating 180x180 Apple Touch Icon..."
convert -size 180x180 xc:none \
  -fill "#0D1117" -stroke "#6366F1" -strokewidth 9 \
  -draw "roundrectangle 6,6,174,174,36,36" \
  -fill white -stroke none -font "Helvetica-Bold" -pointsize 92 -gravity center -draw "text 0,0 'PJ'" \
  "$PUB/apple-touch-icon.png"

echo "Generating 64x64 favicon..."
convert -size 64x64 xc:none \
  -fill "#0D1117" -stroke "#6366F1" -strokewidth 3.5 \
  -draw "roundrectangle 2,2,61,61,13,13" \
  -fill white -stroke none -font "Helvetica-Bold" -pointsize 34 -gravity center -draw "text 0,0 'PJ'" \
  "$PUB/favicon-64x64.png"

echo "Generating 32x32 crisp tab favicon..."
convert -size 32x32 xc:none \
  -fill "#0D1117" -stroke "#6366F1" -strokewidth 2 \
  -draw "roundrectangle 1,1,30,30,6,6" \
  -fill white -stroke none -font "Helvetica-Bold" -pointsize 17 -gravity center -draw "text 0,0 'PJ'" \
  "$PUB/favicon-32x32.png"

echo "Generating 16x16 crisp tab favicon..."
convert -size 16x16 xc:none \
  -fill "#0D1117" -stroke "#6366F1" -strokewidth 1.2 \
  -draw "roundrectangle 0.6,0.6,15.4,15.4,3,3" \
  -fill white -stroke none -font "Helvetica-Bold" -pointsize 9 -gravity center -draw "text 0,0 'PJ'" \
  "$PUB/favicon-16x16.png"

echo "Generating favicon.ico with 16x16, 32x32, 64x64 resolutions..."
convert "$PUB/favicon-16x16.png" "$PUB/favicon-32x32.png" "$PUB/favicon-64x64.png" "$PUB/favicon.ico"

echo "Favicon generation complete!"
