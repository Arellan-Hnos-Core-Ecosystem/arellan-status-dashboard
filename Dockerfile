# syntax=docker/dockerfile:1
# Build context: raiz del ecosistema (../ desde arellan-infrastructure)

# ---------- Stage 1: builder ----------
FROM node:24-alpine AS builder
WORKDIR /workspace/arellan-status-dashboard

COPY arellan-status-dashboard/package.json arellan-status-dashboard/package-lock.json ./
RUN npm install --no-audit --no-fund

COPY arellan-status-dashboard/. .
RUN npm run build

# ---------- Stage 2: runner ----------
FROM node:24-alpine AS runner
WORKDIR /workspace/arellan-status-dashboard
ENV NODE_ENV=production

COPY --from=builder /workspace/arellan-status-dashboard/public ./public
COPY --from=builder /workspace/arellan-status-dashboard/.next/standalone ./
COPY --from=builder /workspace/arellan-status-dashboard/.next/static ./.next/static

EXPOSE 3006
CMD ["node", "server.js"]
