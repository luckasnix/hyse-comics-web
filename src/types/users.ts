export type SupportedLanguage = "en-US" | "pt-BR";

export type UserProfile = {
  language: SupportedLanguage;
};

export type ReadingAxis = "horizontal" | "vertical";

export type UserPreferences = {
  readingAxis: ReadingAxis;
};

export type User = {
  profile: UserProfile;
  preferences: UserPreferences;
};
