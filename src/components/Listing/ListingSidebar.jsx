import {
	Box,
	Checkbox,
	Divider,
	FormControl,
	FormControlLabel,
	Paper,
	Rating,
	TextField,
	Typography,
} from "@mui/material";
import React from "react";
import { useSearchParams } from "react-router-dom";
import CustomDropdown from "../../custom/CustomDropdown";

const ListingPageSidebar = ({
	from,
	to,
	productsData,
	handleBrandsChange,
	handleRatingChange,
	setIsCategoryClicked,
	// setCategory,
	// setSubCategory,
	sx,
}) => {
	const [searchParams, setSearchParams] = useSearchParams();

	return (
		<Paper
			elevation={1}
			sx={{
				width: "25%",
				padding: "18px 27px",
				display: "flex",
				flexDirection: "column",
				gap: "0.5rem",
				height: "100%",
				...sx,
			}}
		>
			<Box display="flex" flexDirection="column">
				<Typography variant="h6" marginBottom="1rem">
					Categories
				</Typography>
				<Box display="flex" flexDirection="column" gap="0.5rem">
					{productsData?.categories?.map((category) => (
						<React.Fragment key={category?._id}>
							{category.subCategory.length > 0 ? (
								<CustomDropdown
									data={category}
									// setSubCategory={setSubCategory}
									// setCategory={setCategory}
									setIsCategoryClicked={setIsCategoryClicked}
								/>
							) : (
								<Typography
									textTransform="capitalize"
									variant="body1"
									sx={{
										color: "#7D879C",
										cursor: "pointer",
									}}
									onClick={(e) => {
										searchParams.set(
											"category",
											category.name
										);
										setSearchParams(searchParams);
										setIsCategoryClicked(true);
									}}
								>
									{category.name}
								</Typography>
							)}
							{/* <Link
										to={`/search/category/${category.name}`}
									> */}
							{/* </Link> */}
						</React.Fragment>
					))}
				</Box>
			</Box>

			<Divider sx={{ margin: "24px 0px" }} />

			<Box>
				<Typography variant="h6" marginBottom="1rem">
					Price Range
				</Typography>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						gap: "0.5rem",
					}}
				>
					<FormControl>
						<TextField
							variant="outlined"
							label="0"
							value={from}
							size="small"
							sx={{
								"& label": {
									color: "rgb(158, 162, 168)",
								},
							}}
							onChange={(e) => {
								searchParams.set("from", e.target.value);
								setSearchParams(searchParams);
							}}
						/>
					</FormControl>
					<Typography variant="body2">-</Typography>
					<FormControl>
						<TextField
							variant="outlined"
							label="250"
							value={to}
							size="small"
							sx={{
								"& label": {
									color: "rgb(158, 162, 168)",
								},
							}}
							onChange={(e) => {
								searchParams.set("to", e.target.value);
								// if (e.target.value > searchParams.get("from")) {
								setSearchParams(searchParams);
								// }
							}}
						/>
					</FormControl>
				</Box>
			</Box>

			<Divider sx={{ margin: "24px 0px" }} />

			<Box display="flex" flexDirection="column">
				<Typography variant="h6" marginBottom="1rem">
					Brands
				</Typography>
				{productsData?.brands?.map(
					(brand) =>
						brand && (
							<FormControlLabel
								key={brand?._id}
								control={
									<Checkbox
										size="small"
										sx={{
											color: "black",
											"&.Mui-checked": {
												color: "rgb(15, 52, 96)",
											},
										}}
										onClick={(e) =>
											handleBrandsChange(e, brand)
										}
									/>
								}
								label={brand?.name}
							/>
						)
				)}
			</Box>

			<Divider sx={{ margin: "24px 0px" }} />

			<Box display="flex" flexDirection="column">
				<Typography variant="h6" marginBottom="1rem">
					Ratings
				</Typography>
				{[5, 4, 3, 2, 1].map((number) => (
					<FormControlLabel
						key={number}
						control={
							<Checkbox
								size="small"
								sx={{
									color: "black",
									"&.Mui-checked": {
										color: "rgb(15, 52, 96)",
									},
								}}
								onClick={(e) => handleRatingChange(e, number)}
							/>
						}
						label={
							<Rating name="read-only" value={number} readOnly />
						}
					/>
				))}
			</Box>
		</Paper>
	);
};

export default ListingPageSidebar;
