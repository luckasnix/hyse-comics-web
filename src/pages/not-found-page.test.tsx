import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import { cleanup, render } from "vitest-browser-react/pure";

import { fallbackLanguage } from "#/constants/users.ts";
import { useLanguage } from "#/contexts/language.tsx";

import { i18n } from "../../vitest.setup.ts";
import { NotFoundPage } from "./not-found-page.tsx";

const navigateSpy = vi.fn();

vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => navigateSpy,
}));

vi.mock("#/contexts/language.tsx", () => ({
  useLanguage: vi.fn(),
}));

const useLanguageMock = vi.mocked(useLanguage);

beforeEach(async () => {
  navigateSpy.mockClear();
  await i18n.changeLanguage(fallbackLanguage);
});

afterEach(cleanup);

describe("<NotFoundPage />", () => {
  describe.each([
    {
      language: "en-US",
      heading: "Page not found",
      description: "Sorry, the page you are looking for does not exist.",
      action: "Back to home",
    },
    {
      language: "pt-BR",
      heading: "Página não encontrada",
      description: "Desculpe, a página que você está procurando não existe.",
      action: "Voltar para o início",
    },
  ] as const)("in $language", ({ language, heading, description, action }) => {
    beforeEach(async () => {
      useLanguageMock.mockReturnValue({
        language,
        isReady: true,
        hasError: false,
      });
      await i18n.changeLanguage(language);
    });

    it("renders the localized heading, description and home action", async () => {
      await render(<NotFoundPage />);

      await expect
        .element(page.getByRole("heading", { level: 3, name: heading }))
        .toBeInTheDocument();
      await expect.element(page.getByText(description)).toBeInTheDocument();
      await expect
        .element(page.getByRole("button", { name: action }))
        .toBeEnabled();
      expect(navigateSpy).not.toHaveBeenCalled();
    });

    it("navigates home using the current language when clicked", async () => {
      const user = userEvent.setup();
      await render(<NotFoundPage />);

      await user.click(page.getByRole("button", { name: action }));

      expect(navigateSpy).toHaveBeenCalledExactlyOnceWith({
        to: "/{-$locale}",
        params: { locale: language },
      });
    });
  });
});
