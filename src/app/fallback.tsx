import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import type { SxProps, Theme } from "@mui/material/styles";

export const containerStyle: SxProps<Theme> = {
  height: "100dvh",
  justifyContent: "center",
  alignItems: "center",
};

export const FallbackPage = () => (
  <Grid container sx={containerStyle}>
    <CircularProgress size={80} />
  </Grid>
);
