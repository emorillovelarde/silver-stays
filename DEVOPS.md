# DevOps & Deployment Guide

## GitHub Flow Strategy

We follow the **GitHub Flow** strategy to ensure a robust and continuous delivery pipeline.

### Branches

1.  **`main` (Production)**
    *   **Environment**: Production
    *   **URL**: `silver-stays.vercel.app` (or custom domain)
    *   **Protection**: Protected branch. Requires Pull Request reviews before merging.
    *   **Deployments**: Automatic production deployments on merge.

2.  **`staging` (Integration/QA)**
    *   **Environment**: Preview/Staging
    *   **URL**: `silver-stays-staging.vercel.app` (example)
    *   **Source**: Created from `main`.
    *   **Purpose**: Integration testing and QA before merging to production.
    *   **Deployments**: Automatic preview deployments.

3.  **`feature/*` (Development)**
    *   **Environment**: Preview
    *   **Purpose**: Feature development and bug fixes.
    *   **Lifecycle**: Created from `main` (or `staging` if strictly needed), merged back via PR.
    *   **Deployments**: specific Preview URLs for each PR.

---

## Environment Variables (Secrets)

The following environment variables are required for the application to function correctly in Vercel (Production and Preview environments).

### keys

| Variable Name | Description | Environment |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project URL | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Anonymous Public Key | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Service Role Key (Server-side only) | Production, Preview, Development |

> **Note**: The `SUPABASE_SERVICE_ROLE_KEY` is critical for server-side operations that require admin privileges. Ensure this is **never** exposed to the client.

### Configuration in Vercel

1.  Go to your Vercel Project Settings > **Environment Variables**.
2.  Add the variables listed above.
3.  You can choose to apply them to specific environments (e.g., use a different Supabase project for `Production` vs `Preview` if available).

## Supabase Connection

Ensure your local `.env.local` matches the variables set in Vercel for consistent development.
