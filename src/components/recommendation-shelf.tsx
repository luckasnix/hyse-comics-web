import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useNavigate } from "@tanstack/react-router";
import useEmblaCarousel from "embla-carousel-react";
import { Activity } from "react";

import { RecommendationCard } from "~/components/recommendation-card";
import { useCarouselNavigation } from "~/hooks/use-carousel-navigation";
import type { ChapterWithComic } from "~/types/comics";

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
  backgroundColor: "background.paper",
  boxShadow: 2,
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 1,
  "&:hover": {
    backgroundColor: "background.paper",
    boxShadow: 4,
  },
  "&:disabled": {
    backgroundColor: "background.paper",
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

export type RecommendationShelfProps = Readonly<{
  title: string;
  chapters: Array<ChapterWithComic>;
}>;

export const RecommendationShelf = ({
  title,
  chapters,
}: RecommendationShelfProps) => {
  const navigate = useNavigate();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: "auto",
  });

  const { canNavigatePrev, canNavigateNext, navigatePrev, navigateNext } =
    useCarouselNavigation(emblaApi);

  const handleReadButtonClick = (chapterId: string) => {
    navigate({
      to: "/chapters/$chapterId",
      params: { chapterId: chapterId },
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
            sx={prevButtonStyle}
            disabled={!canNavigatePrev}
            onClick={navigatePrev}
          >
            <ChevronLeftIcon />
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
            sx={nextButtonStyle}
            disabled={!canNavigateNext}
            onClick={navigateNext}
          >
            <ChevronRightIcon />
          </IconButton>
        </Activity>
      </Box>
    </Box>
  );
};
