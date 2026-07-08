import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { IconUserPlus } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { AuthForm } from "#/components/auth-form";
import { PageLayout } from "#/layouts/page-layout";
import { signUpSchema } from "#/schemas/users";

const SignUpRoute = () => {
  const { t } = useTranslation();

  const { locale } = useParams({ strict: false });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: signUpSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      console.log("Form submitted:", value);
      formApi.reset();
    },
  });

  return (
    <PageLayout maxWidth="sm">
      <AuthForm
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          form.handleSubmit();
        }}
      >
        <AuthForm.Title>{t("auth.signUp")}</AuthForm.Title>
        <Stack spacing={2}>
          <form.Field name="email">
            {(field) => (
              <TextField
                fullWidth
                label={t("auth.email")}
                type="email"
                value={field.state.value}
                onChange={(event) => {
                  field.handleChange(event.target.value);
                }}
                error={field.state.meta.errors.length > 0}
                helperText={field.state.meta.errors[0]?.message}
              />
            )}
          </form.Field>
          <form.Field name="password">
            {(field) => (
              <TextField
                fullWidth
                label={t("auth.password")}
                type="password"
                value={field.state.value}
                onChange={(event) => {
                  field.handleChange(event.target.value);
                }}
                error={field.state.meta.errors.length > 0}
                helperText={field.state.meta.errors[0]?.message}
              />
            )}
          </form.Field>
          <form.Field name="confirmPassword">
            {(field) => (
              <TextField
                fullWidth
                label={t("auth.confirmPassword")}
                type="password"
                value={field.state.value}
                onChange={(event) => {
                  field.handleChange(event.target.value);
                }}
                error={field.state.meta.errors.length > 0}
                helperText={field.state.meta.errors[0]?.message}
              />
            )}
          </form.Field>
          <form.Subscribe
            selector={(state) => ({
              canSubmit: state.canSubmit,
              isSubmitting: state.isSubmitting,
            })}
          >
            {({ canSubmit, isSubmitting }) => (
              <AuthForm.SubmitButton
                disabled={!canSubmit || isSubmitting}
                loading={isSubmitting}
                icon={<IconUserPlus />}
              >
                {t("auth.signUp")}
              </AuthForm.SubmitButton>
            )}
          </form.Subscribe>
          <AuthForm.Divider />
          <AuthForm.SocialGoogleButton
            onClick={() => {
              console.log("Sign up with Google");
            }}
          >
            {t("auth.signUpWithGoogle")}
          </AuthForm.SocialGoogleButton>
          <AuthForm.SocialAppleButton
            onClick={() => {
              console.log("Sign up with Apple");
            }}
          >
            {t("auth.signUpWithApple")}
          </AuthForm.SocialAppleButton>
        </Stack>
        <AuthForm.SwitchPrompt
          message={t("auth.alreadyHaveAccount")}
          linkTo="/{-$locale}/sign-in"
          linkParams={{ locale }}
          linkText={t("auth.signInLink")}
        />
      </AuthForm>
    </PageLayout>
  );
};

export const Route = createFileRoute("/{-$locale}/sign-up")({
  component: SignUpRoute,
});
