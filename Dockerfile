FROM node:24.22.1-trixie-slim@sha256:43b9ba1142b8dcf33fa8f922ca1be85714adc444e0586c7cf7726daaeabc1bea AS node-base
WORKDIR /app

FROM node-base AS pnpm-base
# renovate: datasource=npm depName=pnpm versioning=npm
ARG PNPM_VERSION=12.15.0
ENV PNPM_HOME=/pnpm
ENV PATH="${PNPM_HOME}:${PATH}"
RUN npm install --global pnpm@${PNPM_VERSION}

FROM pnpm-base AS build
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts
COPY . .
RUN pnpm build

FROM pnpm-base AS production-deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --prod --frozen-lockfile --ignore-scripts && mkdir -p node_modules

FROM node-base AS runtime
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=build --chown=node:node /app/dist ./dist
COPY --from=production-deps --chown=node:node /app/node_modules ./node_modules
COPY --from=production-deps --chown=node:node /app/package.json ./
COPY --from=production-deps --chown=node:node /app/pnpm-lock.yaml ./
COPY --from=production-deps --chown=node:node /app/pnpm-workspace.yaml ./
USER node
EXPOSE 3000
CMD ["node", "dist/server.js"]