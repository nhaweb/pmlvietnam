# syntax = docker/dockerfile:1
# Adjust NODE_VERSION as desired
ARG NODE_VERSION=22.21.1
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Next.js"

# Next.js app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production" \
    PORT="8080" \
    HOSTNAME="0.0.0.0"


# Throw-away build stage to reduce size of final image
FROM base AS build

# NEXT_PUBLIC_* must be present at `next build` (inlined into the client bundle).
# Values come from fly.toml [build.args] / `fly deploy --build-arg`.
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_META_PIXEL_ID
ARG NEXT_PUBLIC_GOOGLE_TAG_ID
ARG NEXT_PUBLIC_SANITY_PROJECT_ID
ARG NEXT_PUBLIC_SANITY_DATASET
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_META_PIXEL_ID=$NEXT_PUBLIC_META_PIXEL_ID \
    NEXT_PUBLIC_GOOGLE_TAG_ID=$NEXT_PUBLIC_GOOGLE_TAG_ID \
    NEXT_PUBLIC_SANITY_PROJECT_ID=$NEXT_PUBLIC_SANITY_PROJECT_ID \
    NEXT_PUBLIC_SANITY_DATASET=$NEXT_PUBLIC_SANITY_DATASET

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install node modules
COPY package-lock.json package.json ./
RUN npm ci --include=dev

# Copy application code
COPY . .

# Full production build (compile + generate) at image build time.
# Do NOT defer generate to container start — that OOMs 512MB machines.
RUN npm run build

# Remove development dependencies
RUN npm prune --omit=dev


# Final stage for app image
FROM base

# sharp (next/image) fragments glibc malloc until the 512MB machine OOMs;
# jemalloc keeps RSS flat. https://sharp.pixelplumbing.com/install#linux-memory-allocator
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y libjemalloc2 && \
    rm -rf /var/lib/apt/lists/*
ENV LD_PRELOAD="/usr/lib/x86_64-linux-gnu/libjemalloc.so.2"

# Copy built application
COPY --from=build /app /app

# Invoke node directly so a Windows CRLF shebang cannot break the container.
ENTRYPOINT [ "node", "/app/docker-entrypoint.js" ]

# Start the server by default, this can be overwritten at runtime.
# Call next directly — an extra `npm` process costs ~50-70MB RSS.
EXPOSE 8080
CMD [ "node", "node_modules/next/dist/bin/next", "start" ]
