"use client";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";

import { ComicCard } from "~/components/comic-card";
import { comicsMock } from "~/mocks/comics";

const HomePage = () => {
  const router = useRouter();

  const handleReadButtonClick = (id: string) => {
    router.push(`/comic?id=${id}`);
  };

  return (
    <Grid container direction="column" alignItems="center">
      <Typography variant="h1">Hyse Comics</Typography>
      <ComicCard
        id={comicsMock[0].id}
        title={comicsMock[0].title}
        description={comicsMock[0].description}
        image={{
          src: comicsMock[0].imageUrl,
          altText: comicsMock[0].imageAltText,
        }}
        onReadButtonClick={handleReadButtonClick}
      />
    </Grid>
  );
};

export default HomePage;
