import Login from "@mui/icons-material/Login";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";

import { AuthForm } from "#/components/auth-form";
import { PageLayout } from "#/layouts/page-layout";
import { signInSchema } from "#/schemas/users";

const SignInRoute = () => {
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
        <AuthForm.Title>Sign In</AuthForm.Title>
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
                icon={<Login />}
                onClick={(event) => {
                  event.preventDefault();
                  form.handleSubmit();
                }}
              >
                Sign In
              </AuthForm.SubmitButton>
            )}
          </form.Subscribe>
          <AuthForm.Divider />
          <AuthForm.SocialGoogleButton
            onClick={() => {
              console.log("Sign in with Google");
            }}
          >
            Sign in with Google
          </AuthForm.SocialGoogleButton>
          <AuthForm.SocialAppleButton
            onClick={() => {
              console.log("Sign in with Apple");
            }}
          >
            Sign in with Apple
          </AuthForm.SocialAppleButton>
        </Stack>
        <AuthForm.SwitchPrompt
          message="Don't have an account?"
          linkTo="/sign-up"
          linkText="Sign up."
        />
      </AuthForm>
    </PageLayout>
  );
};

export const Route = createFileRoute("/sign-in")({
  component: SignInRoute,
});
