import { createFileRoute } from "@tanstack/react-router";

import { recommendationsMock } from "#/mocks/recommendations";

export const Route = createFileRoute(
  "/api/recommendations/{-$recommendationId}",
)({
  server: {
    handlers: {
      // TODO: Connect to Supabase and fetch data from there
      GET: async ({ params }) => {
        const { recommendationId } = params;

        if (recommendationId) {
          const recommendation = recommendationsMock.find(
            (currentRecommendation) =>
              currentRecommendation.id === recommendationId,
          );

          if (!recommendation) {
            return Response.json(
              { message: "Recommendation not found" },
              { status: 404 },
            );
          }

          return Response.json(recommendation);
        }

        return Response.json(recommendationsMock);
      },
    },
  },
});
