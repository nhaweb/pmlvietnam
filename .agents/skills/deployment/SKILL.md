---
name: flyio-deployment
description: Deploy, operate, debug, and maintain the project's web application on Fly.io. Use when the user asks to deploy, redeploy, inspect production status, read Fly.io logs, manage environment variables/secrets, troubleshoot deployment/runtime issues, or verify that the production website is healthy.
---

# Fly.io Deployment Skill

## Purpose

Use this skill to safely manage the project's deployment on Fly.io.

The goal is not only to run `fly deploy`, but to follow a predictable workflow:

1. Inspect the project.
2. Understand the current Fly.io configuration.
3. Validate the application locally when practical.
4. Deploy.
5. Verify the deployed Machine/app.
6. Inspect logs when something fails.
7. Diagnose before changing production configuration.
8. Make the smallest safe fix.
9. Re-deploy and verify again.

---

## Project Context

This is the project's web application.

Before making assumptions about the stack, inspect:

- `package.json`
- framework configuration
- `Dockerfile` / `Dockerfile.*`
- `fly.toml`
- `.dockerignore`
- environment variable usage
- database configuration
- existing deployment scripts

Do not assume the framework, package manager, port, start command, or output directory.

Prefer the project's existing configuration over generic Fly.io examples.

---

## Core Fly.io Commands

Common commands:

```bash
fly status
fly apps list
fly config show
fly logs
fly deploy
fly releases
fly checks list
fly machine list
fly machine status <machine-id>
fly machine logs <machine-id>
fly secrets list
fly secrets set KEY=value
fly volumes list
fly ssh console
```

Before using a command that changes production state, understand what it will modify.

For destructive or potentially disruptive operations, ask the user for confirmation unless they explicitly requested that operation.

---

## Deployment Workflow

### Step 1 — Inspect

Check:

```bash
git status
```

Then inspect:

```text
package.json
fly.toml
Dockerfile
```

Also inspect relevant environment/config files.

Determine:

- package manager
- framework
- build command
- production start command
- application port
- health check configuration
- Fly app name
- Fly primary region
- database/storage dependencies

Do not modify files during inspection.

---

### Step 2 — Validate Locally

When practical, run the project's existing validation commands.

Examples:

```bash
npm run lint
npm run build
```

Use the package manager already used by the project.

If there is a test command, use it when relevant.

Do not invent scripts that are not present in `package.json`.

If the project cannot build locally, diagnose that before deploying unless the user explicitly asks to deploy anyway.

---

### Step 3 — Inspect Fly Configuration

Read `fly.toml`.

Pay attention to:

- `app`
- `primary_region`
- `[build]`
- `[env]`
- `[[services]]`
- `[[http_service]]`
- `[[vm]]`
- `[[mounts]]`
- `[[http_service.checks]]` / health checks
- internal/external ports

Verify that the application listens on the port configured for Fly.io.

Do not blindly regenerate `fly.toml`.

---

### Step 4 — Deploy

Use:

```bash
fly deploy
```

If the project explicitly uses another deployment command, follow the project's existing convention.

Do not add random flags unless they are necessary.

After deployment, immediately check:

```bash
fly status
```

Then inspect recent logs:

```bash
fly logs
```

---

## Deployment Verification

A successful `fly deploy` is not sufficient.

Verify:

1. Fly app is running.
2. Machines are healthy.
3. Health checks pass.
4. Application responds.
5. No obvious startup/runtime errors exist in logs.

Useful commands:

```bash
fly status
fly checks list
fly logs
```

If an application URL is available, verify the production endpoint as appropriate.

---

## Troubleshooting

### Build failure

Check:

```bash
fly deploy
```

and identify whether the failure occurred during:

- dependency installation
- Docker build
- framework build
- asset generation
- runtime image creation

Do not immediately change application code.

First determine the exact failing step.

---

### Container starts but application is unreachable

Check:

```bash
fly status
fly logs
```

Then inspect:

- application listening port
- `internal_port` / service port
- host binding (`0.0.0.0` vs `localhost`)
- health checks
- process start command

A web server inside the container generally needs to listen on the interface accessible from the Fly network, not only `localhost`.

---

### Application crashes after deploy

Inspect:

```bash
fly logs
```

Look for:

