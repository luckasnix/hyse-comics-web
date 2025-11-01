import CloseIcon from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import type { Comic, ComicChapter } from "~/types/comics";

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

const avatarStyle: SxProps<Theme> = {
  backgroundColor: "primary.main",
};

const chapterTextStyle: SxProps<Theme> = {
  maxWidth: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export type ComicReaderDrawerProps = Readonly<{
  comic: Comic;
  comicChapters: Array<ComicChapter>;
  isOpen: boolean;
  onClose: () => void;
}>;

export const ComicReaderDrawer = ({
  comic,
  comicChapters,
  isOpen,
  onClose,
}: ComicReaderDrawerProps) => (
  <Drawer open={isOpen} anchor="right" onClose={onClose}>
    <Stack spacing={1} sx={containerStyle}>
      <Box sx={headerActionsStyle}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={overviewStyle}>
        <Typography variant="h4" gutterBottom>
          {comic.title}
        </Typography>
        <Typography variant="body1">{comic.synopsis}</Typography>
      </Box>
      <List>
        {comicChapters.map((comicChapter, index) => {
          const comicChapterNumber = index + 1;

          return (
            <ListItemButton
              key={comicChapter.id}
              selected={false} // TODO: Select the current chapter
              onClick={() => {}} // TODO: Navigate between chapters with clicks
            >
              <ListItemAvatar>
                <Avatar variant="rounded" sx={avatarStyle}>
                  {comicChapterNumber}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`Chapter ${comicChapterNumber}`}
                secondary={comicChapter.title}
                slotProps={{
                  primary: {
                    sx: chapterTextStyle,
                  },
                  secondary: {
                    sx: chapterTextStyle,
                  },
                }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Stack>
  </Drawer>
);
