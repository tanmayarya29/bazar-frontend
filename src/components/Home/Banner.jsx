import { Box, Typography, Grid } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import Carousel from "react-elastic-carousel";

const CarouselDot = styled(Box)(({ theme, active }) => ({
	width: "1rem",
	height: "1rem",
	borderRadius: "100%",
	border: `1px solid ${theme.palette.secondary.main}`,
	cursor: "pointer",
	position: "relative",
	"::after": active
		? {
				content: '""',
				width: "9px",
				height: "9px",
				top: "50%",
				left: "50%",
				borderRadius: "300px",
				position: "absolute",
				transform: "translate(-50%, -50%) scaleX(1)",
				backgroundColor: `${theme.palette.secondary.main}`,
		  }
		: {},
}));

const Banner = () => {
	return (
		<Box
			sx={{
				maxWidth: "1300px",
				marginLeft: "auto",
				marginRight: "auto",
				marginBottom: "2rem",
			}}
		>
			<Carousel
				showArrows={false}
				pagination
				enableMouseSwipe
				renderPagination={({ pages, activePage, onClick }) => (
					<Box display="flex" gap="0.5rem">
						{pages.map((page) => (
							<CarouselDot
								key={page}
								onClick={() => onClick(page)}
								active={activePage === page}
							/>
						))}
					</Box>
				)}
			>
				{[1, 2].map((_, index) => (
					<Grid
						key={index}
						container
						alignItems="center"
						maxWidth="80%"
						justifyContent="center"
					>
						<Grid
							container
							item
							sm={12}
							md={6}
							padding="1.5rem 0 0 1.5rem"
							gap="1rem"
						>
							<Typography
								fontSize="2rem"
								fontWeight="700"
								color="info.main"
								sx={{
									fontSize: {
										lg: 50,
										md: 30,
										sm: 25,
										xs: 25,
									},
								}}
							>
								50% Off For Your First Shopping
							</Typography>
							<Typography fontWeight="400" color="secondary.main">
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit. Quis lobortis consequat eu,
								quam etiam at quis ut convalliss.
							</Typography>
						</Grid>
						<Grid item sm={12} md={6} padding="1.5rem 0 0 1.5rem">
							<Box
								maxWidth="100%"
								display="block"
								marginLeft="auto"
								marginRight="auto"
								component={"img"}
								src="./images/flash/flash-1.png"
							></Box>
						</Grid>
					</Grid>
				))}
			</Carousel>
		</Box>
	);
};

export default Banner;
