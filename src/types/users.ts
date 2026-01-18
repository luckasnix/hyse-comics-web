export type SupportedLanguage = "en-US" | "pt-BR";

export type UserProfile = {
  id: string;
  username: string;
  displayName: string | null;
  avatarUrl: string | null;
  coverUrl: string | null;
  preferredLanguage: SupportedLanguage;
};

export type ReadingAxis = "horizontal" | "vertical";

export type UserPreferences = {
  readingAxis: ReadingAxis;
};

export type User = {
  profile: UserProfile;
  preferences: UserPreferences;
};
