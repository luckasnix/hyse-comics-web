import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";

import { ComicShelf } from "~/components/comic-shelf";
import type { ComicRecommendation } from "~/types/comics";

const containerStyle: SxProps<Theme> = {
  width: "100%",
};

export type ComicRecommendationsSectionProps = Readonly<{
  comicRecommendations: Array<ComicRecommendation>;
}>;

export const ComicRecommendationsSection = ({
  comicRecommendations,
}: ComicRecommendationsSectionProps) => (
  <Stack direction="column" spacing={2} sx={containerStyle}>
    {comicRecommendations.map((comicRecommendation) => (
      <ComicShelf
        key={comicRecommendation.id}
        title={comicRecommendation.title}
        items={comicRecommendation.items}
      />
    ))}
  </Stack>
);
