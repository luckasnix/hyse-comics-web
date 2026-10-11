# Deployment

This guide covers production preview, validation, and deployment. The project is configured for Cloudflare Workers and deploys as one Worker with static assets, following the official [TanStack Start hosting guide](https://tanstack.com/start/latest/docs/framework/react/guide/hosting#cloudflare-workers-official-partner) and [Cloudflare TanStack Start guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/).

## Production preview and deployment validation

Build the Worker and its static assets, then preview the production build in the local Workers runtime:

```bash
pn build
pn preview
```

Vite generates `dist/server` and `dist/client`, along with a deployment configuration in `.wrangler/deploy/config.json`. Wrangler automatically uses this generated configuration. Do not upload only `dist/client`: the application also needs its SSR server and `/api` routes.

Validate the deployment bundle without publishing or logging in:

```bash
pn deploy:check
```

## First deployment from your machine

1. Create a Cloudflare account if you do not already have one.

2. Install dependencies using the Node.js and pnpm versions specified in [`.nvmrc`](../.nvmrc) and [`package.json`](../package.json):

    ```bash
    pn install --frozen-lockfile
    ```

    [`pnpm-workspace.yaml`](../pnpm-workspace.yaml) allows the required installation scripts for `esbuild` and `workerd` so a fresh installation can build and run the Workers runtime.

3. Authenticate with the project's installed Wrangler and check the selected account:

    ```bash
    pn exec wrangler login
    pn exec wrangler whoami
    ```

    If you have several Cloudflare accounts, set `account_id` in [`wrangler.jsonc`](../wrangler.jsonc) to the intended account ID before deploying.

4. Review [`wrangler.jsonc`](../wrangler.jsonc). The Worker is named `hyse-comics-web`; change `name` if you want a different name. `workers_dev` enables the initial public URL, and observability enables Worker logs. The `global_fetch_strictly_public` flag lets SSR loaders call this Worker's own API through its public origin, including custom domains.

5. Publish:

    ```bash
    pn deploy
    ```

    This checks TypeScript, builds the application, and deploys the Worker and static assets. Wrangler prints the resulting `https://hyse-comics-web.<your-subdomain>.workers.dev` URL; configure your Workers subdomain if prompted.

6. Open the URL and verify the homepage, a comic, a chapter, a user profile, and `/api/comics`. Also open a nested page directly to check SSR.

For subsequent deployments, run `pn deploy` again after reviewing your changes.

## Optional: automatic deployments from Git

Commit and push these files, then connect this repository to a Worker through [Cloudflare Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/). Use the repository root, select your production branch, and ensure the Worker name matches `name` in [`wrangler.jsonc`](../wrangler.jsonc).

- Build variables: `NODE_VERSION=26.4.0`, `PNPM_VERSION=12.6.0`, and `SKIP_DEPENDENCY_INSTALL=1`.
- Build command: `pn install --frozen-lockfile && pn type:check && pn build`.
- Deploy command: `pn exec wrangler deploy`.

These variables select the versions in [`.nvmrc`](../.nvmrc) and [`package.json`](../package.json) and make dependency installation explicit in the build command. Keep them in sync when changing the project's runtime versions. See [Cloudflare's build image settings](https://developers.cloudflare.com/workers/ci-cd/builds/build-image/).

The existing GitHub workflow continues to validate types, formatting, tests, and builds. Deployments are configured separately in Cloudflare; the workflow does not publish the application.

## Optional: custom domain

After the first deployment, open your Worker in the Cloudflare dashboard and go to **Settings → Domains & Routes → Add → Custom Domain**. Add a domain from a zone in your Cloudflare account, such as `comics.hyse.app` if you manage `hyse.app`. See the [Custom Domains guide](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/).

## Data, bindings, and secrets

The current application does not require D1, KV, R2, or production secrets. Hosting publishes the current prototype: APIs still serve mock data, and sign-in/sign-up are UI placeholders. External image URLs must remain publicly accessible; deploying the Worker does not migrate those images.

When adding a real backend, declare its bindings in [`wrangler.jsonc`](../wrangler.jsonc). Generate their TypeScript definitions with `pn cf-typegen` before checking types. Generated definitions and local Workers state are ignored by Git.

Use a gitignored `.dev.vars` file for local secrets. For production secrets, use `pn exec wrangler secret put SECRET_NAME` or the Cloudflare dashboard. Do not put secrets in [`wrangler.jsonc`](../wrangler.jsonc) or variables prefixed with `VITE_`, which are exposed to the browser. See [Cloudflare secrets](https://developers.cloudflare.com/workers/configuration/secrets/).
