import { createInstance } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { fallbackLanguage, supportedLanguages } from "#/constants/users.ts";
import type { SupportedLanguage } from "#/types/users.ts";
import { normalizeDetectedLanguage } from "#/utils/languages.ts";

import enUS from "./locales/en-US.json";
import ptBR from "./locales/pt-BR.json";

export const createI18n = (language: SupportedLanguage = fallbackLanguage) => {
  const instance = createInstance();

  instance.use(LanguageDetector).init({
    resources: {
      "en-US": { translation: enUS },
      "pt-BR": { translation: ptBR },
    },
    // Bundled resources allow synchronous initialization during SSR. Browser
    // detection is explicitly requested after hydration with changeLanguage().
    initAsync: false,
    lng: language,
    fallbackLng: fallbackLanguage,
    supportedLngs: supportedLanguages,
    detection: {
      order: ["navigator"],
      caches: [],
      convertDetectedLanguage: normalizeDetectedLanguage,
    },
    interpolation: {
      escapeValue: false,
    },
  });

  return instance;
};
