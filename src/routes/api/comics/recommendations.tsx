import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";

import { comicRecommendationsMock } from "~/mocks/comics";

export const Route = createFileRoute("/api/comics/recommendations")({
  server: {
    handlers: {
      // TODO: Connect to Supabase and fetch data from there
      GET: async () => {
        return json(comicRecommendationsMock);
      },
    },
  },
});
