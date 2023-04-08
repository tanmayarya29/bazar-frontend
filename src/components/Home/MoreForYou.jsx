import { Box, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomCard from "../../custom/CustomCard";
import SectionHeader from "./SectionHeader";

const MoreForYou = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		axios
			.get(
				process.env.REACT_APP_BACKEND_URL +
					"/shop/products/more-for-you"
			)
			.then((res) => setProducts(res.data.products))
			.catch((err) => console.log(err));
	}, []);

	return (
		<section style={{ margin: "4.5rem 0 0 0" }}>
			<SectionHeader title="More For You" />
			<Box position="relative">
				<Grid container spacing={3}>
					{products.map((item, index) => (
						<Grid
							key={index}
							index={index}
							item
							xs={12}
							sm={6}
							md={4}
							lg={3}
						>
							<CustomCard item={item} />
						</Grid>
					))}
				</Grid>
			</Box>
		</section>
	);
};

export default MoreForYou;
