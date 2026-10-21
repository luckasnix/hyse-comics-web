import Box from "@mui/material/Box";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { page } from "vitest/browser";
import { cleanup, render } from "vitest-browser-react/pure";

import { imageDimensions } from "#/constants/common.ts";
import { UiProvider } from "#/contexts/ui.tsx";
import { advertisementsMock } from "#/mocks/advertisements.ts";
import { AdvertisementsSection } from "#/sections/advertisements-section.tsx";
import type {
  Advertisement,
  AdvertisementCtaPosition,
} from "#/types/advertisements.ts";

import { i18n } from "../../vitest.setup.ts";

const createImage = (width: number, height: number) =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="100%" height="100%" fill="#33658a"/></svg>`)}`;

const advertisements = advertisementsMock.map((advertisement) => ({
  ...advertisement,
  imageUrl: createImage(1704, 426),
}));

const renderComponent = (
  items: Array<Advertisement> = advertisements,
  width = 1000,
) =>
  render(
    <UiProvider>
      <Box sx={{ width, maxWidth: "100%" }}>
        <AdvertisementsSection advertisements={items} />
      </Box>
    </UiProvider>,
  );

const getActiveSlide = () => page.getByRole("group");

const dragImage = async (direction: "previous" | "next") => {
  const image = getActiveSlide()
    .element()
    .querySelector("img") as HTMLImageElement;
  const { left, top, width, height } = image.getBoundingClientRect();
  const startX = left + width / 2;
  const endX = startX + width * (direction === "previous" ? 0.75 : -0.75);
  const clientY = top + height / 2;

  image.dispatchEvent(
    new MouseEvent("mousedown", {
      bubbles: true,
      button: 0,
      clientX: startX,
      clientY,
    }),
  );
  document.dispatchEvent(
    new MouseEvent("mousemove", {
      bubbles: true,
      buttons: 1,
      clientX: endX,
      clientY,
    }),
  );
  document.dispatchEvent(
    new MouseEvent("mouseup", {
      bubbles: true,
      button: 0,
      clientX: endX,
      clientY,
    }),
  );

  await expect
    .poll(() => {
      const slide = getActiveSlide().element();
      const viewport = page.getByRole("region").element();
      return Math.abs(
        slide.getBoundingClientRect().left -
          viewport.getBoundingClientRect().left,
      );
    })
    .toBeLessThan(1);
};

beforeEach(async () => {
  await page.viewport(1280, 800);
  await i18n.changeLanguage("en-US");
});

afterEach(async () => {
  await cleanup();
  vi.useRealTimers();
  await i18n.changeLanguage("en-US");
});

