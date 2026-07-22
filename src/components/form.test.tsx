// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Form } from "./form";

afterEach(cleanup);

describe("<Form />", () => {
  it("renders children inside a form container", () => {
    const { container } = render(
      <Form onSubmit={vi.fn()}>
        <span>Form fields</span>
      </Form>,
    );

    const form = container.querySelector("form");

    expect(form).toBeInTheDocument();
    expect(form).toHaveAttribute("novalidate");
    expect(form).toContainElement(screen.getByText("Form fields"));
  });

  it("passes submit events to the provided handler", async () => {
    const user = userEvent.setup();
    const onSubmitSpy = vi.fn((event) => {
      event.preventDefault();
    });
    render(
      <Form onSubmit={onSubmitSpy}>
        <button type="submit">Submit</button>
      </Form>,
    );

    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(onSubmitSpy).toHaveBeenCalledOnce();
  });

  it("exposes the compound subcomponents", () => {
    expect(Form.Title).toBeDefined();
    expect(Form.SubmitButton).toBeDefined();
  });
});

describe("<Form.Title />", () => {
  it("renders a level 3 heading", () => {
    render(<Form.Title>Form title</Form.Title>);

    expect(
      screen.getByRole("heading", { level: 3, name: "Form title" }),
    ).toBeInTheDocument();
  });
});

describe("<Form.SubmitButton />", () => {
  it("renders a submit button with its label and icon", () => {
    render(
      <Form.SubmitButton
        disabled={false}
        loading={false}
        icon={<span data-testid="submit-icon" />}
      >
        Submit
      </Form.SubmitButton>,
    );

    const button = screen.getByRole("button", { name: "Submit" });

    expect(button).toHaveAttribute("type", "submit");
    expect(screen.getByTestId("submit-icon")).toBeInTheDocument();
  });

  it("supports the disabled state", () => {
    render(
      <Form.SubmitButton
        disabled
        loading={false}
        icon={<span data-testid="submit-icon" />}
      >
        Submit
      </Form.SubmitButton>,
    );

    expect(screen.getByRole("button", { name: "Submit" })).toBeDisabled();
  });

  it("supports the loading state", () => {
    render(
      <Form.SubmitButton
        disabled={false}
        loading
        icon={<span data-testid="submit-icon" />}
      >
        Submit
      </Form.SubmitButton>,
    );

    expect(screen.getByRole("button", { name: "Submit" })).toBeDisabled();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
