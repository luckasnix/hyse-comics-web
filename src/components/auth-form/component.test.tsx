// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { CSSProperties, ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { AuthForm } from "./component";

vi.mock("@tanstack/react-router", () => ({
  Link: ({
    children,
    to,
    style,
  }: {
    children: ReactNode;
    to: string;
    style?: CSSProperties;
  }) => (
    <a href={to} style={style}>
      {children}
    </a>
  ),
}));

afterEach(cleanup);

describe("<AuthForm />", () => {
  it("renders children inside a form container", () => {
    const { container } = render(
      <AuthForm>
        <span>Credentials fields</span>
      </AuthForm>,
    );

    const form = container.querySelector("form");

    expect(form).toBeInTheDocument();
    expect(form).toContainElement(screen.getByText("Credentials fields"));
  });

  it("exposes all compound subcomponents", () => {
    expect(AuthForm.Title).toBeDefined();
    expect(AuthForm.SubmitButton).toBeDefined();
    expect(AuthForm.Divider).toBeDefined();
    expect(AuthForm.SocialGoogleButton).toBeDefined();
    expect(AuthForm.SocialAppleButton).toBeDefined();
    expect(AuthForm.SwitchPrompt).toBeDefined();
  });
});

describe("<AuthForm.Title />", () => {
  it("renders the title as a level 3 heading", () => {
    render(<AuthForm.Title>Sign in</AuthForm.Title>);

    expect(
      screen.getByRole("heading", { level: 3, name: "Sign in" }),
    ).toBeInTheDocument();
  });
});

describe("<AuthForm.SubmitButton />", () => {
  it("renders a submit button with the provided label and icon", () => {
    render(
      <AuthForm.SubmitButton
        disabled={false}
        loading={false}
        icon={<span data-testid="submit-icon" />}
        onClick={vi.fn()}
      >
        Sign in
      </AuthForm.SubmitButton>,
    );

    const button = screen.getByRole("button", { name: "Sign in" });

    expect(button).toHaveAttribute("type", "submit");
    expect(screen.getByTestId("submit-icon")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClickSpy = vi.fn();

    render(
      <AuthForm.SubmitButton
        disabled={false}
        loading={false}
        icon={<span data-testid="submit-icon" />}
        onClick={onClickSpy}
      >
        Sign in
      </AuthForm.SubmitButton>,
    );

    await user.click(screen.getByRole("button", { name: "Sign in" }));

    expect(onClickSpy).toHaveBeenCalledOnce();
  });

  it("renders disabled when disabled is true", () => {
    render(
      <AuthForm.SubmitButton
        disabled
        loading={false}
        icon={<span data-testid="submit-icon" />}
        onClick={vi.fn()}
      >
        Sign in
      </AuthForm.SubmitButton>,
    );

    expect(screen.getByRole("button", { name: "Sign in" })).toBeDisabled();
  });
});

describe("<AuthForm.Divider />", () => {
  it("renders the separator label", () => {
    render(<AuthForm.Divider />);

    expect(screen.getByText("OR")).toBeInTheDocument();
  });
});

describe("<AuthForm.SocialGoogleButton />", () => {
  it("renders the Google button with an icon", () => {
    render(
      <AuthForm.SocialGoogleButton onClick={vi.fn()}>
        Continue with Google
      </AuthForm.SocialGoogleButton>,
    );

    const button = screen.getByRole("button", {
      name: "Continue with Google",
    });

    expect(button.querySelector("svg")).not.toBeNull();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClickSpy = vi.fn();

    render(
      <AuthForm.SocialGoogleButton onClick={onClickSpy}>
        Continue with Google
      </AuthForm.SocialGoogleButton>,
    );

    await user.click(
      screen.getByRole("button", { name: "Continue with Google" }),
    );

    expect(onClickSpy).toHaveBeenCalledOnce();
  });
});

describe("<AuthForm.SocialAppleButton />", () => {
  it("renders the Apple button with an icon", () => {
    render(
      <AuthForm.SocialAppleButton onClick={vi.fn()}>
        Continue with Apple
      </AuthForm.SocialAppleButton>,
    );

    const button = screen.getByRole("button", {
      name: "Continue with Apple",
    });

    expect(button.querySelector("svg")).not.toBeNull();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClickSpy = vi.fn();

    render(
      <AuthForm.SocialAppleButton onClick={onClickSpy}>
        Continue with Apple
      </AuthForm.SocialAppleButton>,
    );

    await user.click(
      screen.getByRole("button", { name: "Continue with Apple" }),
    );

    expect(onClickSpy).toHaveBeenCalledOnce();
  });
});

describe("<AuthForm.SwitchPrompt />", () => {
  it("renders the prompt message and navigation link", () => {
    render(
      <AuthForm.SwitchPrompt
        message="No account yet?"
        linkTo="/sign-up"
        linkText="Create one"
      />,
    );

    expect(screen.getByText("No account yet?")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Create one" })).toHaveAttribute(
      "href",
      "/sign-up",
    );
  });
});
