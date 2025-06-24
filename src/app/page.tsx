"use client";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";

import { ComicCard, type ComicCardProps } from "~/components/comic-card";
import thumbnail from "~/storage/metaverse-cavalry-thumbnail.webp";

const metaverseCavalryComic: Omit<ComicCardProps, "onReadButtonClick"> = {
  id: "1",
  title: "Metaverse Cavalry",
  description:
    "In a vast medieval world set within the Metaverse, a young warrior is summoned to face a looming threat that corrupts the very fabric of this digital reality: a powerful demon bent on destruction.",
  image: {
    src: thumbnail.src,
    altText: "Metaverse Cavalry thumbnail",
  },
};

const Home = () => {
  const router = useRouter();

  const handleReadButtonClick = (id: string) => {
    router.push(`/comic?id=${id}`);
  };

  return (
    <Grid container direction="column" alignItems="center">
      <Typography variant="h1">Hyse Comics</Typography>
      <ComicCard
        {...metaverseCavalryComic}
        onReadButtonClick={handleReadButtonClick}
      />
    </Grid>
  );
};

export default Home;
