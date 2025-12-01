import Apple from "@mui/icons-material/Apple";
import Google from "@mui/icons-material/Google";
import Login from "@mui/icons-material/Login";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";

import { PageLayout } from "~/layouts/page-layout";
import { signInSchema } from "~/schemas/users";

const formContainerStyle: SxProps<Theme> = {
  padding: 6,
};

const titleStyle: SxProps<Theme> = {
  paddingBottom: 4,
  textAlign: "center",
};

const dividerStyle: SxProps<Theme> = {
  marginY: 2,
};

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
      <Paper elevation={2} sx={formContainerStyle}>
        <Box component="form">
          <Typography variant="h3" sx={titleStyle}>
            Sign In
          </Typography>
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
                <Button
                  variant="contained"
                  fullWidth
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                  loading={isSubmitting}
                  startIcon={<Login />}
                  onClick={(event) => {
                    event.preventDefault();
                    form.handleSubmit();
                  }}
                >
                  Sign In
                </Button>
              )}
            </form.Subscribe>
            <Divider sx={dividerStyle}>OR</Divider>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<Google />}
              onClick={() => {
                console.log("Sign in with Google");
              }}
            >
              Sign in with Google
            </Button>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<Apple />}
              onClick={() => {
                console.log("Sign in with Apple");
              }}
            >
              Sign in with Apple
            </Button>
          </Stack>
        </Box>
      </Paper>
    </PageLayout>
  );
};

export const Route = createFileRoute("/sign-in")({
  component: SignInRoute,
});
