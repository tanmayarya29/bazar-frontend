import { Box, Chip } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import React, { useEffect, useState } from "react";
import CustomCarousel from "../../custom/CustomCarousel";
import SectionHeader from "./SectionHeader";
import CustomImage from "../../custom/CustomImage";
import axios from "axios";
import { Link } from "react-router-dom";

const TopCategoryCarouselItem = ({ item }) => {
	return (
		<Box
			padding="1rem"
			backgroundColor="common.white"
			borderRadius="0.5rem"
		>
			<Box position="relative">
				<Link to="/search/category/fashion">
					<CustomImage src={item.imgSrc} />
				</Link>
				<Box
					display="flex"
					justifyContent="space-around"
					sx={{
						position: "absolute",
						top: "1rem",
						width: "100%",
						zIndex: 10,
					}}
				>
					<Chip
						size="small"
						color="secondary"
						sx={{ fontSize: "10px", fontWeight: "600" }}
						label={item.name}
					/>
					<Chip
						size="small"
						sx={{ fontSize: "10px", fontWeight: "600" }}
						label="3k orders this week"
					/>
				</Box>
			</Box>
		</Box>
	);
};

const breakPoints = [
	{
		width: 1,
		itemsToShow: 1,
	},
	{
		width: 650,
		itemsToShow: 2,
	},
	{
		width: 950,
		itemsToShow: 3,
	},
	{ width: 1300, itemsToShow: 4 },
];

const TopCategories = () => {
	const [topCategoryItems, setTopCategoryItems] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get(
				process.env.REACT_APP_BACKEND_URL +
					"/shop/product?type=top-categories"
			);
			setTopCategoryItems(result.data);
		};
		fetchData();
	}, []);

	return (
		<section className="flash-deals" style={{ margin: "4.5rem 0 0 0" }}>
			<SectionHeader title="Top Categories" Icon={CategoryIcon} />
			<Box position="relative">
				<CustomCarousel
					items={topCategoryItems}
					breakPoints={breakPoints}
				>
					<TopCategoryCarouselItem />
				</CustomCarousel>
			</Box>
		</section>
	);
};

export default TopCategories;
