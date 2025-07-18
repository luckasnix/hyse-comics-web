import metaverseCavalryPanel1 from "~/storage/metaverse-cavalry-panel-1.webp";
import metaverseCavalryPanel2 from "~/storage/metaverse-cavalry-panel-2.webp";
import metaverseCavalryPanel3 from "~/storage/metaverse-cavalry-panel-3.webp";
import metaverseCavalryThumbnail from "~/storage/metaverse-cavalry-thumbnail.webp";
import type { Comic, ComicPanel } from "~/types/comics";

export const comicsMock: Array<Comic> = [
	{
		id: "hsGYfEuPQH-U",
		title: "Metaverse Cavalry",
		description:
			"In a vast medieval world set within the Metaverse, a young warrior is summoned to face a looming threat that corrupts the very fabric of this digital reality: a powerful demon bent on destruction.",
		imageUrl: metaverseCavalryThumbnail.src,
		imageAltText: "Metaverse Cavalry thumbnail",
	},
];

export const comicPanelsMock: Array<ComicPanel> = [
	{
		id: "79e80cb6-5d66-49c6-a350-f2efd013ae63",
		comicId: "hsGYfEuPQH-U",
		imageUrl: metaverseCavalryPanel1.src,
		imageWidth: metaverseCavalryPanel1.width,
		imageHeight: metaverseCavalryPanel1.height,
		imageAltText: "Metaverse Cavalry panel 1",
	},
	{
		id: "925eb9c5-fe49-44bb-8c29-2495e0e3eb4f",
		comicId: "hsGYfEuPQH-U",
		imageUrl: metaverseCavalryPanel2.src,
		imageWidth: metaverseCavalryPanel2.width,
		imageHeight: metaverseCavalryPanel2.height,
		imageAltText: "Metaverse Cavalry panel 2",
	},
	{
		id: "5616800f-ed96-4995-b802-bb0ca3bed992",
		comicId: "hsGYfEuPQH-U",
		imageUrl: metaverseCavalryPanel3.src,
		imageWidth: metaverseCavalryPanel3.width,
		imageHeight: metaverseCavalryPanel3.height,
		imageAltText: "Metaverse Cavalry panel 3",
	},
];
