import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";

import { ComicShelf } from "~/components/comic-shelf";
import type { Recommendation } from "~/types/comics";

const containerStyle: SxProps<Theme> = {
  width: "100%",
};

export type ComicRecommendationsSectionProps = Readonly<{
  recommendations: Array<Recommendation>;
}>;

export const ComicRecommendationsSection = ({
  recommendations,
}: ComicRecommendationsSectionProps) => (
  <Stack direction="column" spacing={2} sx={containerStyle}>
    {recommendations.map((recommendation) => (
      <ComicShelf
        key={recommendation.id}
        title={recommendation.title}
        items={recommendation.items}
      />
    ))}
  </Stack>
);
