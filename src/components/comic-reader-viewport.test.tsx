import { afterEach, describe, expect, it, vi } from "vitest";
import { page } from "vitest/browser";
import { cleanup, render } from "vitest-browser-react/pure";

import { ComicProvider } from "#/contexts/comic.tsx";
import { UserProvider } from "#/contexts/user.tsx";
import { chaptersMock, comicsMock, pagesMock } from "#/mocks/comics.ts";
import { signedInUserMock, usersMock } from "#/mocks/users.ts";
import type { Comic, Page } from "#/types/comics.ts";
import type { User } from "#/types/users.ts";

import { ComicReaderViewport } from "./comic-reader-viewport.tsx";

const easternComic = comicsMock[0];
const westernComic = comicsMock[1];
const chapters = chaptersMock.slice(0, 2);
const pages = pagesMock.slice(0, 3);

const carouselRefSpy = (() => {}) as unknown as ReturnType<
  typeof import("embla-carousel-react").default
>[0];

type RenderComponentOptions = {
  comic: Comic;
  user: User | null;
  pages: Array<Page>;
  isZoomEnabled: boolean;
};

const defaultRenderOptions: RenderComponentOptions = {
  comic: easternComic,
  user: signedInUserMock,
  pages,
  isZoomEnabled: false,
};

const renderReaderViewport = (
  overrides: Partial<RenderComponentOptions> = {},
) => {
  const { comic, user, pages, isZoomEnabled } = {
    ...defaultRenderOptions,
    ...overrides,
  };

  return (
    <UserProvider user={user}>
      <ComicProvider
        comic={comic}
        chapters={chapters}
        pages={pages}
        currentComicId={comic.id}
        currentChapterId={chapters[0].id}
      >
        <ComicReaderViewport
          carouselRef={carouselRefSpy}
          isZoomEnabled={isZoomEnabled}
        />
      </ComicProvider>
    </UserProvider>
  );
};

const renderComponent = (overrides: Partial<RenderComponentOptions> = {}) =>
  render(renderReaderViewport(overrides));

const getImages = () => page.getByRole("img").elements() as Array<HTMLElement>;

const hoverFirstImageAtQuarter = async () => {
  const imageLocator = page.getByRole("img").first();
  const image = imageLocator.element() as HTMLElement;
  image.style.width = "200px";
  image.style.height = "100px";
  const { width, height } = image.getBoundingClientRect();

  await imageLocator.hover({ position: { x: width / 4, y: height / 4 } });

  return {
    image,
    imageLocator,
  };
};

const movePointer = (
  target: HTMLElement,
  { clientX = 0, clientY = 0 } = {},
) => {
  target.dispatchEvent(
    new PointerEvent("pointerover", { bubbles: true, clientX, clientY }),
  );
  target.dispatchEvent(
    new PointerEvent("pointermove", { bubbles: true, clientX, clientY }),
  );
};

afterEach(async () => {
  await cleanup();
  vi.restoreAllMocks();
});

