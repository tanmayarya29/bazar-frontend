import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import React from "react";
import SupportAgentSharpIcon from "@mui/icons-material/SupportAgentSharp";

const servicesItems = [
	{
		id: 1,
		title: "Worldwide Delivery",
		description:
			"We offer competitive prices on our 100 million plus product any range.",
	},
	{
		id: 2,
		title: "Safe Payment",
		description:
			"We offer competitive prices on our 100 million plus product any range.",
	},
	{
		id: 3,
		title: "Shop With Confidence",
		description:
			"We offer competitive prices on our 100 million plus product any range.",
	},
	{
		id: 4,
		title: "24/7 Support",
		description:
			"We offer competitive prices on our 100 million plus product any range.",
	},
];

const Service = ({ item }) => {
	return (
		<Grid item xs={12} md={6} lg={3}>
			<Paper
				sx={{
					padding: "3rem",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: "0.5rem",
					borderRadius: "0.5rem",
					":hover": {
						boxShadow: 2,
					},
				}}
			>
				<IconButton
					sx={{
						width: "4rem",
						height: "4rem",
						marginBottom: "1rem",
						backgroundColor: "grey.100",
					}}
				>
					<SupportAgentSharpIcon fontSize="large" />
				</IconButton>
				<Typography fontWeight={600} fontSize="17px" color="info.main">
					{item.title}
				</Typography>
				<Typography textAlign="center" color="#7D879C">
					{item.description}
				</Typography>
			</Paper>
		</Grid>
	);
};

const Services = () => {
	return (
		<Box marginTop="4rem" marginBottom="3rem">
			<Grid container spacing={3}>
				{servicesItems.map((item) => (
					<Service key={item.id} item={item} />
				))}
			</Grid>
		</Box>
	);
};

export default Services;
