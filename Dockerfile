FROM node:24-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat vips-dev
WORKDIR /app
COPY package*.json ./
RUN rm -f package-lock.json && npm install

FROM base AS builder
RUN apk add --no-cache vips-dev
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

FROM base AS runner
RUN apk add --no-cache vips
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Full node_modules needed for prisma CLI at startup
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts

# Startup script
COPY start.sh ./start.sh
RUN chmod +x ./start.sh && chown nextjs:nodejs ./start.sh

# Uploads-Verzeichnis erstellen und dem nextjs-User zuweisen
RUN mkdir -p ./public/uploads && chown -R nextjs:nodejs ./public

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["./start.sh"]
