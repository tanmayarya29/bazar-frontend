import { Typography, Box, Paper, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import CustomImage from "../../custom/CustomImage";

const FrequentlyBoughtProduct = () => {
	return (
		<Paper
			elevation={1}
			sx={{
				padding: "1rem",
				maxWidth: { xs: "100%", sm: "220px" },
				boxSizing: "border-box",
				flex: "1 1 0",
				minWidth: "160px",
			}}
		>
			<Link
				to={`/product`}
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "0.25rem",
				}}
			>
				<CustomImage src="https://bazar-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2FGroceries%2F2.PremiumGroceryCollection.png&w=3840&q=75" />
				<Typography color="info.main" noWrap>
					Premium Grocery Collection
				</Typography>
				<Box display="flex" alignItems="center" gap="0.25rem">
					<Typography fontWeight="600" color="error">
						$250
					</Typography>
					<Typography fontWeight="600" sx={{ color: "#7D879C" }}>
						<s>$1600</s>
					</Typography>
				</Box>
			</Link>
		</Paper>
	);
};

const FrequentlyBought = () => {
	return (
		<Box
			sx={{ marginTop: "3rem" }}
			display="flex"
			flexDirection="column"
			gap="1rem"
		>
			<Typography fontSize="20px" fontWeight="700">
				Frequently Bought Together
			</Typography>
			<Box display="flex" flexWrap="wrap" alignItems="center" gap="1rem">
				<FrequentlyBoughtProduct />
				<Box fontSize="25px" fontWeight="700" color="#7D879C">
					+
				</Box>
				<FrequentlyBoughtProduct />
				<Box fontSize="25px" fontWeight="700" color="#7D879C">
					+
				</Box>
				<FrequentlyBoughtProduct />
				<Box fontSize="25px" fontWeight="700" color="#7D879C">
					+
				</Box>
				<FrequentlyBoughtProduct />
				<Box fontSize="25px" fontWeight="700" color="#7D879C">
					=
				</Box>
				<Box
					display="flex"
					alignItems="center"
					justifyContent="center"
					flexDirection="column"
					minWidth="300px"
					minHeight="200px"
					border="1px solid #DAE1E7"
				>
					<Typography fontWeight="700" fontSize="20px" color="error">
						$2500
					</Typography>
					<Typography marginBottom="1rem" color="#7D879C">
						Save $500
					</Typography>
					<Box>
						<Button
							sx={{ marginRight: "1rem" }}
							variant="contained"
							color="error"
						>
							Add To Cart
						</Button>
						<Button variant="outlined" color="error">
							Add To List
						</Button>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default FrequentlyBought;
