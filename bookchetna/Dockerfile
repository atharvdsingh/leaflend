# ==========================================
# STAGE 1: Base Image
# ==========================================
FROM node:20-alpine AS base

# Install libc6-compat (Required for Prisma on Alpine)
RUN apk add --no-cache libc6-compat
WORKDIR /app

# ==========================================
# STAGE 2: Dependencies (Install modules)
# ==========================================
FROM base AS deps
COPY package.json package-lock.json ./ 
# Install all dependencies (including devDependencies for building)
RUN npm ci --ignore-scripts
# ==========================================
# STAGE 3: Development
# ==========================================
FROM base AS development
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true
ENV NEXT_PRIVATE_POLL_INTERVAL_MS=1000


# Generate Prisma Client for the container's OS
RUN npx prisma generate

# Expose Next.js default port
EXPOSE 3000
CMD ["npm", "run", "dev"]

# ==========================================
# STAGE 4: Builder (Compile for Prod)
# ==========================================
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 1. Generate Prisma Client (Critical step!)
RUN npx prisma generate

# 2. Build Next.js (Standalone mode)
# This will use the 'output: standalone' config
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# ==========================================
# STAGE 5: Production Runner
# ==========================================
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1


# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the public assets (images, fonts, etc)
COPY --from=builder /app/public ./public

# Copy the specific "standalone" output
# This folder contains a minimal server.js and only necessary node_modules
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

EXPOSE 3000

ENV PORT 3000
CMD ["node", "server.js"]