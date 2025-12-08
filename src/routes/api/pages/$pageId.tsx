import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";

import { pagesMock } from "#/mocks/comics";

export const Route = createFileRoute("/api/pages/$pageId")({
  server: {
    handlers: {
      // TODO: Connect to Supabase and fetch data from there
      GET: async ({ params }) => {
        const { pageId } = params;

        const page = pagesMock.find((currentPage) => currentPage.id === pageId);

        if (!page) {
          return json({ message: "Page not found" }, { status: 404 });
        }

        return json(page);
      },
    },
  },
});
