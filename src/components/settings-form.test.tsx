import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { page, userEvent } from "vitest/browser";
import { cleanup, render } from "vitest-browser-react/pure";

import { fallbackLanguage } from "#/constants/users.ts";
import { UiProvider } from "#/contexts/ui.tsx";

import { i18n } from "../../vitest.setup.ts";
import { SettingsForm } from "./settings-form.tsx";

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
  it("renders the settings fields with their default values", async () => {
    await renderComponent();

    await expect
      .element(page.getByRole("heading", { level: 3, name: "Settings" }))
      .toBeInTheDocument();
    await expect
      .element(page.getByRole("combobox", { name: "Theme" }))
      .toHaveTextContent("System");
    await expect
      .element(page.getByRole("combobox", { name: "Preferred language" }))
      .toHaveTextContent("English (United States)");
    await expect
      .element(page.getByRole("combobox", { name: "Reading axis" }))
      .toHaveTextContent("Vertical");
    await expect
      .element(page.getByRole("button", { name: "Save" }))
      .toBeEnabled();
  });

  it("keeps changed values and shows a success toast after submission", async () => {
    const user = userEvent.setup();
    await renderComponent();

    const theme = page.getByRole("combobox", { name: "Theme" });
    const preferredLanguage = page.getByRole("combobox", {
      name: "Preferred language",
    });
    const readingAxis = page.getByRole("combobox", {
      name: "Reading axis",
    });

    await user.click(theme);
    await user.click(page.getByRole("option", { name: "Dark" }));
    await user.click(preferredLanguage);
    await user.click(page.getByRole("option", { name: "Portuguese (Brazil)" }));
    await user.click(readingAxis);
    await user.click(page.getByRole("option", { name: "Horizontal" }));
    await user.click(page.getByRole("button", { name: "Save" }));

    await expect
      .element(page.getByRole("alert"))
      .toHaveTextContent("Settings saved successfully.");
    expect(theme).toHaveTextContent("Dark");
    expect(preferredLanguage).toHaveTextContent("Portuguese (Brazil)");
    expect(readingAxis).toHaveTextContent("Horizontal");
  });

  it("renders and submits with Portuguese translations", async () => {
    await i18n.changeLanguage("pt-BR");
    const user = userEvent.setup();
    await renderComponent();

    await expect
      .element(page.getByRole("heading", { level: 3, name: "Configurações" }))
      .toBeInTheDocument();
    await expect
      .element(page.getByRole("combobox", { name: "Tema" }))
      .toHaveTextContent("Sistema");
    await expect
      .element(page.getByRole("combobox", { name: "Idioma preferido" }))
      .toHaveTextContent("Inglês (Estados Unidos)");
    await expect
      .element(page.getByRole("combobox", { name: "Eixo de leitura" }))
      .toHaveTextContent("Vertical");

    await user.click(page.getByRole("button", { name: "Salvar" }));

    await expect
      .element(page.getByRole("alert"))
      .toHaveTextContent("Configurações salvas com sucesso.");
  });
});
