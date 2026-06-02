import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { IconLogin } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { AuthForm } from "#/components/auth-form/component";
import { PageLayout } from "#/layouts/page-layout";
import { signInSchema } from "#/schemas/users";

const SignInRoute = () => {
  const { t } = useTranslation();

  const { locale } = useParams({ strict: false });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: signInSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      console.log("Form submitted:", value);
      formApi.reset();
    },
  });

  return (
    <PageLayout maxWidth="sm">
      <AuthForm>
        <AuthForm.Title>{t("auth.signIn")}</AuthForm.Title>
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
                icon={<IconLogin />}
                onClick={(event) => {
                  event.preventDefault();
                  form.handleSubmit();
                }}
              >
                {t("auth.signIn")}
              </AuthForm.SubmitButton>
            )}
          </form.Subscribe>
          <AuthForm.Divider />
          <AuthForm.SocialGoogleButton
            onClick={() => {
              console.log("Sign in with Google");
            }}
          >
            {t("auth.signInWithGoogle")}
          </AuthForm.SocialGoogleButton>
          <AuthForm.SocialAppleButton
            onClick={() => {
              console.log("Sign in with Apple");
            }}
          >
            {t("auth.signInWithApple")}
          </AuthForm.SocialAppleButton>
        </Stack>
        <AuthForm.SwitchPrompt
          message={t("auth.noAccount")}
          linkTo="/{-$locale}/sign-up"
          linkParams={{ locale }}
          linkText={t("auth.signUpLink")}
        />
      </AuthForm>
    </PageLayout>
  );
};

export const Route = createFileRoute("/{-$locale}/sign-in")({
  component: SignInRoute,
});
