import { createFileRoute } from "@tanstack/react-router";

import { PageLayout } from "#/layouts/page-layout.tsx";
import { AdvertisementsSection } from "#/sections/advertisements-section.tsx";
import { RecommendationsSection } from "#/sections/recommendations-section.tsx";
import { getAdvertisements } from "#/services/advertisements.ts";
import { getRecommendations } from "#/services/recommendations.ts";

const HomeRoute = () => {
  const { recommendations, advertisements } = Route.useLoaderData();

  return (
    <PageLayout>
      <RecommendationsSection recommendations={recommendations} />
      <AdvertisementsSection advertisements={advertisements} />
    </PageLayout>
  );
};

export const Route = createFileRoute("/{-$locale}/")({
  component: HomeRoute,
  loader: async () => {
    const [recommendations, advertisements] = await Promise.all([
      getRecommendations(),
      getAdvertisements().catch(() => []),
    ]);

    return {
      recommendations,
      advertisements,
    };
  },
});
