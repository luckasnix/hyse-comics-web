# Hyse Comics

Hyse Comics is an application for reading comics.

## Getting Started

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

## Production Preview

Build the Nitro output:

```bash
pnpm build
```

Run the generated Nitro server:

```bash
pnpm start
```
