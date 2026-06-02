import type { MouseEventHandler, ReactNode } from "react";

export type AuthFormContainerProps = Readonly<{
  children: ReactNode;
}>;

export type AuthFormTitleProps = Readonly<{
  children: ReactNode;
}>;

export type AuthFormSubmitButtonProps = Readonly<{
  disabled: boolean;
  loading: boolean;
  icon: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: string;
}>;

export type AuthFormSocialProps = Readonly<{
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: string;
}>;

export type AuthFormSwitchPromptProps = Readonly<{
  message: string;
  linkTo: string;
  linkParams?: Record<string, string | undefined>;
  linkText: string;
}>;
