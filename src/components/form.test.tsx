import { afterEach, describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import { cleanup, render } from "vitest-browser-react/pure";

import { Form } from "./form.tsx";

afterEach(cleanup);

describe("<Form />", () => {
  it("renders children inside a form container", async () => {
    const { container } = await render(
      <Form onSubmit={vi.fn()}>
        <span>Form fields</span>
      </Form>,
    );

    const form = container.querySelector("form");

    expect(form).toBeInTheDocument();
    expect(form).toHaveAttribute("novalidate");
    expect(form).toContainElement(page.getByText("Form fields").element());
  });

  it("passes submit events to the provided handler", async () => {
    const user = userEvent.setup();
    const onSubmitSpy = vi.fn((event) => {
      event.preventDefault();
    });
    await render(
      <Form onSubmit={onSubmitSpy}>
        <button type="submit">Submit</button>
      </Form>,
    );

    await user.click(page.getByRole("button", { name: "Submit" }));

    expect(onSubmitSpy).toHaveBeenCalledOnce();
  });

  it("exposes the compound subcomponents", async () => {
    expect(Form.Title).toBeDefined();
    expect(Form.SubmitButton).toBeDefined();
  });
});

describe("<Form.Title />", () => {
  it("renders a level 3 heading", async () => {
    await render(<Form.Title>Form title</Form.Title>);

    await expect
      .element(page.getByRole("heading", { level: 3, name: "Form title" }))
      .toBeInTheDocument();
  });
});

describe("<Form.SubmitButton />", () => {
  it("renders a submit button with its label and icon", async () => {
    await render(
      <Form.SubmitButton
        disabled={false}
        loading={false}
        icon={<span data-testid="submit-icon" />}
      >
        Submit
      </Form.SubmitButton>,
    );

    const button = page.getByRole("button", { name: "Submit" });

    expect(button).toHaveAttribute("type", "submit");
    await expect.element(page.getByTestId("submit-icon")).toBeInTheDocument();
  });

  it("supports the disabled state", async () => {
    await render(
      <Form.SubmitButton
        disabled
        loading={false}
        icon={<span data-testid="submit-icon" />}
      >
        Submit
      </Form.SubmitButton>,
    );

    await expect
      .element(page.getByRole("button", { name: "Submit" }))
      .toBeDisabled();
  });

  it("supports the loading state", async () => {
    await render(
      <Form.SubmitButton
        disabled={false}
        loading
        icon={<span data-testid="submit-icon" />}
      >
        Submit
      </Form.SubmitButton>,
    );

    await expect
      .element(page.getByRole("button", { name: "Submit" }))
      .toBeDisabled();
    await expect.element(page.getByRole("progressbar")).toBeInTheDocument();
  });
});
