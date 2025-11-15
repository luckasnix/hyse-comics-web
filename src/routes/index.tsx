import Grid from "@mui/material/Grid";
import { createFileRoute } from "@tanstack/react-router";

import { ComicRecommendationsSection } from "~/sections/comic-recommendations-section";
import { FooterSection } from "~/sections/footer-section";
import { HeaderSection } from "~/sections/header-section";
import { getRecommendations } from "~/services/comics";

const HomeRoute = () => {
  const { recommendations } = Route.useLoaderData();

  return (
    <Grid container direction="column" alignItems="center">
      <HeaderSection />
      <ComicRecommendationsSection recommendations={recommendations} />
      <FooterSection />
    </Grid>
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
