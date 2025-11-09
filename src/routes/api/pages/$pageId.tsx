import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";

import { comicPagesMock } from "~/mocks/comics";

export const Route = createFileRoute("/api/pages/$pageId")({
  server: {
    handlers: {
      // TODO: Connect to Supabase and fetch data from there
      GET: async ({ params }) => {
        const { pageId } = params;

        const page = comicPagesMock.find(
          (currentPage) => currentPage.id === pageId,
        );

        if (!page) {
          return new Response(JSON.stringify({ message: "Page not found" }), {
            status: 404,
            headers: {
              "Content-Type": "application/json",
            },
          });
        }

        return json(page);
      },
    },
  },
});
