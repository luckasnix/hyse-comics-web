import { createFileRoute } from "@tanstack/react-router";

import { PageLayout } from "#/layouts/page-layout.tsx";
import { RecommendationsSection } from "#/sections/recommendations-section.tsx";
import { getRecommendations } from "#/services/comics.ts";

const HomeRoute = () => {
  const { recommendations } = Route.useLoaderData();

  return (
    <PageLayout>
      <RecommendationsSection recommendations={recommendations} />
    </PageLayout>
  );
};

export const Route = createFileRoute("/{-$locale}/")({
  component: HomeRoute,
  loader: async () => {
    const recommendations = await getRecommendations();

    return {
      recommendations,
    };
  },
});
