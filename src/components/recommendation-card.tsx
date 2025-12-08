import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import { useUi } from "#/contexts/ui-context";
import { getClampedTextStyle } from "#/styles/common";

const containerStyle: SxProps<Theme> = {
  minWidth: 320,
  width: 320,
  height: 460,
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

export type RecommendationCardProps = Readonly<{
  chapterId: string;
  title: string;
  synopsis: string;
  imageUrl: string;
  onReadButtonClick: (chapterId: string) => void;
}>;

export const RecommendationCard = ({
  chapterId,
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
