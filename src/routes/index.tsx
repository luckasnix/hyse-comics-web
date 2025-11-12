import Grid from "@mui/material/Grid";
import { createFileRoute } from "@tanstack/react-router";

import { ComicRecommendationsSection } from "~/sections/comic-recommendations-section";
import { FooterSection } from "~/sections/footer-section";
import { HeaderSection } from "~/sections/header-section";
import { getRecommendations } from "~/services/comics";

const HomeRoute = () => {
  // TODO: Show an error component if there was one in the loader data
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
    // TODO: Handle errors that may occur in the request
    const recommendations = await getRecommendations();

    return {
      recommendations,
    };
  },
});
