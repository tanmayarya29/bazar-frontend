import { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/system";
import BoltIcon from "@mui/icons-material/Bolt";
import React from "react";
import CustomCarousel from "../../custom/CustomCarousel";
import SectionHeader from "./SectionHeader";
import CustomCard from "../../custom/CustomCard";

// const carouselItems = [
// 	{
// 		id: 1,
// 		chipLabel: "25% off",
// 		title: "NikeCourt Zoom Vapor Cage",
// 		offerPrice: "187.50",
// 		originalPrice: "250.00",
// 		imageSrc: "./images/flash/flash-1.png",
// 		rating: 4,
// 	},
// 	{
// 		id: 2,
// 		chipLabel: "15% off",
// 		title: "Classic Rolex Watch",
// 		offerPrice: "297.50",
// 		originalPrice: "350.00",
// 		imageSrc: "./images/flash/flash-2.png",
// 		rating: 3,
// 	},
// 	{
// 		id: 3,
// 		chipLabel: "28% off",
// 		title: "IPhone 13 Pro Max",
// 		offerPrice: "108.00",
// 		originalPrice: "150.00",
// 		imageSrc: "./images/flash/flash-3.png",
// 		rating: 5,
// 	},
// 	{
// 		id: 4,
// 		chipLabel: "21% off",
// 		title: "Mi Led Smart Watch",
// 		offerPrice: "142.20",
// 		originalPrice: "180.00",
// 		imageSrc: "./images/flash/flash-4.png",
// 		rating: 4,
// 	},
// 	{
// 		id: 5,
// 		chipLabel: "25% off",
// 		title: "NikeCourt Zoom Vapor Cage",
// 		offerPrice: "187.50",
// 		originalPrice: "250.00",
// 		imageSrc: "./images/flash/flash-1.png",
// 		rating: 4,
// 	},
// 	{
// 		id: 6,
// 		chipLabel: "15% off",
// 		title: "Classic Rolex Watch",
// 		offerPrice: "297.50",
// 		originalPrice: "350.00",
// 		imageSrc: "./images/flash/flash-2.png",
// 		rating: 3,
// 	},
// 	{
// 		id: 7,
// 		chipLabel: "28% off",
// 		title: "IPhone 13 Pro Max",
// 		offerPrice: "108.00",
// 		originalPrice: "150.00",
// 		imageSrc: "./images/flash/flash-3.png",
// 		rating: 5,
// 	},
// 	{
// 		id: 8,
// 		chipLabel: "21% off",
// 		title: "Mi Led Smart Watch",
// 		offerPrice: "142.20",
// 		originalPrice: "180.00",
// 		imageSrc: "./images/flash/flash-4.png",
// 		rating: 4,
// 	},
// ];

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

const FlashDeals = () => {
	const [carouselItems, setCarouselItems] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get(
				process.env.REACT_APP_BACKEND_URL +
					"/shop/product?type=flash-deals"
			);
			setCarouselItems(result.data);
		};

		fetchData();
	}, []);
	return (
		<section className="flash-deals" style={{ margin: "3rem 0 0 0" }}>
			<SectionHeader title="Flash Deals" Icon={BoltIcon} />
			<Box position="relative">
				<CustomCarousel items={carouselItems} breakPoints={breakPoints}>
					<CustomCard />
				</CustomCarousel>
			</Box>
		</section>
	);
};

export default FlashDeals;
