export type SupportedLanguage = "en-US" | "pt-BR";

export type UserRoles =
  | "comics:owner"
  | "comics:writer"
  | "comics:penciller"
  | "comics:inker"
  | "comics:colorist"
  | "comics:letterer"
  | "comics:cover-artist"
  | "comics:translator"
  | "comics:editor"
  | "comics:publisher";

export type UserProfile = {
  id: string;
  username: string;
  displayName: string | null;
  avatarUrl: string | null;
  coverUrl: string | null;
  preferredLanguage: SupportedLanguage;
  roles: UserRoles[];
};

export type ReadingAxis = "horizontal" | "vertical";

export type UserPreferences = {
  readingAxis: ReadingAxis;
};

export type User = {
  profile: UserProfile;
  preferences: UserPreferences;
};
