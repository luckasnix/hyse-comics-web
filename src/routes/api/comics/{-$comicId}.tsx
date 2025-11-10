import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";

import { comicsMock } from "~/mocks/comics";

export const Route = createFileRoute("/api/comics/{-$comicId}")({
  server: {
    handlers: {
      // TODO: Connect to Supabase and fetch data from there
      GET: async ({ params }) => {
        const { comicId } = params;

        if (!comicId) {
          return json(comicsMock);
        }

        const comic = comicsMock.find(
          (currentComic) => currentComic.id === comicId,
        );

        if (!comic) {
          return json({ message: "Comic not found" }, { status: 404 });
        }

        return json(comic);
      },
    },
  },
});
