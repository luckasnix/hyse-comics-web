import Grid from "@mui/material/Grid";

import { ComicHighlightsSection } from "~/sections/comic-highlights-section";
import { HeaderSection } from "~/sections/header-section";

const HomePage = () => (
  <Grid container direction="column" alignItems="center">
    <HeaderSection />
    <ComicHighlightsSection />
  </Grid>
);

export default HomePage;
