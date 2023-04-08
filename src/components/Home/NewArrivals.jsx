import { Card, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import CustomImage from "../../custom/CustomImage";
import SectionHeader from "./SectionHeader";
import axios from "axios";
import { Link } from "react-router-dom";

const NewArrivals = () => {
	const [newArrivals, setNewArrivals] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get(
				process.env.REACT_APP_BACKEND_URL +
					"/shop/product?type=new-arrivals"
			);
			setNewArrivals(result.data);
		};

		fetchData();
	}, []);

	return (
		<section style={{ margin: "4.5rem 0 0 0" }}>
			<SectionHeader title="New Arrivals" />
			<Box padding="1rem" backgroundColor="common.white">
				<Grid container spacing={3}>
					{newArrivals.map((item, index) => (
						<Grid
							key={item._id}
							item
							xs={6}
							sm={4}
							md={3}
							lg={2}
							sx={{
								fontWeight: "600",
							}}
						>
							<Link to={`/product/${item._id}`}>
								<Card
									sx={{
										display: "flex",
										flexDirection: "column",
										gap: "0.5rem",
										boxShadow: "0",
									}}
								>
									<CustomImage src={item.imgSrc} />
									<Typography variant="span">
										{item.name}
									</Typography>
									<Typography color="error" variant="span">
										${item.originalPrice}
									</Typography>
								</Card>
							</Link>
						</Grid>
					))}
				</Grid>
			</Box>
		</section>
	);
};

export default NewArrivals;