- missing environment variables
- missing secrets
- database connection errors
- migration failures
- invalid production configuration
- Node/runtime version mismatch
- memory exhaustion
- application startup exceptions

Fix the root cause instead of repeatedly restarting Machines.

---

### Health check failure

Inspect:

```bash
fly checks list
fly logs
```

Verify:

- health-check path exists
- correct port is used
- application starts before the health-check timeout
- endpoint does not depend on unavailable services unnecessarily

Do not disable health checks merely to make deployment appear successful.

---

### Environment variables / secrets

Inspect existing secrets with:

```bash
fly secrets list
```

Never print secret values into chat, logs, commits, or source files.

When a secret is missing, set it using:

```bash
fly secrets set KEY=value
```

Prefer Fly secrets for sensitive production values.

Do not commit:

```text
.env
.env.production
API keys
database passwords
private tokens
```

---

## Database and Persistent Storage

Before changing database/storage configuration, determine whether the application uses:

- external database
- Fly Managed Postgres
- another Postgres provider
- Fly Volumes
- object storage

Do not assume a filesystem inside a Fly Machine is persistent.

If persistent files are required, inspect existing volume configuration before changing anything.

For database migrations:

1. Understand the project's migration system.
2. Check whether migrations are already part of deployment.
3. Avoid running destructive migrations automatically.
4. Back up/confirm production data strategy when relevant.
5. Ask for confirmation before destructive database operations.

---

## Machines

Fly.io applications may run on one or more Machines.

Inspect them with:

```bash
fly machine list
```

For a specific Machine:

```bash
fly machine status <machine-id>
fly machine logs <machine-id>
```

Do not destroy or recreate Machines unnecessarily.

Prefer the least disruptive operation that solves the problem.

---

## Scaling

Before scaling, inspect current state:

```bash
fly status
fly machine list
```

Consider:

- current number of Machines
- CPU/memory
- traffic
- region
- database capacity
- persistent volume constraints

Do not scale blindly because of a single transient error.

---

## Production Safety Rules

### Never

- expose secrets
- commit secrets
- delete production volumes without explicit confirmation
- destroy production Machines without understanding the impact
- overwrite `fly.toml` blindly
- disable health checks just to hide failures
- assume a successful deploy means the application is healthy
- run destructive database commands without confirmation
- replace working project configuration with generic examples

### Prefer

- inspect first
- make minimal changes
- preserve existing conventions
- verify after every deployment
- use logs to diagnose failures
- keep production changes reversible
- explain the reason for configuration changes

---

## Git Workflow

Before deployment, check:

```bash
git status
```

If there are uncommitted changes, do not assume they should be committed.

Do not automatically:

```bash
git add .
git commit
git push
```

unless the user explicitly asks for that workflow.

Fly deployment and GitHub push are separate operations.

---

## Common Recovery Workflow

When the user says:

> "Deploy đang lỗi"

follow:

```text
1. fly status
       ↓
2. fly logs
       ↓
3. identify failing layer
       ↓
4. inspect relevant project file
       ↓
5. make minimal fix
       ↓
6. run local validation
       ↓
7. fly deploy
       ↓
8. fly status
       ↓
9. fly checks list
       ↓
10. fly logs
```

Report the actual root cause when known.

Do not claim the deployment is fixed until verification succeeds.

---

## When to Ask the User

Ask for confirmation when an action could:

- delete production data
- delete a volume
- destroy production Machines
- change database architecture
- rotate/revoke credentials
- cause significant downtime
- substantially increase infrastructure cost

For ordinary deployment, log inspection, status checks, and non-destructive fixes, proceed when the user has clearly requested the work and the necessary access is available.

---

## Agent Response Format

When performing deployment work, report:

### What I checked

- project configuration
- build
- Fly configuration
- deployment state

### What I changed

Only list actual changes.

### Verification

Include:

- deployment result
- Machine status
- health checks
- relevant runtime errors

### If failed

State:

```text
Cause:
Impact:
Next fix:
```

Do not hide uncertainty.

---

## Useful Reference

Official Fly.io documentation:

- Fly Docs: https://fly.io/docs/
- `fly deploy`: https://fly.io/docs/flyctl/deploy/
- Fly Machines: https://fly.io/docs/machines/
- Fly Volumes: https://fly.io/docs/volumes/
- Fly Secrets: https://fly.io/docs/apps/secrets/
