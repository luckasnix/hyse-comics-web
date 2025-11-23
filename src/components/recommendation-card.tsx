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
import { getClampedTextStyle } from "~/styles/common";
import type { ComicGenre } from "~/types/comics";

const containerStyle: SxProps<Theme> = {
  minWidth: 320,
  width: 320,
  height: 480,
};

const imageStyle: SxProps<Theme> = {
  width: 320,
  height: 240,
};

const titleStyle: SxProps<Theme> = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  userSelect: "none",
};

const synopsisStyle: SxProps<Theme> = {
  color: "text.secondary",
  userSelect: "none",
  ...getClampedTextStyle(4),
};

const genreStyle: SxProps<Theme> = {
  userSelect: "none",
};

export type RecommendationCardProps = Readonly<{
  chapterId: string;
  genres: Array<ComicGenre>;
  title: string;
  synopsis: string;
  imageUrl: string;
  onReadButtonClick: (chapterId: string) => void;
}>;

export const RecommendationCard = ({
  chapterId,
  genres,
  title,
  synopsis,
  imageUrl,
  onReadButtonClick,
}: RecommendationCardProps) => {
  const { showToast } = useUi();

  const shareChapterLink = async () => {
    const baseUrl =
      import.meta.env.MODE === "development"
        ? "http://localhost:3000"
        : "https://comics.hyse.app";
    try {
      await navigator.clipboard.writeText(`${baseUrl}/chapters/${chapterId}`);
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
    onReadButtonClick(chapterId);
  };

  return (
    <Card sx={containerStyle}>
      <CardMedia
        sx={imageStyle}
        image={imageUrl}
        title={`${title} thumbnail`}
      />
      <CardContent>
        <Typography variant="h5" gutterBottom sx={titleStyle}>
          {title}
        </Typography>
        <Typography variant="body2" gutterBottom sx={synopsisStyle}>
          {synopsis}
        </Typography>
        <Stack direction="row" spacing={1}>
          {genres.map((genre) => (
            <Chip
              key={genre}
              size="small"
              color="primary"
              label={genre}
              sx={genreStyle}
            />
          ))}
        </Stack>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={shareChapterLink}>
          Share
        </Button>
        <Button size="small" onClick={readComic}>
          Read
        </Button>
      </CardActions>
    </Card>
  );
};
