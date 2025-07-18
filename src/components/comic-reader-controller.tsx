import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";

const containerStyle: SxProps<Theme> = {
	height: "64px",
	bgcolor: "primary.main",
	justifyContent: "center",
	alignItems: "center",
};

const iconButtonStyle: SxProps<Theme> = {
	color: "primary.contrastText",
};

export type ComicReaderControllerProps = Readonly<{
	isPrevButtonDisabled: boolean;
	isNextButtonDisabled: boolean;
	onPrevButtonClick: () => void;
	onNextButtonClick: () => void;
	isFullscreen: boolean;
	onEnterFullscreen: () => void;
	onExitFullscreen: () => void;
}>;

export const ComicReaderController = ({
	isPrevButtonDisabled,
	isNextButtonDisabled,
	onPrevButtonClick,
	onNextButtonClick,
	isFullscreen,
	onEnterFullscreen,
	onExitFullscreen,
}: ComicReaderControllerProps) => (
	<Stack direction="row" spacing={2} sx={containerStyle}>
		<Tooltip title="Previous panel">
			<Box component="span">
				<IconButton
					sx={iconButtonStyle}
					disabled={isPrevButtonDisabled}
					onClick={onPrevButtonClick}
				>
					<ArrowBackIcon />
				</IconButton>
			</Box>
		</Tooltip>
		<Tooltip title="Next panel">
			<Box component="span">
				<IconButton
					sx={iconButtonStyle}
					disabled={isNextButtonDisabled}
					onClick={onNextButtonClick}
				>
					<ArrowForwardIcon />
				</IconButton>
			</Box>
		</Tooltip>
		{isFullscreen ? (
			<Tooltip title="Exit fullscreen">
				<Box component="span">
					<IconButton sx={iconButtonStyle} onClick={onExitFullscreen}>
						<FullscreenExitIcon />
					</IconButton>
				</Box>
			</Tooltip>
		) : (
			<Tooltip title="Enter fullscreen">
				<Box component="span">
					<IconButton sx={iconButtonStyle} onClick={onEnterFullscreen}>
						<FullscreenIcon />
					</IconButton>
				</Box>
			</Tooltip>
		)}
	</Stack>
);
