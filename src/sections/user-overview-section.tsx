import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import {
  IconBrandInstagram,
  IconBrandThreads,
  IconBrandX,
} from "@tabler/icons-react";
import type { CSSProperties } from "react";

import type { UserSocialLinks } from "#/types/users";

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

const socialLinksStyle: SxProps<Theme> = {
  marginTop: 1,
  paddingLeft: 2,
};

const socialLinkButtonStyle: SxProps<Theme> = {
  color: "text.secondary",
  borderRadius: 1,
};

export type UserOverviewSectionProps = Readonly<{
  username: string;
  displayName: string | null;
  avatarUrl: string | null;
  coverUrl: string | null;
  socialLinks: UserSocialLinks;
}>;

export const UserOverviewSection = ({
  username,
  displayName,
  avatarUrl,
  coverUrl,
  socialLinks,
}: UserOverviewSectionProps) => {
  const profileName = displayName ?? username;

  const hasSocialLinks = Boolean(
    socialLinks.x || socialLinks.instagram || socialLinks.threads,
  );

  return (
    <Stack component="section" sx={containerStyle}>
      <img
        src={coverUrl ?? "/fallbacks/cover.webp"}
        alt={`${profileName} cover`}
        style={coverStyle}
      />
      <Stack direction="row" spacing={1} sx={profileRowStyle}>
        <img
          src={avatarUrl ?? "/fallbacks/avatar.webp"}
          alt={`${profileName} avatar`}
          style={avatarStyle}
        />
        <Stack sx={profileTextStyle}>
          <Typography variant="h5" sx={displayNameStyle}>
            {profileName}
          </Typography>
          <Typography variant="body2" sx={usernameStyle}>
            @{username}
          </Typography>
        </Stack>
      </Stack>
      {hasSocialLinks && (
        <Stack direction="row" spacing={0.5} sx={socialLinksStyle}>
          {socialLinks.x && (
            <IconButton
              aria-label={`${profileName} on X`}
              component="a"
              href={socialLinks.x}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={socialLinkButtonStyle}
            >
              <IconBrandX />
            </IconButton>
          )}
          {socialLinks.instagram && (
            <IconButton
              aria-label={`${profileName} on Instagram`}
              component="a"
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={socialLinkButtonStyle}
            >
              <IconBrandInstagram />
            </IconButton>
          )}
          {socialLinks.threads && (
            <IconButton
              aria-label={`${profileName} on Threads`}
              component="a"
              href={socialLinks.threads}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={socialLinkButtonStyle}
            >
              <IconBrandThreads />
            </IconButton>
          )}
        </Stack>
      )}
    </Stack>
  );
};
