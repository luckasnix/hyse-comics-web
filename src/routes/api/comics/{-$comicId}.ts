import { createFileRoute } from "@tanstack/react-router";

import { comicsMock } from "#/mocks/comics";

export const Route = createFileRoute("/api/comics/{-$comicId}")({
  server: {
    handlers: {
      // TODO: Connect to Supabase and fetch data from there
      GET: async ({ params }) => {
        const { comicId } = params;

        if (!comicId) {
          return Response.json(comicsMock);
        }

        const comic = comicsMock.find(
          (currentComic) => currentComic.id === comicId,
        );

        if (!comic) {
          return Response.json({ message: "Comic not found" }, { status: 404 });
        }

        return Response.json(comic);
      },
    },
  },
});
