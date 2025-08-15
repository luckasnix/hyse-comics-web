import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { ComicGenre } from "~/types/comics";

export type ComicCardProps = Readonly<{
  id: string;
  genres: Array<ComicGenre>;
  title: string;
  summary: string;
  image: {
    src: string;
    altText: string;
  };
  onReadButtonClick: (id: string) => void;
}>;

export const ComicCard = ({
  id,
  genres,
  title,
  summary,
  image,
  onReadButtonClick,
}: ComicCardProps) => (
  <Card sx={{ width: 320 }}>
    <CardMedia
      sx={{ width: 320, height: 240 }}
      image={image.src}
      title={image.altText}
    />
    <CardContent>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" gutterBottom sx={{ color: "text.secondary" }}>
        {summary}
      </Typography>
      <Stack direction="row" spacing={1}>
        {genres.map((genre) => (
          <Chip key={genre} color="primary" label={genre} />
        ))}
      </Stack>
    </CardContent>
    <CardActions>
      <Button
        size="small"
        onClick={() => {
          onReadButtonClick(id);
        }}
      >
        Read
      </Button>
    </CardActions>
  </Card>
);
