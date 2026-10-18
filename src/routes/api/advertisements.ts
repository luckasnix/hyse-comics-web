import { createFileRoute } from "@tanstack/react-router";

import { advertisementsMock } from "#/mocks/advertisements.ts";

export const Route = createFileRoute("/api/advertisements")({
  server: {
    handlers: {
      GET: async () => Response.json(advertisementsMock),
    },
  },
});
