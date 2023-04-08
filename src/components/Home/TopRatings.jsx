import { Card, CardContent, Grid, Rating, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import CustomImage from "../../custom/CustomImage";
import SectionHeader from "./SectionHeader";
import axios from "axios";
import { Link } from "react-router-dom";

const TopRatings = () => {
	const [topRatingItems, setTopratingItems] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get(
				process.env.REACT_APP_BACKEND_URL +
					"/shop/product?type=top-ratings"
			);
			setTopratingItems(result.data);
		};
		fetchData();
	}, []);

	return (
		<section className="top-ratings" style={{ margin: "3rem 0 0 0" }}>
			<SectionHeader title={"Top Ratings"} />
			<Box
				borderRadius="1rem"
				padding="1rem"
				backgroundColor="common.white"
			>
				<Grid container spacing={2}>
					{topRatingItems.map((item) => (
						<Grid
							key={item._id}
							xs={6}
							md={3}
							item
							sx={{ fontWeight: "600" }}
						>
							<Link to={`/product/${item._id}`}>
								<Card
									sx={{
										display: "flex",
										alignItems: "center",
										flexDirection: "column",
										justifyContent: "center",
										borderRadius: "0.5rem",
										boxShadow: "0",
									}}
								>
									<CustomImage src={item.imgSrc} />
									<CardContent
										sx={{
											display: "flex",
											alignItems: "center",
											flexDirection: "column",
											gap: "0.35rem",
										}}
									>
										<Box
											display="flex"
											alignItems="center"
											gap="0.25rem"
										>
											<Rating
												value={item.rating}
												readOnly
												size="small"
											/>
											<Typography
												variant="span"
												fontSize="12px"
											>
												({item.reviews})
											</Typography>
										</Box>
										<Typography variant="span">
											{item.name}
										</Typography>
										<Typography
											color="error"
											variant="span"
										>
											${item.originalPrice}
										</Typography>
									</CardContent>
								</Card>
							</Link>
						</Grid>
					))}
				</Grid>
			</Box>
		</section>
	);
};

export default TopRatings;
