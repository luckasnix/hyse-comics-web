import { createFileRoute } from "@tanstack/react-router";

import { pagesMock } from "#/mocks/comics";

export const Route = createFileRoute("/api/pages/$pageId")({
  server: {
    handlers: {
      // TODO: Connect to Supabase and fetch data from there
      GET: async ({ params }) => {
        const { pageId } = params;

        const page = pagesMock.find((currentPage) => currentPage.id === pageId);

        if (!page) {
          return Response.json({ message: "Page not found" }, { status: 404 });
        }

        return Response.json(page);
      },
    },
  },
});
