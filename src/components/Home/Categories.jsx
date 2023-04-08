import { Category } from "@mui/icons-material";
import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import SectionHeader from "./SectionHeader";

const categoryItems = [
	"Automobile",
	"Car",
	"Fashion",
	"Mobile",
	"Automobile",
	"Car",
	"Fashion",
	"Mobile",
	"Automobile",
	"Car",
	"Fashion",
	"Mobile",
];

const Categories = () => {
	return (
		<section style={{ margin: "4.5rem 0 0 0" }}>
			<SectionHeader title="Categories" Icon={Category} />
			<Box position="relative">
				<Grid container spacing={3}>
					{categoryItems.map((item, index) => (
						<Grid
							key={index}
							index={index}
							item
							xs={12}
							sm={4}
							md={3}
							lg={2}
						>
							<Paper
								elevation={1}
								sx={{
									padding: "0.75rem",
									display: "flex",
									gap: "10px",
									alignItems: "center",
									color: "info.main",
									borderRadius: "0.5rem",
									transition: "all 250ms ease-in-out",
									":hover": {
										boxShadow: 2,
									},
								}}
							>
								<Box
									component="img"
									src="./images/7.png"
									width="3.25rem"
									height="3.25rem"
								/>
								<Typography fontWeight={600}>{item}</Typography>
							</Paper>
						</Grid>
					))}
				</Grid>
			</Box>
		</section>
	);
};

export default Categories;
