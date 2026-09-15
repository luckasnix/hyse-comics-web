import type { CSSProperties, ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import { cleanup, render } from "vitest-browser-react/pure";

import { fallbackLanguage } from "#/constants/users.ts";

import { i18n } from "../../vitest.setup.ts";
import { SignUpForm } from "./sign-up-form.tsx";

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
  it("renders the sign-up fields and actions", async () => {
    await render(<SignUpForm />);

    await expect
      .element(page.getByRole("heading", { level: 3, name: "Sign Up" }))
      .toBeInTheDocument();
    await expect
      .element(page.getByLabelText("Email"))
      .toHaveAttribute("type", "email");
    await expect
      .element(page.getByLabelText("Password"))
      .toHaveAttribute("type", "password");
    await expect
      .element(page.getByLabelText("Confirm Password"))
      .toHaveAttribute("type", "password");
    await expect
      .element(page.getByRole("button", { name: "Sign Up" }))
      .toBeEnabled();
    await expect
      .element(page.getByRole("button", { name: "Sign up with Google" }))
      .toBeInTheDocument();
    await expect
      .element(page.getByRole("button", { name: "Sign up with Apple" }))
      .toBeInTheDocument();
    await expect
      .element(page.getByRole("link", { name: "Sign in." }))
      .toHaveAttribute("href", "/pt-BR/sign-in");
  });

  it("validates password confirmation", async () => {
    const user = userEvent.setup();
    await render(<SignUpForm />);

    await user.type(page.getByLabelText("Email"), "reader@example.com");
    await user.type(page.getByLabelText("Password"), "password-one");
    await user.type(page.getByLabelText("Confirm Password"), "password-two");
    await user.click(page.getByRole("button", { name: "Sign Up" }));

    await expect
      .element(page.getByText("Passwords don't match"))
      .toBeInTheDocument();
  });

  it("submits and resets valid registration data", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const user = userEvent.setup();
    await render(<SignUpForm />);

    const email = page.getByLabelText("Email");
    const password = page.getByLabelText("Password");
    const confirmPassword = page.getByLabelText("Confirm Password");

    await user.type(email, "reader@example.com");
    await user.type(password, "password");
    await user.type(confirmPassword, "password");
    await user.click(page.getByRole("button", { name: "Sign Up" }));

    await vi.waitFor(() => {
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
    await render(<SignUpForm />);

    await user.click(page.getByRole("button", { name: "Sign up with Google" }));
    await user.click(page.getByRole("button", { name: "Sign up with Apple" }));

    expect(consoleSpy).toHaveBeenCalledWith("Sign up with Google");
    expect(consoleSpy).toHaveBeenCalledWith("Sign up with Apple");
  });
});
