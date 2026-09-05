import { describe, expect, it } from "vitest";

import { isSupportedLanguage, normalizeDetectedLanguage } from "./languages.ts";

describe("isSupportedLanguage()", () => {
  it.each(["en-US", "pt-BR"])("accepts the supported locale %s", (language) => {
    expect(isSupportedLanguage(language)).toBe(true);
  });

  it.each([undefined, "", "en", "pt", "en-GB", "pt-PT", "pt-br", "fr-FR"])(
    "rejects %s as an explicit application locale",
    (language) => {
      expect(isSupportedLanguage(language)).toBe(false);
    },
  );
});

describe("normalizeDetectedLanguage()", () => {
  it.each([
    ["en", "en-US"],
    ["en-US", "en-US"],
    ["en-GB", "en-US"],
    ["EN_us", "en-US"],
    ["pt", "pt-BR"],
    ["pt-BR", "pt-BR"],
    ["pt-PT", "pt-BR"],
    ["PT_br", "pt-BR"],
  ])("normalizes browser language %s to %s", (language, expected) => {
    expect(normalizeDetectedLanguage(language)).toBe(expected);
  });

  it.each(["fr-FR", "english", ""])(
    "preserves unsupported language %s for i18next to resolve",
    (language) => {
      expect(normalizeDetectedLanguage(language)).toBe(language);
    },
  );
});
