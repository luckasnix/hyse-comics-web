import type { AxisOptionType } from "#/types/comics";
import type { ReadingAxis, UserRoles } from "#/types/users";

export const carouselAxisFrom: Record<ReadingAxis, AxisOptionType> = {
  horizontal: "x",
  vertical: "y",
};

export const roleLabelsFrom: Record<UserRoles, string> = {
  "comics:owner": "Owner",
  "comics:writer": "Writer",
  "comics:penciller": "Penciller",
  "comics:inker": "Inker",
  "comics:colorist": "Colorist",
  "comics:letterer": "Letterer",
  "comics:cover-artist": "Cover Artist",
  "comics:translator": "Translator",
  "comics:editor": "Editor",
  "comics:publisher": "Publisher",
};
