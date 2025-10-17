import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";

import { ComicShelf } from "~/components/comic-shelf";
import { comicsMock } from "~/mocks/comics";

const containerStyle: SxProps<Theme> = {
  width: "100%",
  paddingY: 4,
};

export const ComicHighlightsSection = () => (
  <Stack direction="column" spacing={2} sx={containerStyle}>
    <ComicShelf title="Trending" comics={comicsMock} />
    <ComicShelf title="Keep reading" comics={comicsMock} />
  </Stack>
);
