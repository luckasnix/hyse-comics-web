import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useNavigate } from "@tanstack/react-router";

import { ComicCard } from "~/components/comic-card";
import { comicsMock } from "~/mocks/comics";

const containerStyle: SxProps<Theme> = {
  width: "100%",
  padding: "20px 40px",
};

export const ComicHighlightsSection = () => {
  const navigate = useNavigate();

  const handleReadButtonClick = (id: string) => {
    navigate({ to: "/comics/$comicId", params: { comicId: id } });
  };

  return (
    <Box component="section" sx={containerStyle}>
      <Typography variant="h4" gutterBottom>
        Featured Comics
      </Typography>
      {comicsMock.map((comic) => (
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
  );
};
