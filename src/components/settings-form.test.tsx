// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { fallbackLanguage } from "#/constants/users";
import { UiProvider } from "#/contexts/ui";
import i18n from "#/i18n";

import { SettingsForm } from "./settings-form";

const renderComponent = () =>
  render(
    <UiProvider>
      <SettingsForm />
    </UiProvider>,
  );

beforeEach(async () => {
  await i18n.changeLanguage(fallbackLanguage);
});

afterEach(cleanup);

describe("<SettingsForm />", () => {
  it("renders the settings fields with their default values", () => {
    renderComponent();

    expect(
      screen.getByRole("heading", { level: 3, name: "Settings" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: "Preferred language" }),
    ).toHaveTextContent("English (United States)");
    expect(
      screen.getByRole("combobox", { name: "Reading axis" }),
    ).toHaveTextContent("Vertical");
    expect(screen.getByRole("button", { name: "Save" })).toBeEnabled();
  });

  it("keeps changed values and shows a success toast after submission", async () => {
    const user = userEvent.setup();
    renderComponent();

    const preferredLanguage = screen.getByRole("combobox", {
      name: "Preferred language",
    });
    const readingAxis = screen.getByRole("combobox", {
      name: "Reading axis",
    });

    await user.click(preferredLanguage);
    await user.click(
      screen.getByRole("option", { name: "Portuguese (Brazil)" }),
    );
    await user.click(readingAxis);
    await user.click(screen.getByRole("option", { name: "Horizontal" }));
    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Settings saved successfully.",
    );
    expect(preferredLanguage).toHaveTextContent("Portuguese (Brazil)");
    expect(readingAxis).toHaveTextContent("Horizontal");
  });

  it("renders and submits with Portuguese translations", async () => {
    await i18n.changeLanguage("pt-BR");
    const user = userEvent.setup();
    renderComponent();

    expect(
      screen.getByRole("heading", { level: 3, name: "Configurações" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: "Idioma preferido" }),
    ).toHaveTextContent("Inglês (Estados Unidos)");
    expect(
      screen.getByRole("combobox", { name: "Eixo de leitura" }),
    ).toHaveTextContent("Vertical");

    await user.click(screen.getByRole("button", { name: "Salvar" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Configurações salvas com sucesso.",
    );
  });
});
