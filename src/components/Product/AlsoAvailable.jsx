import { Box, Typography, Grid, Avatar, Paper } from "@mui/material";
import React from "react";

const items = [{ id: 1 }, { id: 2 }, { id: 3 }];

const AlsoAvailableItem = () => {
	return (
		<Paper
			elevation={1}
			sx={{
				borderRadius: "0.5rem",
				padding: "1.5rem",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: "0.5rem",
			}}
		>
			<Avatar
				src="https://bazar-react.vercel.app/assets/images/faces/propic.png"
				sx={{ width: "3rem", height: "3rem" }}
			/>
			<Typography fontSize="17px" fontWeight="600">
				Tech Friend
			</Typography>
		</Paper>
	);
};

const AlsoAvailable = () => {
	return (
		<Box marginTop="3rem">
			<Typography fontSize="20px" fontWeight="700" marginBottom="1.5rem">
				Also Available at
			</Typography>
			<Grid container spacing={3}>
				{items.map((item) => (
					<Grid key={item.id} item xs={12} sm={4} md={3} lg={2}>
						<AlsoAvailableItem />
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default AlsoAvailable;
