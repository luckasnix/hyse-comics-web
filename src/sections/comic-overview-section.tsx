import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import type { CSSProperties } from "react";

import { imageDimensions } from "#/constants/common.ts";
import type { Comic } from "#/types/comics.ts";

const containerStyle: SxProps<Theme> = {
  marginBottom: 5,
};

const imageStyle: CSSProperties = {
  width: "100%",
  maxWidth: imageDimensions.cover.width,
  height: imageDimensions.cover.height,
  borderRadius: "4px",
  objectFit: "cover",
};

const synopsisStyle: SxProps<Theme> = {
  color: "text.secondary",
};

const genreStyle: SxProps<Theme> = {
  userSelect: "none",
};

export type ComicOverviewSectionProps = Readonly<{
  comic: Comic;
}>;

export const ComicOverviewSection = ({ comic }: ComicOverviewSectionProps) => (
  <Stack component="section" spacing={2} sx={containerStyle}>
    <img src={comic.coverUrl} alt={`${comic.title} cover`} style={imageStyle} />
    <Typography variant="h1">{comic.title}</Typography>
    <Typography variant="body1" sx={synopsisStyle}>
      {comic.synopsis}
    </Typography>
    <Stack direction="row" spacing={1}>
      {comic.genres.map((genre) => (
        <Chip key={genre} color="primary" label={genre} sx={genreStyle} />
      ))}
    </Stack>
  </Stack>
);
