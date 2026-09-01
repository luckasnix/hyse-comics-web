# Hyse Comics

![Hyse Comics logo featuring a green illustrated emblem beside the wordmark.](public/logo.svg "Hyse Comics logo")

Hyse Comics is an application for reading comics.

## 🛠️ Built with

- [TypeScript](https://www.typescriptlang.org) keeps the application typed and maintainable.
- [Vite](https://vite.dev) and [Nitro](https://nitro.build) power development, production builds, and the server output.
- [TanStack Start](https://tanstack.com/start) provides the full-stack application framework, including routing and data loading.
- [React](https://react.dev) provides the user interface.
- [Material UI](https://mui.com/material-ui), [Embla Carousel](https://www.embla-carousel.com), and [Tabler Icons](https://tabler.io/icons) provide the application's components and icons.
- [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com) support reliable component and user-interaction tests.

## 🚀 Getting started

Follow the steps below to set up and run the project in your local environment.

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
    pnpm install
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
