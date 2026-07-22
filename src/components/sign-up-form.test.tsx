// @vitest-environment jsdom
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { CSSProperties, ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { fallbackLanguage } from "#/constants/users";
import i18n from "#/i18n";

import { SignUpForm } from "./sign-up-form";

vi.mock("@tanstack/react-router", () => ({
  useParams: () => ({ locale: "pt-BR" }),
  Link: ({
    children,
    to,
    params,
    style,
  }: {
    children: ReactNode;
    to: string;
    params?: {
      locale?: string;
    };
    style?: CSSProperties;
  }) => (
    <a href={to.replace("{-$locale}", params?.locale ?? "")} style={style}>
      {children}
    </a>
  ),
}));

beforeEach(async () => {
  await i18n.changeLanguage(fallbackLanguage);
});

afterEach(cleanup);

describe("<SignUpForm />", () => {
  it("renders the sign-up fields and actions", () => {
    render(<SignUpForm />);

    expect(
      screen.getByRole("heading", { level: 3, name: "Sign Up" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
    expect(screen.getByLabelText("Password")).toHaveAttribute(
      "type",
      "password",
    );
    expect(screen.getByLabelText("Confirm Password")).toHaveAttribute(
      "type",
      "password",
    );
    expect(screen.getByRole("button", { name: "Sign Up" })).toBeEnabled();
    expect(
      screen.getByRole("button", { name: "Sign up with Google" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Sign up with Apple" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Sign in." })).toHaveAttribute(
      "href",
      "/pt-BR/sign-in",
    );
  });

  it("validates password confirmation", async () => {
    const user = userEvent.setup();
    render(<SignUpForm />);

    await user.type(screen.getByLabelText("Email"), "reader@example.com");
    await user.type(screen.getByLabelText("Password"), "password-one");
    await user.type(screen.getByLabelText("Confirm Password"), "password-two");
    await user.click(screen.getByRole("button", { name: "Sign Up" }));

    expect(
      await screen.findByText("Passwords don't match"),
    ).toBeInTheDocument();
  });

  it("submits and resets valid registration data", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const user = userEvent.setup();
    render(<SignUpForm />);

    const email = screen.getByLabelText("Email");
    const password = screen.getByLabelText("Password");
    const confirmPassword = screen.getByLabelText("Confirm Password");

    await user.type(email, "reader@example.com");
    await user.type(password, "password");
    await user.type(confirmPassword, "password");
    await user.click(screen.getByRole("button", { name: "Sign Up" }));

    await waitFor(() => {
      expect(email).toHaveValue("");
      expect(password).toHaveValue("");
      expect(confirmPassword).toHaveValue("");
    });
    expect(consoleSpy).toHaveBeenCalledWith("Form submitted:", {
      email: "reader@example.com",
      password: "password",
      confirmPassword: "password",
    });
  });

  it("keeps the simulated social actions", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const user = userEvent.setup();
    render(<SignUpForm />);

    await user.click(
      screen.getByRole("button", { name: "Sign up with Google" }),
    );
    await user.click(
      screen.getByRole("button", { name: "Sign up with Apple" }),
    );

    expect(consoleSpy).toHaveBeenCalledWith("Sign up with Google");
    expect(consoleSpy).toHaveBeenCalledWith("Sign up with Apple");
  });
});
