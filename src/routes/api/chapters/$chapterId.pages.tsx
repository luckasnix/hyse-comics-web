import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";

import { pagesMock } from "#/mocks/comics";

export const Route = createFileRoute("/api/chapters/$chapterId/pages")({
  server: {
    handlers: {
      // TODO: Connect to Supabase and fetch data from there
      GET: async ({ params }) => {
        const { chapterId } = params;

        const pages = pagesMock.filter(
          (currentPage) => currentPage.chapterId === chapterId,
        );

        return json(pages);
      },
    },
  },
});
