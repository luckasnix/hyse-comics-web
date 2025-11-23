import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";

import { RecommendationShelf } from "~/components/recommendation-shelf";
import type { Recommendation } from "~/types/comics";

const containerStyle: SxProps<Theme> = {
  width: "100%",
};

export type RecommendationsSectionProps = Readonly<{
  recommendations: Array<Recommendation>;
}>;

export const RecommendationsSection = ({
  recommendations,
}: RecommendationsSectionProps) => (
  <Stack direction="column" spacing={2} sx={containerStyle}>
    {recommendations.map((recommendation) => (
      <RecommendationShelf
        key={recommendation.id}
        title={recommendation.title}
        chapters={recommendation.chapters}
      />
    ))}
  </Stack>
);
