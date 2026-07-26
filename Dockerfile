# Hafsum site — single container that builds the React frontend and runs the Node
# order API (which serves that build). Build context is the repo root because the
# server imports/serves files from the sibling hafsum-react/ folder.
#
#   docker build -t hafsum .
#   docker run -p 4000:4000 --env-file hafsum-server/.env -v hafsum-data:/data hafsum
#
# Order data lives in the /data volume (DATA_DIR), so it survives container restarts.

# ---- stage 1: build the frontend ----
FROM node:20-alpine AS web
WORKDIR /app/hafsum-react
COPY hafsum-react/package.json hafsum-react/package-lock.json ./
RUN npm ci
COPY hafsum-react/ ./
RUN npm run build

# ---- stage 2: runtime (API + built frontend) ----
FROM node:20-alpine
ENV NODE_ENV=production
WORKDIR /app/hafsum-server

COPY hafsum-server/package.json hafsum-server/package-lock.json ./
RUN npm ci --omit=dev

COPY hafsum-server/ ./
# The API serves the built site and imports the shared menu module at runtime,
# so both the build output and hafsum-react/src must be present in the image.
COPY --from=web /app/hafsum-react/dist /app/hafsum-react/dist
COPY hafsum-react/src /app/hafsum-react/src

ENV PORT=4000
ENV DATA_DIR=/data
VOLUME /data
EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s \
  CMD wget -qO- http://localhost:4000/api/health || exit 1

CMD ["node", "server.js"]
