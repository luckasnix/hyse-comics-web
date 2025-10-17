import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useNavigate } from "@tanstack/react-router";

import { ComicCard } from "~/components/comic-card";
import type { Comic } from "~/types/comics";

const containerStyle: SxProps<Theme> = {
  width: "100%",
  paddingY: 3,
  paddingX: 5,
  overflowX: "scroll",
};

export type ComicShelfProps = Readonly<{
  title: string;
  comics: Comic[];
}>;

export const ComicShelf = ({ title, comics }: ComicShelfProps) => {
  const navigate = useNavigate();

  const handleReadButtonClick = (id: string) => {
    navigate({ to: "/comics/$comicId", params: { comicId: id } });
  };

  return (
    <Box sx={containerStyle}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Stack direction="row" spacing={2}>
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
      </Stack>
    </Box>
  );
};
