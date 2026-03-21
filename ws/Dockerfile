# ── Base ──
FROM node:20-alpine AS base
WORKDIR /app

# ── Dependencies ──
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# ── Development (for docker-compose dev mode) ──
FROM base AS development
WORKDIR /app
COPY . .
EXPOSE 5000
CMD ["sh", "-c", "npm install && npx prisma generate && npm run start:dev"]

# ── Builder ──
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# ── Production Runner ──
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nest

# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm ci --only=production --ignore-scripts

# Copy compiled output and prisma client
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

USER nest
EXPOSE 5000
CMD ["node", "dist/main"]