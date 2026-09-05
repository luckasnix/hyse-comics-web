import { useRouter, useRouterState } from "@tanstack/react-router";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { I18nextProvider } from "react-i18next";

import { DefaultError } from "#/components/default-error.tsx";
import { fallbackLanguage } from "#/constants/users.ts";
import { useUser } from "#/contexts/user.tsx";
import { createI18n } from "#/i18n/index.ts";
import { SplashPage } from "#/pages/splash-page.tsx";
import type { SupportedLanguage } from "#/types/users.ts";
import { isSupportedLanguage } from "#/utils/languages.ts";

type LanguageContextValue = {
  language: SupportedLanguage;
  isReady: boolean;
  hasError: boolean;
};

type LanguageResolution = {
  source: SupportedLanguage | undefined;
  language: SupportedLanguage | undefined;
  instance: ReturnType<typeof createI18n>;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();

  const router = useRouter();

  const { locale, canLocalize, isLoading, href } = useRouterState({
    select: (state) => {
      const localeMatch = state.matches.find(
        (match) => match.routeId === "/{-$locale}",
      );
      const location = state.location;

      return {
        locale: localeMatch
          ? localeMatch.params.locale
          : location.pathname.split("/")[1],
        canLocalize:
          !!localeMatch &&
          !state.matches.some(
            (match) => match._notFound || match.status === "notFound",
          ),
        isLoading: state.isLoading,
        href: location.href,
      };
    },
  });

  const source =
    user?.profile.preferredLanguage ??
    (isSupportedLanguage(locale) ? locale : undefined);

  const [resolution, setResolution] = useState<LanguageResolution>(() => ({
    source,
    language: source,
    instance: createI18n(source),
  }));

  const [hasError, setHasError] = useState(false);

  const isCurrent = resolution.source === source;

  const language = resolution.language ?? fallbackLanguage;

  const needsNavigation = canLocalize && locale !== language;

  useEffect(() => {
    if (isCurrent && resolution.language) return;

    let cancelled = false;
    // Each resolution owns its instance, so a stale asynchronous operation
    // cannot change the translations of the currently displayed tree.
    const instance = createI18n(source);
    const resolve = async () => {
      if (!source) await instance.changeLanguage();

      if (cancelled) return;

      const detectedLanguage = instance.resolvedLanguage;
      setResolution({
        source,
        language: isSupportedLanguage(detectedLanguage)
          ? detectedLanguage
          : fallbackLanguage,
        instance,
      });
      setHasError(false);
    };

    resolve().catch(() => {
      if (!cancelled) setHasError(true);
    });

    return () => {
      cancelled = true;
    };
  }, [isCurrent, resolution.language, source]);

  useEffect(() => {
    if (
      !isCurrent ||
      !resolution.language ||
      !needsNavigation ||
      isLoading ||
      router.state.location.href !== href
    ) {
      return;
    }

    let cancelled = false;
    router
      .navigate({
        to: ".",
        params: (previous) => ({ ...previous, locale: language }),
        search: true,
        hash: true,
        replace: true,
        resetScroll: false,
      })
      .catch(() => {
        if (!cancelled) setHasError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [
    router,
    isCurrent,
    resolution.language,
    needsNavigation,
    isLoading,
    language,
    href,
  ]);

  return (
    <I18nextProvider i18n={resolution.instance}>
      <LanguageContext
        value={{
          language,
          isReady: isCurrent && !!resolution.language && !needsNavigation,
          hasError,
        }}
      >
        {children}
      </LanguageContext>
    </I18nextProvider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "The hook 'useLanguage' must be used inside 'LanguageProvider'.",
    );
  }

  return context;
};

export const LanguageBoundary = ({ children }: { children: ReactNode }) => {
  const { isReady, hasError } = useLanguage();

  if (hasError) return <DefaultError />;
  if (!isReady) return <SplashPage />;

  return children;
};
