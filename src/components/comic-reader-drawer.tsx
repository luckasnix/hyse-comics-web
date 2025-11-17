import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "@tanstack/react-router";
import type { CSSProperties } from "react";

import { useComicContext } from "~/contexts/comic-context";
import { getClampedTextStyle } from "~/styles/common";

import { ComicChapterList } from "./comic-chapter-list";

const containerStyle: SxProps<Theme> = {
  width: 420,
  paddingTop: 1,
};

const headerActionsStyle: SxProps<Theme> = {
  paddingX: 3,
  display: "flex",
  justifyContent: "end",
};

const comicLinkStyle: CSSProperties = {
  color: "inherit",
  textDecoration: "none",
};

const overviewStyle: SxProps<Theme> = {
  paddingX: 3,
};

const synopsisStyle: SxProps<Theme> = {
  color: "text.secondary",
  ...getClampedTextStyle(4),
};

export type ComicReaderDrawerProps = Readonly<{
  isOpen: boolean;
  onClose: () => void;
}>;

export const ComicReaderDrawer = ({
  isOpen,
  onClose,
}: ComicReaderDrawerProps) => {
  const { comic, chapters, currentChapterId } = useComicContext();

  const navigate = useNavigate();

  const navigateToChapter = (chapterId: string) => {
    navigate({
      to: "/chapters/$chapterId",
      params: { chapterId: chapterId },
    });
  };

  return (
    <Drawer open={isOpen} anchor="right" onClose={onClose}>
      <Stack spacing={1} sx={containerStyle}>
        <Box sx={headerActionsStyle}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Link
          to="/comics/$comicId"
          params={{ comicId: comic.id }}
          style={comicLinkStyle}
        >
          <Box sx={overviewStyle}>
            <Typography variant="h4" gutterBottom sx={getClampedTextStyle(2)}>
              {comic.title}
            </Typography>
            <Typography variant="body1" sx={synopsisStyle}>
              {comic.synopsis}
            </Typography>
          </Box>
        </Link>
        <ComicChapterList
          chapters={chapters}
          selectedChapterId={currentChapterId}
          onChapterClick={navigateToChapter}
        />
      </Stack>
    </Drawer>
  );
};
