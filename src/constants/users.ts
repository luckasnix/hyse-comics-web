import type { AxisOptionType } from "#/types/comics";
import type { ReadingAxis, SupportedLanguage, UserRoles } from "#/types/users";

export const fallbackLanguage = "en-US" satisfies SupportedLanguage;

export const fallbackReadingAxis = "vertical" satisfies ReadingAxis;

export const carouselAxisFrom: Record<ReadingAxis, AxisOptionType> = {
  horizontal: "x",
  vertical: "y",
};

export const roleLabelsFrom: Record<UserRoles, string> = {
  "comics:owner": "roles.owner",
  "comics:writer": "roles.writer",
  "comics:penciller": "roles.penciller",
  "comics:inker": "roles.inker",
  "comics:colorist": "roles.colorist",
  "comics:letterer": "roles.letterer",
  "comics:cover-artist": "roles.coverArtist",
  "comics:translator": "roles.translator",
  "comics:editor": "roles.editor",
  "comics:publisher": "roles.publisher",
};
