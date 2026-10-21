import { createFileRoute } from "@tanstack/react-router";

import { advertisementsMock } from "#/mocks/advertisements.ts";

export const Route = createFileRoute("/api/advertisements/{-$advertisementId}")(
  {
    server: {
      handlers: {
        GET: async ({ params }) => {
          const { advertisementId } = params;

          if (advertisementId) {
            const advertisement = advertisementsMock.find(
              (currentAdvertisement) =>
                currentAdvertisement.id === advertisementId,
            );

            if (!advertisement) {
              return Response.json(
                { message: "Advertisement not found" },
                { status: 404 },
              );
            }

            return Response.json(advertisement);
          }

          return Response.json(advertisementsMock);
        },
      },
    },
  },
);
