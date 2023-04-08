import { Typography, Box } from "@mui/material";
import React from "react";
import CustomCard from "../../custom/CustomCard";
import CustomCarousel from "../../custom/CustomCarousel";

const products = [
	{
		id: 1,
		discount: "25",
		title: "Catch Italian Seasoning Grinder",
		discountedPrice: "225.00",
		originalPrice: "250.00",
		imgSrc: "https://bazar-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2FGroceries%2F10.CatchItalianSeasoningGrinder.png&w=3840&q=75",
		rating: 4,
	},
	{
		id: 2,
		discount: "25",
		title: "Catch Italian Seasoning Grinder",
		discountedPrice: "225.00",
		originalPrice: "250.00",
		imgSrc: "https://bazar-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2FGroceries%2F10.CatchItalianSeasoningGrinder.png&w=3840&q=75",
		rating: 4,
	},
	{
		id: 3,
		discount: "25",
		title: "Catch Italian Seasoning Grinder",
		discountedPrice: "225.00",
		originalPrice: "250.00",
		imgSrc: "https://bazar-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2FGroceries%2F10.CatchItalianSeasoningGrinder.png&w=3840&q=75",
		rating: 4,
	},
	{
		id: 4,
		discount: "25",
		title: "Catch Italian Seasoning Grinder",
		discountedPrice: "225.00",
		originalPrice: "250.00",
		imgSrc: "https://bazar-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2FGroceries%2F10.CatchItalianSeasoningGrinder.png&w=3840&q=75",
		rating: 4,
	},
];

const breakPoints = [
	{
		width: 1,
		itemsToShow: 1,
	},
	{
		width: 450,
		itemsToShow: 2,
	},
	{
		width: 650,
		itemsToShow: 3,
	},
	{
		width: 950,
		itemsToShow: 4,
	},
	{
		width: 1300,
		itemsToShow: 5,
	},
];

const RelatedProducts = () => {
	return (
		<>
			<Typography
				fontSize="20px"
				fontWeight="700"
				marginBottom="1.5rem"
				marginTop="3rem"
			>
				Related Products
			</Typography>
			<Box position="relative">
				<CustomCarousel items={products} breakPoints={breakPoints}>
					<CustomCard />
				</CustomCarousel>
			</Box>

			{/* <Grid container spacing={3}>
				{products.map((product) => (
					<Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
						<CustomCard item={product} />
					</Grid>
				))}
			</Grid> */}
		</>
	);
};

export default RelatedProducts;
