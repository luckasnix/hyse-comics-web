import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import type { SxProps, Theme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import {
  IconArrowsMaximize,
  IconArrowsMinimize,
  IconChevronLeft,
  IconChevronLeftPipe,
  IconChevronRight,
  IconChevronRightPipe,
  IconHomeFilled,
  IconLayoutSidebarLeftCollapseFilled,
} from "@tabler/icons-react";
import { useHotkey } from "@tanstack/react-hotkeys";
import { Link, useParams } from "@tanstack/react-router";
import type { EmblaCarouselType } from "embla-carousel";
import { useTranslation } from "react-i18next";

import {
  carouselDirectionFrom,
  comicReaderToolbarHeight,
} from "#/constants/comics";
import { useComic } from "#/contexts/comic";
import { useComicReaderToolbar } from "#/hooks/use-comic-reader-toolbar";

export type ComicReaderToolbarProps = Readonly<{
  carouselApi: EmblaCarouselType | undefined;
  isFullscreen: boolean;
  enterFullscreen: () => void;
  exitFullscreen: () => void;
  toggleFullscreen: () => void;
  openDrawer: () => void;
  toggleDrawer: () => void;
}>;

const containerStyle: SxProps<Theme> = {
  height: comicReaderToolbarHeight,
  paddingX: 3,
  backgroundColor: "primary.main",
  justifyContent: "center",
  alignItems: "center",
};

const innerContainerStyle: SxProps<Theme> = {
  maxWidth: 1200,
};

const gridStyle: SxProps<Theme> = {
  display: "flex",
  gap: "4px",
};

const gridStartStyle: SxProps<Theme> = {
  ...gridStyle,
  justifyContent: "start",
};

const gridCenterStyle: SxProps<Theme> = {
  ...gridStyle,
  justifyContent: "center",
};

const gridEndStyle: SxProps<Theme> = {
  ...gridStyle,
  justifyContent: "end",
};

const iconButtonStyle: SxProps<Theme> = {
  color: "primary.contrastText",
  borderRadius: 1,
};

const pageCounterStyle: SxProps<Theme> = {
  display: "inline-flex",
  backgroundColor: "primary.dark",
  paddingX: 2,
  paddingY: 1,
  borderRadius: 1,
};

const pageCounterTextStyle: SxProps<Theme> = {
  color: "primary.contrastText",
};

// TODO: Adapt reading to the comic's "orientation" settings
// TODO: Add thumbnail navigation
// TODO: Add touch navigation
// TODO: Add zoom to images
export const ComicReaderToolbar = ({
  carouselApi,
  isFullscreen,
  enterFullscreen,
  exitFullscreen,
  toggleFullscreen,
  openDrawer,
  toggleDrawer,
}: ComicReaderToolbarProps) => {
  const { t } = useTranslation();

  const { locale } = useParams({ strict: false });

  const { comic } = useComic();

  const { buttons, currentSlideNumber, slidesLength } = useComicReaderToolbar(
    carouselApi,
    carouselDirectionFrom[comic.direction],
  );

  useHotkey("Shift+ArrowLeft", buttons.farLeft.onClick);

  useHotkey("ArrowLeft", buttons.left.onClick);

  useHotkey("ArrowRight", buttons.right.onClick);

  useHotkey("Shift+ArrowRight", buttons.farRight.onClick);

  useHotkey("F", toggleFullscreen);

  useHotkey("M", toggleDrawer, { enabled: !isFullscreen });

  return (
    <Grid container sx={containerStyle}>
      <Grid container size="grow" sx={innerContainerStyle}>
        <Grid size={2} sx={gridStartStyle}>
          <Tooltip title={t("reader.home")}>
            <Link to="/{-$locale}" params={{ locale }}>
              <IconButton aria-label={t("reader.home")} sx={iconButtonStyle}>
                <IconHomeFilled />
              </IconButton>
            </Link>
          </Tooltip>
        </Grid>
        <Grid size="grow" sx={gridCenterStyle}>
          <Tooltip title={buttons.farLeft.label}>
            <Box component="span">
              <IconButton
                aria-label={buttons.farLeft.label}
                sx={iconButtonStyle}
                disabled={buttons.farLeft.disabled}
                onClick={buttons.farLeft.onClick}
              >
                <IconChevronLeftPipe />
              </IconButton>
            </Box>
          </Tooltip>
          <Tooltip title={buttons.left.label}>
            <Box component="span">
              <IconButton
                aria-label={buttons.left.label}
                sx={iconButtonStyle}
                disabled={buttons.left.disabled}
                onClick={buttons.left.onClick}
              >
                <IconChevronLeft />
              </IconButton>
            </Box>
          </Tooltip>
          <Box component="span" sx={pageCounterStyle}>
            <Typography variant="body1" sx={pageCounterTextStyle}>
              {currentSlideNumber ?? "?"} / {slidesLength ?? "?"}
            </Typography>
          </Box>
          <Tooltip title={buttons.right.label}>
            <Box component="span">
              <IconButton
                aria-label={buttons.right.label}
                sx={iconButtonStyle}
                disabled={buttons.right.disabled}
                onClick={buttons.right.onClick}
              >
                <IconChevronRight />
              </IconButton>
            </Box>
          </Tooltip>
          <Tooltip title={buttons.farRight.label}>
            <Box component="span">
              <IconButton
                aria-label={buttons.farRight.label}
                sx={iconButtonStyle}
                disabled={buttons.farRight.disabled}
                onClick={buttons.farRight.onClick}
              >
                <IconChevronRightPipe />
              </IconButton>
            </Box>
          </Tooltip>
        </Grid>
        <Grid size={2} sx={gridEndStyle}>
          {isFullscreen ? (
            <Tooltip title={t("reader.exitFullscreen")}>
              <Box component="span">
                <IconButton
                  aria-label={t("reader.exitFullscreen")}
                  sx={iconButtonStyle}
                  onClick={exitFullscreen}
                >
                  <IconArrowsMinimize />
                </IconButton>
              </Box>
            </Tooltip>
          ) : (
            <Tooltip title={t("reader.enterFullscreen")}>
              <Box component="span">
                <IconButton
                  aria-label={t("reader.enterFullscreen")}
                  sx={iconButtonStyle}
                  onClick={enterFullscreen}
                >
                  <IconArrowsMaximize />
                </IconButton>
              </Box>
            </Tooltip>
          )}
          <Tooltip title={t("reader.more")}>
            <Box component="span">
              <IconButton
                aria-label={t("reader.more")}
                sx={iconButtonStyle}
                disabled={isFullscreen}
                onClick={openDrawer}
              >
                <IconLayoutSidebarLeftCollapseFilled />
              </IconButton>
            </Box>
          </Tooltip>
        </Grid>
      </Grid>
    </Grid>
  );
};
