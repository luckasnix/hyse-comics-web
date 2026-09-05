// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";

import { createI18n } from "./index.ts";

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  document.documentElement.removeAttribute("lang");
  window.history.replaceState(null, "", "/");
});

describe("browser language detection", () => {
  it.each([
    [["pt"], "pt-BR"],
    [["pt-PT", "en-US"], "pt-BR"],
    [["pt-BR"], "pt-BR"],
    [["en"], "en-US"],
    [["en-GB", "pt-BR"], "en-US"],
    [["fr-FR", "pt-PT", "en-US"], "pt-BR"],
    [["fr-FR", "de-DE"], "en-US"],
    [[], "en-US"],
  ])("resolves %j to %s", async (languages, expected) => {
    vi.spyOn(window.navigator, "languages", "get").mockReturnValue(languages);
    vi.spyOn(window.navigator, "language", "get").mockReturnValue(
      languages[0] ?? "",
    );

    const instance = createI18n();
    await instance.changeLanguage();

    expect(instance.resolvedLanguage).toBe(expected);
  });

  it("initializes explicit languages synchronously without detecting", () => {
    const languages = vi.spyOn(window.navigator, "languages", "get");
    const instance = createI18n("pt-BR");

    expect(instance.isInitialized).toBe(true);
    expect(instance.t("auth.signIn")).toBe("Entrar");
    expect(languages).not.toHaveBeenCalled();
  });

  it("uses navigator instead of URL, HTML or storage and does not persist", async () => {
    vi.spyOn(window.navigator, "languages", "get").mockReturnValue(["pt-PT"]);
    const storage = {
      getItem: vi.fn(() => "en-US"),
      setItem: vi.fn(),
    };
    vi.stubGlobal("localStorage", storage);
    vi.stubGlobal("sessionStorage", storage);
    const readCookie = vi
      .spyOn(document, "cookie", "get")
      .mockReturnValue("i18next=en-US");
    const writeCookie = vi.spyOn(document, "cookie", "set");
    document.documentElement.lang = "en-US";
    window.history.replaceState(null, "", "/en-US?lng=en-US#lng=en-US");

    const instance = createI18n();
    await instance.changeLanguage();

    expect(instance.resolvedLanguage).toBe("pt-BR");
    expect(storage.getItem).not.toHaveBeenCalled();
    expect(storage.setItem).not.toHaveBeenCalled();
    expect(readCookie).not.toHaveBeenCalled();
    expect(writeCookie).not.toHaveBeenCalled();
  });

  it("isolates changes between application instances", async () => {
    const english = createI18n("en-US");
    const portuguese = createI18n("pt-BR");

    await portuguese.changeLanguage("en-US");
    await english.changeLanguage("pt-BR");

    expect(english.t("auth.signIn")).toBe("Entrar");
    expect(portuguese.t("auth.signIn")).toBe("Sign In");
  });
});
