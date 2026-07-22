import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { useTranslation } from "react-i18next";

import { Form } from "#/components/form";
import { fallbackLanguage, fallbackReadingAxis } from "#/constants/users";
import { useUi } from "#/contexts/ui";
import type { ReadingAxis, SupportedLanguage } from "#/types/users";

export type SettingsFormValues = {
  preferredLanguage: SupportedLanguage;
  readingAxis: ReadingAxis;
};

const defaultValues: SettingsFormValues = {
  preferredLanguage: fallbackLanguage,
  readingAxis: fallbackReadingAxis,
};

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
