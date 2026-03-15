FROM node:20-alpine AS base

WORKDIR /app

FROM base as deps

COPY package.json package-lock.json ./
RUN npm ci

FROM base as development

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN npx prisma generate

EXPOSE 5000
CMD [ "npm","run","start:dev" ]

FROM base as builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN npx prisma generate

RUN npm run build

FROM  base AS runner

WORKDIR /app

RUN  addgroup --system --gid 1001 nodetjs
RUN  adduser --system --uid 1001 nest

COPY --from=builder ./dist ./app

USER nest

EXPOSE 5000

CMD [ "npm","run","start:prod" ]