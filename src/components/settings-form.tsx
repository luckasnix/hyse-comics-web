import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { useTranslation } from "react-i18next";

import { Form } from "#/components/form.tsx";
import {
  fallbackLanguage,
  fallbackReadingAxis,
  fallbackTheme,
} from "#/constants/users.ts";
import { useUi } from "#/contexts/ui.tsx";
import type {
  ReadingAxis,
  SupportedLanguage,
  ThemePreference,
} from "#/types/users.ts";

export type SettingsFormValues = {
  theme: ThemePreference;
  preferredLanguage: SupportedLanguage;
  readingAxis: ReadingAxis;
};

const defaultValues: SettingsFormValues = {
  theme: fallbackTheme,
  preferredLanguage: fallbackLanguage,
  readingAxis: fallbackReadingAxis,
};

const themeOptions: ReadonlyArray<{
  value: ThemePreference;
  labelKey: string;
}> = [
  {
    value: "system",
    labelKey: "settings.themes.system",
  },
  {
    value: "light",
    labelKey: "settings.themes.light",
  },
  {
    value: "dark",
    labelKey: "settings.themes.dark",
  },
];

const languageOptions: ReadonlyArray<{
  value: SupportedLanguage;
  labelKey: string;
}> = [
  {
    value: "en-US",
    labelKey: "settings.languages.enUS",
  },
  {
    value: "pt-BR",
    labelKey: "settings.languages.ptBR",
  },
];

const readingAxisOptions: ReadonlyArray<{
  value: ReadingAxis;
  labelKey: string;
}> = [
  {
    value: "horizontal",
    labelKey: "settings.readingAxes.horizontal",
  },
  {
    value: "vertical",
    labelKey: "settings.readingAxes.vertical",
  },
];

export const SettingsForm = () => {
  const { t } = useTranslation();

  const { showToast } = useUi();

  const form = useForm({
    defaultValues,
    onSubmit: () => {
      showToast({
        severity: "success",
        message: t("settings.saveSuccess"),
      });
    },
  });

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        form.handleSubmit();
      }}
    >
      <Form.Title>{t("settings.title")}</Form.Title>
      <Stack spacing={2}>
        <form.Field name="theme">
          {(field) => (
            <TextField
              select
              fullWidth
              label={t("settings.theme")}
              value={field.state.value}
              onChange={(event) => {
                field.handleChange(event.target.value as ThemePreference);
              }}
            >
              {themeOptions.map(({ value, labelKey }) => (
                <MenuItem key={value} value={value}>
                  {t(labelKey)}
                </MenuItem>
              ))}
            </TextField>
          )}
        </form.Field>
        <form.Field name="preferredLanguage">
          {(field) => (
            <TextField
              select
              fullWidth
              label={t("settings.preferredLanguage")}
              value={field.state.value}
              onChange={(event) => {
                field.handleChange(event.target.value as SupportedLanguage);
              }}
            >
              {languageOptions.map(({ value, labelKey }) => (
                <MenuItem key={value} value={value}>
                  {t(labelKey)}
                </MenuItem>
              ))}
            </TextField>
          )}
        </form.Field>
        <form.Field name="readingAxis">
          {(field) => (
            <TextField
              select
              fullWidth
              label={t("settings.readingAxis")}
              value={field.state.value}
              onChange={(event) => {
                field.handleChange(event.target.value as ReadingAxis);
              }}
            >
              {readingAxisOptions.map(({ value, labelKey }) => (
                <MenuItem key={value} value={value}>
                  {t(labelKey)}
                </MenuItem>
              ))}
            </TextField>
          )}
        </form.Field>
        <form.Subscribe
          selector={(state) => ({
            canSubmit: state.canSubmit,
            isSubmitting: state.isSubmitting,
          })}
        >
          {({ canSubmit, isSubmitting }) => (
            <Form.SubmitButton
              disabled={!canSubmit || isSubmitting}
              loading={isSubmitting}
              icon={<IconDeviceFloppy />}
            >
              {t("settings.save")}
            </Form.SubmitButton>
          )}
        </form.Subscribe>
      </Stack>
    </Form>
  );
};
