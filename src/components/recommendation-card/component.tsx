import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import { useUi } from "#/contexts/ui/hook";
import { getClampedTextStyle } from "#/styles/common";
import { getBaseUrl } from "#/utils/navigation";

import type { RecommendationCardProps } from "./types";

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

export const RecommendationCard = ({
  chapterId,
  title,
  synopsis,
  imageUrl,
  onReadButtonClick,
}: RecommendationCardProps) => {
  const { showToast } = useUi();

  const baseUrl = getBaseUrl();

  const shareChapterLink = async () => {
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
        <Button size="small" color="secondary" onClick={shareChapterLink}>
          Share
        </Button>
        <Button
          variant="contained"
          size="small"
          color="secondary"
          onClick={readComic}
        >
          Read
        </Button>
      </CardActions>
    </Card>
  );
};
