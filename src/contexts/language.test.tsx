import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterContextProvider,
  RouterProvider,
} from "@tanstack/react-router";
import { type ReactNode, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { useTranslation } from "react-i18next";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import { cleanup, render } from "vitest-browser-react/pure";

import { UserProvider } from "#/contexts/user.tsx";
import { createI18n as originalCreateI18n } from "#/i18n/instance.ts";
import { signedInUserMock } from "#/mocks/users.ts";
import { NotFoundPage } from "#/pages/not-found-page.tsx";
import type { SupportedLanguage, User } from "#/types/users.ts";

import {
  LanguageBoundary,
  LanguageProvider,
  useLanguage,
} from "./language.tsx";

const createI18nMock = vi.hoisted(() => vi.fn());

vi.mock("#/i18n/index.ts", () => ({ createI18n: createI18nMock }));

const Content = () => {
  const { t } = useTranslation();

  return <h1>{t("auth.signIn")}</h1>;
};

const Document = ({ children }: { children: ReactNode }) => {
  const { language } = useLanguage();

  return (
    <div lang={language} data-testid="document">
      <LanguageBoundary>{children}</LanguageBoundary>
    </div>
  );
};

const makeRouter = async (href: string) => {
  const root = createRootRoute({
    component: () => (
      <LanguageProvider>
        <Document>
          <Outlet />
        </Document>
      </LanguageProvider>
    ),
    notFoundComponent: NotFoundPage,
  });
  const locale = createRoute({
    getParentRoute: () => root,
    path: "{-$locale}",
    component: Outlet,
    notFoundComponent: NotFoundPage,
  });
  const home = createRoute({
    getParentRoute: () => locale,
    path: "/",
    component: Content,
  });
  const comic = createRoute({
    getParentRoute: () => locale,
    path: "comics/$comicId",
    component: Content,
  });
  const signIn = createRoute({
    getParentRoute: () => locale,
    path: "sign-in",
    component: Content,
  });
  const router = createRouter({
    routeTree: root.addChildren([locale.addChildren([home, comic, signIn])]),
    history: createMemoryHistory({ initialEntries: [href] }),
    defaultPendingMs: 0,
    defaultPendingMinMs: 0,
  });
  await router.load();

  return router;
};

const userWithLanguage = (preferredLanguage: SupportedLanguage): User => ({
  ...signedInUserMock,
  profile: { ...signedInUserMock.profile, preferredLanguage },
});

beforeEach(() => {
  createI18nMock.mockImplementation(originalCreateI18n);
  vi.spyOn(window.navigator, "languages", "get").mockReturnValue(["pt-PT"]);
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
});

afterEach(async () => {
  await cleanup();
  vi.restoreAllMocks();
});

describe("LanguageProvider", () => {
  it.each([
    [null, "/comics/123?view=list#details", "pt-BR"],
    [null, "/fr-FR/comics/123?view=list#details", "pt-BR"],
    [null, "/en-US/comics/123?view=list#details", "en-US"],
    ["pt-BR", "/en-US/comics/123?view=list#details", "pt-BR"],
    ["en-US", "/pt-BR/comics/123?view=list#details", "en-US"],
  ] as const)(
    "resolves user %s at %s to %s",
    async (preference, href, expected) => {
      const router = await makeRouter(href);
      const replace = vi.spyOn(router.history, "replace");
      await render(
        <StrictMode>
          <UserProvider user={preference ? userWithLanguage(preference) : null}>
            <RouterProvider router={router} />
          </UserProvider>
        </StrictMode>,
      );

      await expect
        .element(
          page.getByRole("heading", {
            name: expected === "pt-BR" ? "Entrar" : "Sign In",
          }),
        )
        .toBeInTheDocument();
      await expect
        .element(page.getByTestId("document"))
        .toHaveAttribute("lang", expected);
      expect(router.state.location.href).toBe(
        `/${expected}/comics/123?view=list#details`,
      );
      expect(router.history.length).toBe(1);
      expect(replace).toHaveBeenCalledTimes(
        href.startsWith(`/${expected}/`) ? 0 : 1,
      );
    },
  );

  it("shows the splash until detection and navigation have finished", async () => {
    let finishDetection: (() => Promise<unknown>) | undefined;
    createI18nMock.mockImplementation((language) => {
      const instance = originalCreateI18n(language);
      const changeLanguage = instance.changeLanguage.bind(instance);
      vi.spyOn(instance, "changeLanguage").mockImplementation(
        (nextLanguage) =>
          new Promise((resolve) => {
            finishDetection = () => changeLanguage(nextLanguage).then(resolve);
          }),
      );
      return instance;
    });
    const router = await makeRouter("/sign-in");
    await render(
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>,
    );

    await expect
      .element(page.getByRole("img", { name: "Hyse Comics logomark" }))
      .toBeVisible();
    await expect.element(page.getByRole("heading")).not.toBeInTheDocument();

    await finishDetection?.();

    await expect
      .element(page.getByRole("heading", { name: "Entrar" }))
      .toBeInTheDocument();
    expect(router.state.location.pathname).toBe("/pt-BR/sign-in");
    await expect
      .element(page.getByRole("img", { name: "Hyse Comics logomark" }))
      .not.toBeInTheDocument();
  });

  it("updates the language on login, preference changes, logout and navigation", async () => {
    const router = await makeRouter("/en-US/sign-in");
    const tree = (user: User | null) => (
      <UserProvider user={user}>
        <RouterProvider router={router} />
      </UserProvider>
    );
    const { rerender } = await render(tree(null));
    await expect
      .element(page.getByRole("heading", { name: "Sign In" }))
      .toBeInTheDocument();

    await rerender(tree(userWithLanguage("pt-BR")));

    await expect
      .element(page.getByRole("heading", { name: "Entrar" }))
      .toBeInTheDocument();

    expect(router.state.location.pathname).toBe("/pt-BR/sign-in");

    await rerender(tree(userWithLanguage("en-US")));

    await expect
      .element(page.getByRole("heading", { name: "Sign In" }))
      .toBeInTheDocument();

    expect(router.state.location.pathname).toBe("/en-US/sign-in");

    await rerender(tree(null));

    await expect
      .element(page.getByRole("heading", { name: "Sign In" }))
      .toBeInTheDocument();
    await router.navigate({ href: "/pt-BR/sign-in" });
    await expect
      .element(page.getByRole("heading", { name: "Entrar" }))
      .toBeInTheDocument();

    await expect
      .element(page.getByTestId("document"))
      .toHaveAttribute("lang", "pt-BR");
  });

  it("discards pending detection when a user arrives", async () => {
    let finishDetection: (() => Promise<unknown>) | undefined;
    createI18nMock.mockImplementation((language) => {
      const instance = originalCreateI18n(language);
      const changeLanguage = instance.changeLanguage.bind(instance);
      vi.spyOn(instance, "changeLanguage").mockImplementation(
        (nextLanguage) =>
          new Promise((resolve) => {
            finishDetection = () => changeLanguage(nextLanguage).then(resolve);
          }),
      );
      return instance;
    });
    const router = await makeRouter("/sign-in");
    const tree = (user: User | null) => (
      <UserProvider user={user}>
        <RouterProvider router={router} />
      </UserProvider>
    );
    const { rerender } = await render(tree(null));

    expect(finishDetection).toBeDefined();

    await rerender(tree(userWithLanguage("en-US")));

    await expect
      .element(page.getByRole("heading", { name: "Sign In" }))
      .toBeInTheDocument();
    await finishDetection?.();

    await expect
      .element(page.getByRole("heading", { name: "Sign In" }))
      .toBeVisible();
    expect(router.state.location.pathname).toBe("/en-US/sign-in");
  });

  it("detects again when navigating from an explicit locale to a URL without one", async () => {
    const router = await makeRouter("/en-US/sign-in");
    await render(
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>,
    );

    await expect
      .element(page.getByRole("heading", { name: "Sign In" }))
      .toBeInTheDocument();
    await router.navigate({ href: "/comics/123" });
    await expect
      .element(page.getByRole("heading", { name: "Entrar" }))
      .toBeInTheDocument();

    expect(router.state.location.pathname).toBe("/pt-BR/comics/123");
  });

  it("shows an error if detection fails instead of leaving a permanent splash", async () => {
    createI18nMock.mockImplementation((language) => {
      const instance = originalCreateI18n(language);
      vi.spyOn(instance, "changeLanguage").mockRejectedValue(
        new Error("Detection failed"),
      );
      return instance;
    });
    const router = await makeRouter("/sign-in");
    await render(
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>,
    );

    await expect
      .element(page.getByRole("heading", { name: "Error" }))
      .toBeInTheDocument();

    await expect
      .element(page.getByRole("img", { name: "Hyse Comics logomark" }))
      .not.toBeInTheDocument();
  });

  it.each(["/missing/page", "/pt-BR/missing/page"])(
    "keeps unknown URL %s and localizes the 404 home link",
    async (href) => {
      const user = userEvent.setup();
      const router = await makeRouter(href);
      await render(
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>,
      );

      await expect
        .element(page.getByRole("heading", { name: "Página não encontrada" }))
        .toBeInTheDocument();

      expect(router.state.location.href).toBe(href);

      await user.click(
        page.getByRole("button", { name: "Voltar para o início" }),
      );
      await expect
        .element(page.getByRole("heading", { name: "Entrar" }))
        .toBeInTheDocument();

      expect(router.state.location.pathname).toBe("/pt-BR");
    },
  );

  it.each([
    ["/pt-BR/sign-in", "pt-BR", "Entrar"],
    ["/en-US/sign-in", "en-US", "Sign In"],
    ["/sign-in", "en-US", "Hyse Comics logomark"],
  ])(
    "renders and hydrates %s consistently",
    async (href, initialLanguage, text) => {
      const router = await makeRouter(href);
      // Use the actual coordinator with a document fragment so the hydration
      // check is independent of the router's own serialization machinery.
      const tree = (
        <RouterContextProvider router={router}>
          <UserProvider>
            <LanguageProvider>
              <Document>
                <Content />
              </Document>
            </LanguageProvider>
          </UserProvider>
        </RouterContextProvider>
      );
      const html = renderToString(tree);
      expect(html).toContain(`lang="${initialLanguage}"`);
      expect(html).toContain(text);
      if (href === "/sign-in") expect(html).not.toContain("<h1>");
      const container = document.createElement("div");
      container.innerHTML = html;
      document.body.append(container);
      const onRecoverableError = vi.fn();
      const root = hydrateRoot(container, tree, { onRecoverableError });
      await vi.waitFor(() =>
        expect(container.querySelector("h1")).not.toBeNull(),
      );

      expect(onRecoverableError).not.toHaveBeenCalled();

      root.unmount();

      container.remove();
    },
  );
});
