"use client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";
import { useRouter } from "next/navigation";

import { ComicCard } from "~/components/comic-card";
import { comicsMock } from "~/mocks/comics";

const containerStyle: SxProps<Theme> = {
  width: "100%",
  paddingX: "40px",
};

export const ComicHighlightsSection = () => {
  const router = useRouter();

  const handleReadButtonClick = (id: string) => {
    router.push(`/comic?id=${id}`);
  };

  return (
    <Box component="section" sx={containerStyle}>
      <Typography variant="h3">Featured Comics</Typography>
      {comicsMock.map((comic) => (
        <ComicCard
          key={comic.id}
          id={comic.id}
          title={comic.title}
          description={comic.description}
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
