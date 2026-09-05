import { supportedLanguages } from "#/constants/users.ts";
import type { SupportedLanguage } from "#/types/users.ts";

export const isSupportedLanguage = (
  language: string | undefined,
): language is SupportedLanguage =>
  supportedLanguages.some((supported) => supported === language);

export const normalizeDetectedLanguage = (language: string): string => {
  const baseLanguage = language.toLowerCase().split(/[-_]/)[0];

  if (baseLanguage === "en") return "en-US";
  if (baseLanguage === "pt") return "pt-BR";

  return language;
};
