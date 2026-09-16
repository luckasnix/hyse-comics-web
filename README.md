# Hyse Comics

![Hyse Comics logo featuring a green illustrated emblem beside the wordmark.](public/logo.svg "Hyse Comics logo")

Hyse Comics is an application for reading comics.

## 🛠️ Built with

- [TypeScript](https://www.typescriptlang.org) keeps the application typed and maintainable.
- [Vite](https://vite.dev) and [Nitro](https://nitro.build) power development, production builds, and the server output.
- [TanStack Start](https://tanstack.com/start) provides the full-stack application framework, including routing and data loading.
- [React](https://react.dev) provides the user interface.
- [Material UI](https://mui.com/material-ui), [Embla Carousel](https://www.embla-carousel.com), and [Tabler Icons](https://tabler.io/icons) provide the application's components and icons.
- [Vitest](https://vitest.dev) provides the test runner, using [Browser Mode](https://vitest.dev/guide/browser) with [Playwright](https://playwright.dev) for component and user-interaction tests in Chromium.

## 🚀 Getting started

Follow the steps below to set up and run the project in your local environment.

Before you begin, make sure [Node.js](https://nodejs.org/en/download) and [pnpm](https://pnpm.io/installation) are installed at the versions specified in [`.nvmrc`](./.nvmrc) and the `packageManager` field of [`package.json`](./package.json), respectively.

1. Clone the repository:

    Open your terminal and run the following command:

    ```bash
    git clone https://github.com/luckasnix/hyse-comics-web.git
    ```

2. Navigate to the project directory:

    ```bash
    cd hyse-comics-web
    ```

3. Install dependencies:

    ```bash
    pnpm install --frozen-lockfile
    ```

4. Set up environment variables:

    Copy the `.env.example` file to `.env`:

    ```bash
    cp .env.example .env
    ```

    Update the values in `.env` if needed. Internal API calls use the active runtime origin.

5. Run the development server:

    ```bash
    pnpm dev
    ```

6. Open in your browser:

    Open [http://localhost:3001](http://localhost:3001) in your browser to view the result.

## 🧪 Testing

Tests use Vitest with Browser Mode and Playwright for browser-dependent behavior in Chromium. Browser-independent tests run directly in Node.js.

After installing the project dependencies, install Chromium once:

```bash
pnpm exec playwright install chromium
```

Run the test suite once:

```bash
pnpm test
```

Start Vitest in watch mode while developing:

```bash
pnpm test:watch
```

Generate the coverage report:

```bash
pnpm test:coverage
```

## 📦 Production preview

Build the Nitro output:

```bash
pnpm build
```

Run the generated Nitro server:

```bash
pnpm start
```

## 📄 License

Licensed under the [PolyForm Shield License 1.0.0](./LICENSE.md).
