#!/bin/sh
set -e

echo "→ Prisma DB Push..."
node_modules/prisma/build/index.js db push

echo "→ Starting Next.js..."
exec node server.js
