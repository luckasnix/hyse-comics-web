import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {
  IconBrandAppleFilled,
  IconBrandGoogleFilled,
  IconUserPlus,
} from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { Link, useParams } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { useTranslation } from "react-i18next";

import { Form } from "#/components/form";
import { signUpSchema } from "#/schemas/users";
import { linkResetStyle } from "#/styles/common";

const dividerStyle: SxProps<Theme> = {
  marginY: 2,
};

const switchPromptStyle: SxProps<Theme> = {
  marginTop: 2,
  textAlign: "center",
};

const linkStyle: CSSProperties = {
  ...linkResetStyle,
  fontWeight: "bold",
};

export const SignUpForm = () => {
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
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        form.handleSubmit();
      }}
    >
      <Form.Title>{t("auth.signUp")}</Form.Title>
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
            <Form.SubmitButton
              disabled={!canSubmit || isSubmitting}
              loading={isSubmitting}
              icon={<IconUserPlus />}
            >
              {t("auth.signUp")}
            </Form.SubmitButton>
          )}
        </form.Subscribe>
        <Divider sx={dividerStyle}>{t("common.or")}</Divider>
        <Button
          type="button"
          variant="outlined"
          fullWidth
          startIcon={<IconBrandGoogleFilled />}
          onClick={() => {
            console.log("Sign up with Google");
          }}
        >
          {t("auth.signUpWithGoogle")}
        </Button>
        <Button
          type="button"
          variant="outlined"
          fullWidth
          startIcon={<IconBrandAppleFilled />}
          onClick={() => {
            console.log("Sign up with Apple");
          }}
        >
          {t("auth.signUpWithApple")}
        </Button>
      </Stack>
      <Typography variant="body2" sx={switchPromptStyle}>
        {t("auth.alreadyHaveAccount")}{" "}
        <Link to="/{-$locale}/sign-in" params={{ locale }} style={linkStyle}>
          {t("auth.signInLink")}
        </Link>
      </Typography>
    </Form>
  );
};