describe("<ComicReaderViewport />", () => {
  it("renders all page images", async () => {
    await renderComponent();

    const images = getImages();

    expect(images).toHaveLength(pages.length);
  });

  it("renders unique alt text with the comic title and page position", async () => {
    await renderComponent();

    const images = getImages();

    for (const [index, image] of images.entries()) {
      expect(image).toHaveAttribute(
        "alt",
        `${easternComic.title} page ${index + 1} of ${pages.length}`,
      );
    }
  });

  it("renders the correct image sources", async () => {
    await renderComponent();

    const images = getImages();

    for (const [index, image] of images.entries()) {
      expect(image).toHaveAttribute("src", pages[index].imageUrl);
    }
  });

  it("renders page images with box-safe sizing", async () => {
    await renderComponent();

    const images = getImages();

    for (const image of images) {
      expect(image).toHaveStyle({
        boxSizing: "border-box",
        maxWidth: "100%",
        maxHeight: "100%",
      });
    }
  });

  it("uses the zoom-in cursor when zoom is enabled", async () => {
    await renderComponent({ isZoomEnabled: true });

    const image = getImages()[0];
    const slideContainer = image.parentElement?.parentElement;

    expect(slideContainer).toHaveStyle({ cursor: "zoom-in" });
  });

  it("does not zoom images when zoom is disabled", async () => {
    await renderComponent({ isZoomEnabled: false });

    const image = getImages()[0];

    await movePointer(image, { clientX: 60, clientY: 45 });

    expect(image.style.transform).toBe("");
  });

  it("zooms the hovered image around the cursor position", async () => {
    await renderComponent({ isZoomEnabled: true });

    const { image, imageLocator } = await hoverFirstImageAtQuarter();

    await expect.element(imageLocator).toHaveStyle({ transform: "scale(1.4)" });
    expect(image.style.transformOrigin).toBe("25% 25%");
  });

  it("does not calculate zoom for an image without layout dimensions", async () => {
    await renderComponent({ isZoomEnabled: true });

    const image = getImages()[0];

    vi.spyOn(image, "getBoundingClientRect").mockReturnValue({
      width: 0,
      height: 0,
    } as DOMRect);

    await movePointer(image, { clientX: 60, clientY: 45 });

    expect(image.style.transform).toBe("");
  });

  it("keeps the zoom while the pointer stays inside the viewport", async () => {
    await renderComponent({ isZoomEnabled: true });

    const { image, imageLocator } = await hoverFirstImageAtQuarter();
    const pageElement = image.parentElement as HTMLElement;

    await page.elementLocator(pageElement).hover();

    await expect.element(imageLocator).toHaveStyle({ transform: "scale(1.4)" });
  });

  it("removes the zoom when the pointer leaves the viewport", async () => {
    await renderComponent({ isZoomEnabled: true });

    const { image } = await hoverFirstImageAtQuarter();
    const outsideViewport = document.body.appendChild(
      document.createElement("button"),
    );
    outsideViewport.style.position = "fixed";
    outsideViewport.style.inset = "0 auto auto 0";
    outsideViewport.style.zIndex = "9999";

    await page.elementLocator(outsideViewport).hover();

    await expect.poll(() => image.style.transform).toBe("");

    outsideViewport.remove();
  });

  it("removes the zoom when zoom is disabled", async () => {
    const { rerender } = await renderComponent({ isZoomEnabled: true });

    await hoverFirstImageAtQuarter();

    await rerender(renderReaderViewport({ isZoomEnabled: false }));

    expect(getImages()[0].style.transform).toBe("");
  });

  it("renders no images when pages are empty", async () => {
    await renderComponent({ pages: [] });

    await expect.element(page.getByRole("img")).not.toBeInTheDocument();
  });

  it("applies background texture style when page has a background texture", async () => {
    const pagesWithTexture = pagesMock.filter(
      (page) => page.backgroundTexture !== null,
    );

    await renderComponent({ pages: pagesWithTexture.slice(0, 2) });

    const images = getImages();

    for (const image of images) {
      expect(image.parentElement).toHaveStyle({
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
      });
    }
  });

  it("does not apply background texture style when page has no background texture", async () => {
    const pagesWithoutTexture = pagesMock.filter(
      (page) => page.backgroundTexture === null,
    );

    await renderComponent({ pages: pagesWithoutTexture.slice(0, 2) });

    const images = getImages();

    for (const image of images) {
      const style = image.parentElement?.style;

      expect(style?.backgroundImage).toBeFalsy();
    }
  });

  it("renders with column direction for vertical reading axis", async () => {
    await renderComponent({ user: signedInUserMock });

    const images = getImages();
    const slideContainer = images[0].parentElement?.parentElement;

    expect(slideContainer).toHaveStyle({
      flexDirection: "column",
      touchAction: "pan-x pinch-zoom",
    });
  });

  it("falls back to column direction when no user is available", async () => {
    await renderComponent({ user: null });

    const images = getImages();
    const slideContainer = images[0].parentElement?.parentElement;

    expect(slideContainer).toHaveStyle({ flexDirection: "column" });
  });

  it("renders with row direction for horizontal reading axis and western comic", async () => {
    const horizontalUser = usersMock[2];

    await renderComponent({ user: horizontalUser, comic: westernComic });

    const images = getImages();
    const slideContainer = images[0].parentElement?.parentElement;

    expect(slideContainer).toHaveStyle({
      flexDirection: "row",
      touchAction: "pan-y pinch-zoom",
    });
  });

  it("renders with row-reverse direction for horizontal reading axis and eastern comic", async () => {
    const horizontalUser = usersMock[2];

    await renderComponent({ user: horizontalUser, comic: easternComic });

    const images = getImages();
    const slideContainer = images[0].parentElement?.parentElement;

    expect(slideContainer).toHaveStyle({
      flexDirection: "row-reverse",
      touchAction: "pan-y pinch-zoom",
    });
  });
});
