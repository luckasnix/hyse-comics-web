import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { fallbackLanguage } from "#/constants/users";

import enUS from "./locales/en-US.json";
import ptBR from "./locales/pt-BR.json";

i18n.use(initReactI18next).init({
  resources: {
    "en-US": { translation: enUS },
    "pt-BR": { translation: ptBR },
  },
  lng: fallbackLanguage,
  fallbackLng: fallbackLanguage,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
