import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import type { CSSProperties } from "react";

const containerStyle: SxProps<Theme> = {
  marginBottom: 5,
};

const coverStyle: CSSProperties = {
  width: "100%",
  maxWidth: "852px",
  height: "365px",
  borderRadius: "4px",
  objectFit: "cover",
};

const profileRowStyle: SxProps<Theme> = {
  marginTop: -4,
  paddingLeft: 2,
  alignItems: "end",
};

const avatarStyle: CSSProperties = {
  width: "96px",
  height: "96px",
  borderRadius: "16px",
  borderWidth: "4px",
  borderStyle: "solid",
  borderColor: "#ffffff",
};

const profileTextStyle: SxProps<Theme> = {
  paddingBottom: 1,
};

const displayNameStyle: SxProps<Theme> = {
  fontWeight: "bold",
};

const usernameStyle: SxProps<Theme> = {
  color: "text.secondary",
};

export type UserOverviewSectionProps = Readonly<{
  username: string;
  displayName: string | null;
  avatarUrl: string | null;
  coverUrl: string | null;
}>;

export const UserOverviewSection = ({
  username,
  displayName,
  avatarUrl,
  coverUrl,
}: UserOverviewSectionProps) => (
  <Stack component="section" sx={containerStyle}>
    <img
      src={coverUrl ?? "/fallbacks/cover.webp"}
      alt={`${displayName ?? username} cover`}
      style={coverStyle}
    />
    <Stack direction="row" spacing={1} sx={profileRowStyle}>
      <img
        src={avatarUrl ?? "/fallbacks/avatar.webp"}
        alt={`${displayName ?? username} avatar`}
        style={avatarStyle}
      />
      <Stack sx={profileTextStyle}>
        <Typography variant="h5" sx={displayNameStyle}>
          {displayName ?? username}
        </Typography>
        <Typography variant="body2" sx={usernameStyle}>
          @{username}
        </Typography>
      </Stack>
    </Stack>
  </Stack>
);
