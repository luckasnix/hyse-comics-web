import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import type { Comic } from "~/types/comics";

const containerStyle: SxProps<Theme> = {
  width: 420,
  padding: 3,
};

export type ComicReaderDrawerProps = Readonly<{
  comic: Comic;
  isOpen: boolean;
  onClose: () => void;
}>;

// TODO: Add navigation between comic chapters
export const ComicReaderDrawer = ({
  comic,
  isOpen,
  onClose,
}: ComicReaderDrawerProps) => (
  <Drawer open={isOpen} anchor="right" onClose={onClose}>
    <Box sx={containerStyle}>
      <Box>
        <Typography variant="h4" gutterBottom>
          {comic.title}
        </Typography>
        <Typography variant="body1">{comic.synopsis}</Typography>
      </Box>
    </Box>
  </Drawer>
);
