import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export type ComicCardProps = Readonly<{
	id: string;
	title: string;
	description: string;
	image: {
		src: string;
		altText: string;
	};
	onReadButtonClick: (id: string) => void;
}>;

export const ComicCard = ({
	id,
	title,
	description,
	image,
	onReadButtonClick,
}: ComicCardProps) => (
	<Card sx={{ width: 320 }}>
		<CardMedia
			sx={{ width: 320, height: 240 }}
			image={image.src}
			title={image.altText}
		/>
		<CardContent>
			<Typography gutterBottom variant="h5">
				{title}
			</Typography>
			<Typography variant="body2" sx={{ color: "text.secondary" }}>
				{description}
			</Typography>
		</CardContent>
		<CardActions>
			<Button
				size="small"
				onClick={() => {
					onReadButtonClick(id);
				}}
			>
				Read
			</Button>
		</CardActions>
	</Card>
);
