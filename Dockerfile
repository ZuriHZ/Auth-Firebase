# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

ARG NODE_VERSION=25.0.0
ARG PNPM_VERSION=10.19.0

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base

# Set working directory for all build stages.
WORKDIR /usr/src/app

# Install pnpm.
RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION}

################################################################################
# Create a stage for installing dependencies.
FROM base as deps

# Download dependencies as a separate step to take advantage of Docker's caching.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

################################################################################
# Create a stage for building the application.
FROM deps as build

# Copy all source files into the image.
COPY . .

# Run the build script (this creates /dist)
RUN pnpm run build

################################################################################
# Create a new stage to run the application with minimal runtime dependencies.
FROM base as final

# Use production node environment by default.
ENV NODE_ENV=production

# Set the working directory.
WORKDIR /usr/src/app

# Run the application as a non-root user for safety.
USER node

# Copy only the built app from the build stage.
COPY --from=build /usr/src/app/dist ./dist

# Install a lightweight static server for serving the built app.
RUN pnpm add -g serve

# Expose the port your app runs on.
EXPOSE 5173

# Serve the static build.
CMD ["serve", "-s", "dist", "-l", "5173"]
