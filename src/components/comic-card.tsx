import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import { useUi } from "~/contexts/ui-context";
import type { ComicGenre } from "~/types/comics";

const containerStyle: SxProps<Theme> = {
  minWidth: 320,
  width: 320,
  height: 504,
};

const imageStyle: SxProps<Theme> = {
  width: 320,
  height: 240,
};

const titleStyle: SxProps<Theme> = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const summaryStyle: SxProps<Theme> = {
  color: "text.secondary",
};

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
}: ComicCardProps) => {
  const { showToast } = useUi();

  const shareComicLink = async () => {
    const baseUrl =
      import.meta.env.MODE === "development"
        ? "http://localhost:3000"
        : "https://comics.hyse.app";

    try {
      await navigator.clipboard.writeText(`${baseUrl}/comics/${id}`);
      showToast({
        severity: "success",
        message: "Link copied to clipboard.",
      });
    } catch {
      showToast({
        severity: "error",
        message: "Failed to copy link to clipboard. Please try again.",
      });
    }
  };

  const readComic = () => {
    onReadButtonClick(id);
  };

  return (
    <Card sx={containerStyle}>
      <CardMedia sx={imageStyle} image={image.src} title={image.altText} />
      <CardContent>
        <Typography variant="h5" gutterBottom sx={titleStyle}>
          {title}
        </Typography>
        <Typography variant="body2" gutterBottom sx={summaryStyle}>
          {summary}
        </Typography>
        <Stack direction="row" spacing={1}>
          {genres.map((genre) => (
            <Chip key={genre} color="primary" label={genre} />
          ))}
        </Stack>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={shareComicLink}>
          Share
        </Button>
        <Button size="small" onClick={readComic}>
          Read
        </Button>
      </CardActions>
    </Card>
  );
};
