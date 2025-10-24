import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";

import { ComicShelf } from "~/components/comic-shelf";
import type { Comic } from "~/types/comics";

const containerStyle: SxProps<Theme> = {
  width: "100%",
};

export type ComicHighlightsSectionProps = Readonly<{
  comics: Array<Comic>;
}>;

// TODO: Create endpoint that generates lists of comics based on themes
export const ComicHighlightsSection = ({
  comics,
}: ComicHighlightsSectionProps) => (
  <Stack direction="column" spacing={2} sx={containerStyle}>
    <ComicShelf title="Trending now" comics={comics} />
    <ComicShelf title="Continue reading" comics={comics} />
  </Stack>
);
