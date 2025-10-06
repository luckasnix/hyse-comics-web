import Grid from "@mui/material/Grid";
import { createFileRoute } from "@tanstack/react-router";

import { ComicHighlightsSection } from "~/sections/comic-highlights-section";
import { HeaderSection } from "~/sections/header-section";

const HomeRoute = () => (
  <Grid container direction="column" alignItems="center">
    <HeaderSection />
    <ComicHighlightsSection />
  </Grid>
);

export const Route = createFileRoute("/")({
  component: HomeRoute,
});
