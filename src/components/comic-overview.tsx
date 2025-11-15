import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import type { CSSProperties } from "react";

import type { Comic } from "~/types/comics";

const containerStyle: SxProps<Theme> = {
  marginBottom: 5,
};

const imageStyle: CSSProperties = {
  width: "auto",
  maxWidth: "852px",
  height: "365px",
  borderRadius: "4px",
  objectFit: "cover",
};

export type ComicOverviewProps = Readonly<{
  comic: Comic;
}>;

export const ComicOverview = ({ comic }: ComicOverviewProps) => (
  <Stack spacing={2} sx={containerStyle}>
    <img src={comic.coverUrl} alt={`${comic.title} cover`} style={imageStyle} />
    <Typography variant="h1">{comic.title}</Typography>
    <Typography variant="body1" color="text.secondary">
      {comic.synopsis}
    </Typography>
  </Stack>
);
