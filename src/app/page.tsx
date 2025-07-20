import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { ComicHighlightsSection } from "~/sections/comic-highlights-section";

const HomePage = () => (
  <Grid container direction="column" alignItems="center">
    <Typography variant="h1">Hyse Comics</Typography>
    <ComicHighlightsSection />
  </Grid>
);

export default HomePage;
