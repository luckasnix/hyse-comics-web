import { createFileRoute } from "@tanstack/react-router";

import { PageLayout } from "~/layouts/page-layout";
import { RecommendationsSection } from "~/sections/recommendations-section";
import { getRecommendations } from "~/services/comics";

const HomeRoute = () => {
  const { recommendations } = Route.useLoaderData();

  return (
    <PageLayout>
      <RecommendationsSection recommendations={recommendations} />
    </PageLayout>
  );
};

export const Route = createFileRoute("/")({
  component: HomeRoute,
  loader: async () => {
    const recommendations = await getRecommendations();

    return {
      recommendations,
    };
  },
});
