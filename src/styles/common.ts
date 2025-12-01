import type { SxProps, Theme } from "@mui/material/styles";
import type { CSSProperties } from "react";

export const linkResetStyle: CSSProperties = {
  color: "inherit",
  textDecoration: "none",
};

export const getClampedTextStyle = (lineLimit: number): SxProps<Theme> => ({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: lineLimit,
  overflow: "hidden",
});
