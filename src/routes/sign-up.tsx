import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { IconUserPlus } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { AuthForm } from "#/components/auth-form";

import { PageLayout } from "#/layouts/page-layout";
import { signUpSchema } from "#/schemas/users";

const SignUpRoute = () => {
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
      <AuthForm>
        <AuthForm.Title>Sign Up</AuthForm.Title>
        <Stack spacing={2}>
          <form.Field name="email">
            {(field) => (
              <TextField
                fullWidth
                label="Email"
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
                label="Password"
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
                label="Confirm Password"
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
                onClick={(event) => {
                  event.preventDefault();
                  form.handleSubmit();
                }}
              >
                Sign Up
              </AuthForm.SubmitButton>
            )}
          </form.Subscribe>
          <AuthForm.Divider />
          <AuthForm.SocialGoogleButton
            onClick={() => {
              console.log("Sign up with Google");
            }}
          >
            Sign up with Google
          </AuthForm.SocialGoogleButton>
          <AuthForm.SocialAppleButton
            onClick={() => {
              console.log("Sign up with Apple");
            }}
          >
            Sign up with Apple
          </AuthForm.SocialAppleButton>
        </Stack>
        <AuthForm.SwitchPrompt
          message="Already have an account?"
          linkTo="/sign-in"
          linkText="Sign in."
        />
      </AuthForm>
    </PageLayout>
  );
};

export const Route = createFileRoute("/sign-up")({
  component: SignUpRoute,
});
