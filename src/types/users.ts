export type SupportedLanguage = "en-US" | "pt-BR";

export type UserReadingAxis = "horizontal" | "vertical";

export type UserReading = {
  axis: UserReadingAxis;
};

export type User = {
  preferredLanguage: SupportedLanguage;
  reading: UserReading;
};
