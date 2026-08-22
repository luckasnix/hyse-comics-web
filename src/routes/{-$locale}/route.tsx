import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { fallbackLanguage } from "#/constants/users.ts";
import { useUser } from "#/contexts/user.tsx";
import { NotFoundPage } from "#/pages/not-found-page.tsx";
import type { SupportedLanguage } from "#/types/users.ts";

const supportedLocales: SupportedLanguage[] = ["en-US", "pt-BR"];

const isSupportedLocale = (
  value: string | undefined,
): value is SupportedLanguage =>
  supportedLocales.includes(value as SupportedLanguage);

const LocaleRoute = () => {
  const { locale } = Route.useParams();
  const { user } = useUser();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const preferredLocale = user?.profile.preferredLanguage ?? fallbackLanguage;

  useEffect(() => {
    if (!isSupportedLocale(locale)) {
      navigate({
        to: "/{-$locale}",
        params: { locale: preferredLocale },
        replace: true,
      });
      return;
    }

    i18n.changeLanguage(locale);
  }, [locale, preferredLocale, navigate, i18n]);

  return <Outlet />;
};

export const Route = createFileRoute("/{-$locale}")({
  component: LocaleRoute,
  notFoundComponent: NotFoundPage,
});
