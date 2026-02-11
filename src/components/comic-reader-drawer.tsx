import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { IconX } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";

import { useComic } from "#/contexts/comic-context";
import { getChapterCredits } from "#/services/comics";
import { getClampedTextStyle, linkResetStyle } from "#/styles/common";

import { ChapterList } from "./chapter-list";
import { CreditList } from "./credit-list";
import { TabGroup } from "./tab-group";

const containerStyle: SxProps<Theme> = {
  width: 420,
  paddingTop: 1,
};

const headerActionsStyle: SxProps<Theme> = {
  paddingX: 3,
  display: "flex",
  justifyContent: "end",
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
  const { comic, chapters, currentChapterId } = useComic();

  const navigate = useNavigate();

  const { data: chapterCredits = [] } = useQuery({
    queryKey: ["chapter-credits", currentChapterId],
    queryFn: () => getChapterCredits(currentChapterId ?? ""),
    enabled: !!currentChapterId,
  });

  const navigateToChapter = (chapterId: string) => {
    navigate({
      to: "/chapters/$chapterId",
      params: { chapterId: chapterId },
    });
  };

  const navigateToUser = (userId: string) => {
    navigate({
      to: "/users/$userId",
      params: { userId: userId },
    });
  };

  return (
    <Drawer open={isOpen} anchor="right" onClose={onClose}>
      <Stack spacing={1} sx={containerStyle}>
        <Box sx={headerActionsStyle}>
          <IconButton onClick={onClose}>
            <IconX />
          </IconButton>
        </Box>
        <Link
          to="/comics/$comicId"
          params={{ comicId: comic.id }}
          style={linkResetStyle}
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
        <TabGroup initialValue={0}>
          <TabGroup.List
            items={[
              { value: 0, label: "Chapters" },
              { value: 1, label: "Créditos" },
            ]}
          />
          <TabGroup.Panel value={0}>
            <ChapterList
              chapters={chapters}
              selectedChapterId={currentChapterId}
              onChapterClick={navigateToChapter}
            />
          </TabGroup.Panel>
          <TabGroup.Panel value={1}>
            <CreditList
              credits={chapterCredits}
              onCreditClick={navigateToUser}
            />
          </TabGroup.Panel>
        </TabGroup>
      </Stack>
    </Drawer>
  );
};
