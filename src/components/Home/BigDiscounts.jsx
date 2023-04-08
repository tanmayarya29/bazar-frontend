import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import CustomCarousel from "../../custom/CustomCarousel";
import CustomImage from "../../custom/CustomImage";
import SectionHeader from "./SectionHeader";
import axios from "axios";
import { Link } from "react-router-dom";

const BigDiscountsCarouselItem = ({ item }) => {
	return (
		<Link to={`/product/${item._id}`}>
			<Box
				padding="1rem"
				backgroundColor="common.white"
				borderRadius="0.5rem"
				gap="0.5rem"
				display="flex"
				flexDirection="column"
				key={item._id}
			>
				<CustomImage src={item.imgSrc} />
				<Typography
					fontWeight="600"
					sx={{
						color: "#4B566B",
					}}
				>
					{item.name}
				</Typography>
				<Box display="flex" gap="0.5rem" alignItems="center">
					<Typography fontWeight="600" color="error">
						$
						{item.originalPrice -
							(item.discount * item.originalPrice) / 100}
					</Typography>
					<Typography fontWeight="600" color="#7D879C">
						<s>${item.originalPrice}</s>
					</Typography>
				</Box>
			</Box>
		</Link>
	);
};

const breakPoints = [
	{
		width: 1,
		itemsToShow: 2,
	},
	{
		width: 650,
		itemsToShow: 4,
	},
	{
		width: 950,
		itemsToShow: 6,
	},
];

const BigDiscounts = () => {
	const [bigDiscounts, setBigDiscounts] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get(
				process.env.REACT_APP_BACKEND_URL +
					"/shop/product?type=big-discounts"
			);
			setBigDiscounts(result.data);
		};

		fetchData();
	}, []);

	return (
		<section style={{ margin: "4.5rem 0 0 0" }}>
			<SectionHeader title="Big Discounts" />
			<Box position="relative">
				<CustomCarousel items={bigDiscounts} breakPoints={breakPoints}>
					<BigDiscountsCarouselItem />
				</CustomCarousel>
			</Box>
		</section>
	);
};

export default BigDiscounts;
