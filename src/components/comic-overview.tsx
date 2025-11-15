import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { CSSProperties } from "react";

import type { Comic } from "~/types/comics";

const imageStyle: CSSProperties = {
  width: "auto",
  maxWidth: "1200px",
  height: "514px",
  borderRadius: "4px",
  objectFit: "cover",
};

export type ComicOverviewProps = Readonly<{
  comic: Comic;
}>;

export const ComicOverview = ({ comic }: ComicOverviewProps) => (
  <Stack spacing={2}>
    <img src={comic.coverUrl} alt={`${comic.title} cover`} style={imageStyle} />
    <Typography variant="h1">{comic.title}</Typography>
    <Typography variant="body1" color="text.secondary">
      {comic.synopsis}
    </Typography>
  </Stack>
);
