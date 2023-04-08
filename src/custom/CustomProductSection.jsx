import { Grid, Box, Paper, Typography } from "@mui/material";
import React from "react";
import SectionHeader from "../components/Home/SectionHeader";
import CustomCard from "../custom/CustomCard";

const Sidebar = ({ items }) => {
	return (
		<Paper
			elevation={1}
			sx={{
				boxSizing: "border-box",
				backgroundColor: "common.white",
				padding: "1rem",
				borderRadius: "0.5rem",
				transition: "all 250ms ease-in-out",
				minWidth: "240px",
				height: "100%",
				display: { xs: "none", md: "flex" },
				gap: "1rem",
				flexDirection: "column",
			}}
		>
			<Typography variant="h6" fontWeight="600">
				Brands
			</Typography>
			<Box
				display="flex"
				alignItems="stretch"
				flexDirection="column"
				gap="1rem"
			>
				{items?.map((item, index) => (
					<Box
						sx={{
							display: "flex",
							gap: "0.75rem",
							alignItems: "center",
						}}
						key={item._id}
					>
						<Box
							component="img"
							src={item?.brand?.imgSrc}
							width="20px"
							height="20px"
							sx={{
								objectFit: "cover",
							}}
						/>
						<Typography
							fontSize="15px"
							fontWeight="600"
							textTransform="capitalize"
						>
							{item?.brand?.name}
						</Typography>
					</Box>
				))}
			</Box>
		</Paper>
	);
};

const CustomProductSection = ({ title, sidebarItems, items }) => {
	return (
		<section style={{ margin: "4.5rem 0 0 0" }}>
			<Box display="flex" gap="2rem">
				<Sidebar items={sidebarItems} />
				<Box display="flex" flexDirection="column" width="100%">
					<SectionHeader title={title} />
					<Grid container spacing={3}>
						{items.map((item) => (
							<Grid key={item._id} item xs={12} sm={6} lg={4}>
								<CustomCard item={item} />
							</Grid>
						))}
					</Grid>
				</Box>
			</Box>
		</section>
	);
};

export default CustomProductSection;
