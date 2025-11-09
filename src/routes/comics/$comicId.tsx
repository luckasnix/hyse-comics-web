import { createFileRoute } from "@tanstack/react-router";

// TODO: Write route
const ComicRoute = () => (
  <main>
    <h1>🚧 Under Construction</h1>
  </main>
);

export const Route = createFileRoute("/comics/$comicId")({
  component: ComicRoute,
});
