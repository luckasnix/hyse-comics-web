import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import type { SxProps, Theme } from "@mui/material/styles";
import { darken } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useNavigate, useParams } from "@tanstack/react-router";
import useEmblaCarousel from "embla-carousel-react";
import { Activity } from "react";
import { useTranslation } from "react-i18next";

import { RecommendationCard } from "#/components/recommendation-card";
import { useCarouselNavigation } from "#/hooks/use-carousel-navigation";
import type { ChapterWithComic } from "#/types/comics";

export type RecommendationShelfProps = Readonly<{
  title: string;
  chapters: Array<ChapterWithComic>;
}>;

const containerStyle: SxProps<Theme> = {
  width: "100%",
  paddingY: 3,
  paddingX: 5,
};

const carouselStyle: SxProps<Theme> = {
  position: "relative",
  display: "flex",
  alignItems: "center",
};

const viewportStyle: SxProps<Theme> = {
  paddingY: 2,
  overflow: "hidden",
};

const slideContainerStyle: SxProps<Theme> = {
  display: "flex",
  flexDirection: "row",
  gap: 2,
};

const navigationButtonStyle: SxProps<Theme> = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 1,
  backgroundColor: "background.paper",
  boxShadow: 2,
  "&:hover": {
    backgroundColor: (theme) => darken(theme.palette.background.paper, 0.05),
  },
};

const prevButtonStyle: SxProps<Theme> = {
  ...navigationButtonStyle,
  left: -24,
};

const nextButtonStyle: SxProps<Theme> = {
  ...navigationButtonStyle,
  right: -24,
};

export const RecommendationShelf = ({
  title,
  chapters,
}: RecommendationShelfProps) => {
  const { t } = useTranslation();

  const { locale } = useParams({ strict: false });

  const navigate = useNavigate();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: "auto",
  });

  const { canNavigatePrev, canNavigateNext, navigatePrev, navigateNext } =
    useCarouselNavigation(emblaApi);

  const handleReadButtonClick = (chapterId: string) => {
    navigate({
      to: "/{-$locale}/chapters/$chapterId",
      params: { locale, chapterId: chapterId },
    });
  };

  return (
    <Box sx={containerStyle}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Box sx={carouselStyle}>
        <Activity mode={canNavigatePrev ? "visible" : "hidden"}>
          <IconButton
            aria-label={t("recommendations.previousAriaLabel")}
            color="secondary"
            sx={prevButtonStyle}
            disabled={!canNavigatePrev}
            onClick={navigatePrev}
          >
            <IconChevronLeft />
          </IconButton>
        </Activity>
        <Box ref={emblaRef} sx={viewportStyle}>
          <Box sx={slideContainerStyle}>
            {chapters.map(({ comic, ...chapter }) => (
              <RecommendationCard
                key={chapter.id}
                chapterId={chapter.id}
                title={comic.title}
                synopsis={comic.synopsis}
                imageUrl={comic.thumbnailUrl}
                onReadButtonClick={handleReadButtonClick}
              />
            ))}
          </Box>
        </Box>
        <Activity mode={canNavigateNext ? "visible" : "hidden"}>
          <IconButton
            aria-label={t("recommendations.nextAriaLabel")}
            color="secondary"
            sx={nextButtonStyle}
            disabled={!canNavigateNext}
            onClick={navigateNext}
          >
            <IconChevronRight />
          </IconButton>
        </Activity>
      </Box>
    </Box>
  );
};
