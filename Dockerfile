FROM node:24.22.0-trixie-slim@sha256:7f486cabe892bff8fef04c0f7da8dba84a560be3e4e2740b7a86afc57ebec315 AS pnpm-base

ENV PNPM_HOME=/pnpm
ENV PATH="${PNPM_HOME}:${PATH}"
WORKDIR /app
RUN npm install --global pnpm@12.14.0

FROM pnpm-base AS build
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts
COPY . .
RUN pnpm build

FROM pnpm-base AS production-deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --prod --frozen-lockfile --ignore-scripts && mkdir -p node_modules

FROM node:24.22.0-trixie-slim@sha256:7f486cabe892bff8fef04c0f7da8dba84a560be3e4e2740b7a86afc57ebec315 AS runtime
ENV NODE_ENV=production
ENV PORT=3000
WORKDIR /app
COPY --from=build --chown=node:node /app/dist ./dist
COPY --from=production-deps --chown=node:node /app/node_modules ./node_modules
COPY --from=production-deps --chown=node:node /app/package.json ./
COPY --from=production-deps --chown=node:node /app/pnpm-lock.yaml ./
COPY --from=production-deps --chown=node:node /app/pnpm-workspace.yaml ./
USER node
EXPOSE 3000
CMD ["node", "dist/server.js"]