describe("<AdvertisementShelf />", () => {
  it("omits the section when there are no advertisements", async () => {
    const { container } = await renderComponent([]);

    expect(container.querySelector("section")).toBeNull();
    await expect.element(page.getByRole("region")).not.toBeInTheDocument();
  });

  it("renders the API images and external CTAs in order", async () => {
    const { container } = await renderComponent();
    const images = container.querySelectorAll("img");
    const links = container.querySelectorAll("a");

    expect(images).toHaveLength(advertisements.length);
    expect(links).toHaveLength(advertisements.length);
    await expect.element(page.getByRole("button")).not.toBeInTheDocument();

    for (const [index, advertisement] of advertisements.entries()) {
      expect(images[index]).toHaveAttribute("src", advertisement.imageUrl);
      expect(links[index]).toHaveTextContent(advertisement.cta.label);
      expect(links[index]).toHaveAttribute("href", advertisement.cta.url);
      expect(links[index]).toHaveAttribute("target", "_blank");
      expect(links[index]).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("keeps inactive slides out of keyboard and screen reader navigation", async () => {
    const { container } = await renderComponent();
    const slides = container.querySelectorAll<HTMLElement>("[role=group]");

    expect(slides[0].inert).toBe(false);
    expect(slides[1].inert).toBe(true);
    expect(slides[1]).toHaveAttribute("aria-hidden", "true");

    await dragImage("next");

    await expect
      .element(getActiveSlide().getByRole("link"))
      .toHaveAttribute("href", advertisements[1].cta.url);
    expect(slides[0].inert).toBe(true);
    expect(slides[1].inert).toBe(false);
  });

  it("wraps in both directions with the two mock advertisements and real Embla", async () => {
    await renderComponent();

    await dragImage("previous");
    await expect
      .element(getActiveSlide().getByRole("link"))
      .toHaveAttribute("href", advertisements[1].cta.url);

    await dragImage("next");
    await expect
      .element(getActiveSlide().getByRole("link"))
      .toHaveAttribute("href", advertisements[0].cta.url);
  });

  it("renders a single advertisement without navigation or autoplay", async () => {
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout", "Date"] });
    const timer = vi.spyOn(window, "setTimeout");
    await renderComponent([advertisements[0]]);

    await expect.element(page.getByRole("button")).not.toBeInTheDocument();
    await expect
      .element(page.getByRole("link", { name: advertisements[0].cta.label }))
      .toBeInTheDocument();
    expect(timer.mock.calls.some(([, delay]) => delay === 5000)).toBe(false);
  });

  it.each([
    ["top-left", 0, 0],
    ["top-center", 0.5, 0],
    ["top-right", 1, 0],
    ["center-left", 0, 0.5],
    ["center", 0.5, 0.5],
    ["center-right", 1, 0.5],
    ["bottom-left", 0, 1],
    ["bottom-center", 0.5, 1],
    ["bottom-right", 1, 1],
  ] satisfies Array<[AdvertisementCtaPosition, number, number]>)(
    "positions the CTA at %s inside the banner",
    async (ctaPosition, horizontal, vertical) => {
      await renderComponent([
        {
          ...advertisements[0],
          cta: { ...advertisements[0].cta, position: ctaPosition },
        },
      ]);
      const slide = getActiveSlide().element().getBoundingClientRect();
      const cta = page
        .getByRole("link", { name: advertisements[0].cta.label })
        .element()
        .getBoundingClientRect();

      expect(cta.left - slide.left).toBeCloseTo(
        16 + horizontal * (slide.width - 32 - cta.width),
        0,
      );
      expect(cta.top - slide.top).toBeCloseTo(
        16 + vertical * (slide.height - 32 - cta.height),
        0,
      );
    },
  );

  it.each([
    ["light", "rgb(255, 255, 255)", "rgb(0, 0, 0)", "rgb(238, 238, 238)"],
    ["dark", "rgb(0, 0, 0)", "rgb(255, 255, 255)", "rgb(34, 34, 34)"],
  ] as const)(
    "renders the %s CTA tone with contrasting hover colors",
    async (ctaTone, backgroundColor, color, hoverColor) => {
      await renderComponent([
        {
          ...advertisements[0],
          cta: { ...advertisements[0].cta, tone: ctaTone },
        },
      ]);
      const cta = page.getByRole("link", { name: advertisements[0].cta.label });

      await expect.element(cta).toHaveStyle({ backgroundColor, color });
      await cta.hover();
      await expect
        .element(cta)
        .toHaveStyle({ backgroundColor: hoverColor, color });
    },
  );

  it.each(["en-US", "pt-BR"])(
    "renders the API CTA label in %s",
    async (locale) => {
      await i18n.changeLanguage(locale);
      const label = "Conheça o projeto";
      await renderComponent([
        { ...advertisements[0], cta: { ...advertisements[0].cta, label } },
      ]);
      await expect
        .element(page.getByRole("link", { name: label }))
        .toBeInTheDocument();
    },
  );

  describe("autoplay with real Embla", () => {
    beforeEach(() => {
      vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout", "Date"] });
    });

    it("advances every five seconds, loops and does not stop on hover", async () => {
      await renderComponent();
      getActiveSlide()
        .element()
        .parentElement?.parentElement?.dispatchEvent(
          new MouseEvent("mouseenter"),
        );

      await vi.advanceTimersByTimeAsync(4999);
      expect(getActiveSlide().getByRole("link").element()).toHaveAttribute(
        "href",
        advertisements[0].cta.url,
      );

      await vi.advanceTimersByTimeAsync(1);
      expect(getActiveSlide().getByRole("link").element()).toHaveAttribute(
        "href",
        advertisements[1].cta.url,
      );

      await vi.advanceTimersByTimeAsync(5000);
      expect(getActiveSlide().getByRole("link").element()).toHaveAttribute(
        "href",
        advertisements[0].cta.url,
      );
    });

    it("stops after keyboard focus on the CTA, following plugin defaults", async () => {
      await renderComponent();
      const cta = page
        .getByRole("link", { name: advertisements[0].cta.label })
        .element() as HTMLElement;
      document.dispatchEvent(new KeyboardEvent("keydown", { code: "Tab" }));
      cta.focus();
      cta.blur();

      await vi.advanceTimersByTimeAsync(15000);

      expect(getActiveSlide().getByRole("link").element()).toHaveAttribute(
        "href",
        advertisements[0].cta.url,
      );
    });

    it("stops after pointer interaction, following plugin defaults", async () => {
      await renderComponent();
      const image = getActiveSlide()
        .element()
        .querySelector("img") as HTMLImageElement;
      image.dispatchEvent(
        new MouseEvent("mousedown", { bubbles: true, button: 0, clientX: 200 }),
      );
      document.dispatchEvent(
        new MouseEvent("mouseup", { bubbles: true, button: 0, clientX: 200 }),
      );

      await vi.advanceTimersByTimeAsync(15000);

      expect(getActiveSlide().getByRole("link").element()).toHaveAttribute(
        "href",
        advertisements[0].cta.url,
      );
    });

    it("cleans up the five-second timer on unmount", async () => {
      const { unmount } = await renderComponent();
      await vi.advanceTimersByTimeAsync(1);

      expect(vi.getTimerCount()).toBe(1);
      await unmount();
      expect(vi.getTimerCount()).toBe(0);
    });
  });

  describe.each([
    [1280, 1000, 1704, 426],
    [1280, 1000, 600, 1200],
    [375, 343, 1704, 426],
    [320, 288, 2400, 600],
  ])("layout at viewport %ipx", (viewport, width, imageWidth, imageHeight) => {
    it("contains oversized and differently proportioned images without overflow", async () => {
      await page.viewport(viewport, 800);
      await renderComponent(
        advertisements.map((advertisement) => ({
          ...advertisement,
          imageUrl: createImage(imageWidth, imageHeight),
        })),
        width,
      );
      const image = getActiveSlide().getByRole("img");
      const imageElement = image.element() as HTMLImageElement;
      await expect.poll(() => imageElement.naturalWidth).toBe(imageWidth);
      const bounds = imageElement.getBoundingClientRect();
      const cta = page
        .getByRole("link", { name: advertisements[0].cta.label })
        .element()
        .getBoundingClientRect();

      expect(bounds.width).toBeGreaterThan(0);
      expect(bounds.width).toBe(
        Math.min(width, imageDimensions.advertising.width),
      );
      expect(bounds.width).toBeLessThanOrEqual(
        imageDimensions.advertising.width,
      );
      expect(bounds.height).toBeLessThanOrEqual(
        imageDimensions.advertising.height,
      );
      expect(bounds.width / bounds.height).toBeCloseTo(4, 1);
      await expect.element(image).toHaveStyle({ objectFit: "contain" });
      await expect.element(page.getByRole("region")).toHaveStyle({
        borderRadius: "8px",
        overflow: "hidden",
      });
      await expect.element(getActiveSlide()).toHaveStyle({
        borderRadius: "8px",
        overflow: "hidden",
      });
      expect(cta.left).toBeGreaterThanOrEqual(bounds.left);
      expect(cta.right).toBeLessThanOrEqual(bounds.right);
      expect(cta.top).toBeGreaterThanOrEqual(bounds.top);
      expect(cta.bottom).toBeLessThanOrEqual(bounds.bottom);
      expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(
        viewport,
      );
    });
  });
});
