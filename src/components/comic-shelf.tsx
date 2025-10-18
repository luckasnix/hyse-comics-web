import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useNavigate } from "@tanstack/react-router";
import useEmblaCarousel from "embla-carousel-react";

import { ComicCard } from "~/components/comic-card";
import { useCarouselNavigation } from "~/hooks/use-carousel-navigation";
import type { Comic } from "~/types/comics";

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

export type ComicShelfProps = Readonly<{
  title: string;
  comics: Comic[];
}>;

export const ComicShelf = ({ title, comics }: ComicShelfProps) => {
  const navigate = useNavigate();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: 3,
  });

  const { canNavigatePrev, canNavigateNext, navigatePrev, navigateNext } =
    useCarouselNavigation(emblaApi);

  const handleReadButtonClick = (id: string) => {
    navigate({ to: "/comics/$comicId", params: { comicId: id } });
  };

  return (
    <Box sx={containerStyle}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Box sx={carouselStyle}>
        <IconButton
          sx={prevButtonStyle}
          disabled={!canNavigatePrev}
          onClick={navigatePrev}
        >
          <ChevronLeftIcon />
        </IconButton>
        <Box ref={emblaRef} sx={viewportStyle}>
          <Box sx={slideContainerStyle}>
            {comics.map((comic) => (
              <ComicCard
                key={comic.id}
                id={comic.id}
                genres={comic.genres}
                title={comic.title}
                summary={comic.summary}
                image={{
                  src: comic.imageUrl,
                  altText: comic.imageAltText,
                }}
                onReadButtonClick={handleReadButtonClick}
              />
            ))}
          </Box>
        </Box>
        <IconButton
          sx={nextButtonStyle}
          disabled={!canNavigateNext}
          onClick={navigateNext}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
