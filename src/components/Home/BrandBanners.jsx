import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const BrandBanners = () => {
	return (
		<section style={{ marginTop: "4.5rem" }}>
			<Grid container spacing={3}>
				<Grid item sm={12} md={4}>
					<Box
						component="img"
						width="100%"
						src="./images/banners/banner-1.png"
					/>
				</Grid>
				<Grid item sm={12} md={8}>
					<Box
						component="img"
						width="100%"
						src="./images/banners/banner-2.png"
					/>
				</Grid>
			</Grid>
		</section>
	);
};

export default BrandBanners;
