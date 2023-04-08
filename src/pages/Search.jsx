import {
	Box,
	Typography,
	Grid,
	MenuItem,
	Paper,
	Select,
	Pagination,
	styled,
	IconButton,
	Modal,
} from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import CustomCard from "../custom/CustomCard";
import FilterListIcon from "@mui/icons-material/FilterList";
import ListingPageSidebar from "../components/Listing/ListingSidebar";
import CustomCarousel from "../custom/CustomCarousel";

const StyledCategoryMenuItem = styled(MenuItem)(({ theme }) => ({
	textTransform: "capitalize",
	padding: "0.6rem 1rem",
	"&:hover": {
		backgroundColor: "#FCE9EC",
		color: "#D23F57",
	},
}));

const Search = ({ isPLP }) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [sortBy, setSortBy] = useState("Relevance");
	const [ratings, setRatings] = useState([]);
	// const [from, setFrom] = useState();
	// const [to, setTo] = useState();
	const from = searchParams.get("from");
	const to = searchParams.get("to");
	const [productsData, setProductsData] = useState([]);
	const subCategory = searchParams.get("subCategory");
	const category = searchParams.get("category");
	const page = Number(searchParams.get("page")) || 1;
	const [brands, setBrands] = useState([]);
	const params = useParams();
	const [open, setOpen] = useState(false);
	const [recommendedProducts, setRecommendedProducts] = useState([]);
	// const location = useLocation();
	const [isCategoryClicked, setIsCategoryClicked] = useState(false);
	const handleSort = (e) => {
		setSortBy(e.target.value);
		searchParams({ page: 1 });
	};

	const handleRatingChange = (e, number) => {
		const isPresent = ratings.find((rating) => rating === number);
		if (!isPresent) {
			setRatings((ratings) => [...ratings, number]);
		} else {
			setRatings((ratings) =>
				ratings.filter((rating) => rating !== number)
			);
		}
	};

	const handleBrandsChange = (e, brand) => {
		const isPresent = brands.find((b) => b.name === brand.name);
		if (!isPresent) {
			setBrands((brands) => [...brands, brand]);
		} else {
			setBrands((brands) => brands.filter((b) => b.name !== brand.name));
		}
	};

	useEffect(() => {
		let ratingQuery = "";
		if (ratings.length !== 0) {
			ratingQuery = `rating=${ratings.join(",")}`;
		}

		let pageQuery = "";
		if (pageQuery !== 1) {
			pageQuery = `page=${searchParams.get("page")}`;
		}

		let brandQuery = "";
		if (brands.length !== 0) {
			brandQuery = `brand=${brands.map((brand) => brand._id).join(",")}`;
		}

		let priceFrom = "";
		if (from) {
			priceFrom = `priceFrom=${from}`;
		}

		let priceTo = "";
		if (to && Number(to) > Number(from)) {
			priceTo = `priceTo=${to}`;
		}

		let categoryQuery = "";
		let subCategoryQuery = "";
		if (isCategoryClicked) {
			categoryQuery = `category=${category}`;
			subCategoryQuery = "";
			searchParams.delete("subCategory");
		}
		if (!isCategoryClicked) {
			subCategoryQuery = `subCategory=${subCategory}`;
			categoryQuery = "";
			searchParams.delete("category");
		}
		setSearchParams(searchParams);

		const url = isPLP
			? `${process.env.REACT_APP_BACKEND_URL}/shop/search?name=${
					params.name
			  }&sortBy=${sortBy.toLowerCase()}&${ratingQuery}&${pageQuery}&${brandQuery}&${priceFrom}&${priceTo}&${categoryQuery}&${subCategoryQuery}`
			: `${process.env.REACT_APP_BACKEND_URL}/shop/search/category/${
					params.name
			  }?sortBy=${sortBy.toLowerCase()}&${ratingQuery}&${pageQuery}&${brandQuery}&${priceFrom}&${priceTo}&${categoryQuery}&${subCategoryQuery}`;

		axios
			.get(url)
			.then((res) => {
				setProductsData(res.data);
			})
			.catch((err) => console.log(err));
	}, [
		sortBy,
		ratings,
		params.name,
		isPLP,
		brands,
		isCategoryClicked,
		searchParams,
		from,
		to,
		subCategory,
		category,
	]);

	useEffect(() => {
		axios
			.get(
				`${process.env.REACT_APP_BACKEND_URL}/shop/products/more-for-you`
			)
			.then((res) => {
				setRecommendedProducts(res.data.products);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<Box
			sx={{
				backgroundColor: "#F6F9FC",
			}}
		>
			<Container
				sx={{
					width: "100%",
					padding: "30px 30px",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Paper
					elevation={1}
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						flexWrap: "wrap",
						gap: "1rem",
						marginBottom: "55px",
						boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
						color: "rgb(43, 52, 69)",
						padding: "10px 25px",
						borderRadius: "6px",
					}}
				>
					<Box>
						<Typography variant="h6" fontWeight={600} fontSize={16}>
							Searching for “ {params.name} ”
						</Typography>
						<Typography variant="body2" sx={{ color: "#7D879C" }}>
							{productsData?.count || 0}{" "}
							{productsData?.count === 1 ? "result" : "results"}{" "}
							found
						</Typography>
					</Box>
					<Box
						sx={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
					>
						{productsData?.count !== 0 && (
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									gap: "1rem",
								}}
							>
								<Box
									sx={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
										gap: "0.5rem",
									}}
								>
									<Typography
										sx={{
											color: "#7D879C",
											fontSize: "16px",
										}}
									>
										Sort by:{" "}
									</Typography>
									<Select
										value={sortBy}
										onChange={(e) => handleSort(e)}
										sx={{
											height: "2.5rem",
											width: "150px",
										}}
									>
										<StyledCategoryMenuItem value="Relevance">
											Relevance
										</StyledCategoryMenuItem>
										<StyledCategoryMenuItem value="Price: Low to High">
											Price: Low to High
										</StyledCategoryMenuItem>
										<StyledCategoryMenuItem value="Price: High to Low">
											Price: High to Low
										</StyledCategoryMenuItem>
									</Select>
								</Box>
							</Box>
						)}
						<IconButton
							sx={{
								display: { xs: "block", md: "none" },
								width: "40px",
								height: "40px",
							}}
							onClick={() => setOpen(!open)}
						>
							<FilterListIcon />
						</IconButton>
					</Box>
				</Paper>
				{productsData?.count === 0 ? (
					<Typography
						variant={"h5"}
						fontWeight="600"
						textAlign="center"
						marginBottom="1rem"
					>
						No Products Found !
					</Typography>
				) : (
					<Box
						sx={{
							display: "flex",
							gap: "1.5rem",
						}}
					>
						<ListingPageSidebar
							to={to}
							from={from}
							handleBrandsChange={handleBrandsChange}
							handleRatingChange={handleRatingChange}
							productsData={productsData}
							category={category}
							subCategory={subCategory}
							setIsCategoryClicked={setIsCategoryClicked}
							// setCategory={setCategory}
							// setSubCategory={setSubCategory}
							sx={{ display: { xs: "none", md: "flex" } }}
						/>
						{open && (
							<Modal
								open={open}
								onClose={() => setOpen(false)}
								sx={{
									overflowY: "auto",
								}}
							>
								<ListingPageSidebar
									to={to}
									from={from}
									handleBrandsChange={handleBrandsChange}
									handleRatingChange={handleRatingChange}
									productsData={productsData}
									category={category}
									subCategory={subCategory}
									setIsCategoryClicked={setIsCategoryClicked}
									sx={{
										display: { xs: "flex", md: "none" },
										overflowY: "auto",
										maxWidth: "280px",
										width: "280px",
										height: "calc(100vh - 38px)",
										flex: "1 0 auto",
										position: "fixed",
										top: 0,
										left: 0,
									}}
								/>
							</Modal>
						)}
						<Box
							sx={{
								width: { xs: "100%", md: "75%" },
							}}
						>
							<Grid container spacing={2}>
								{productsData?.products?.map((product) => (
									<Grid
										item
										lg={4}
										md={6}
										sm={6}
										xs={12}
										key={product._id}
									>
										<CustomCard item={product} />
									</Grid>
								))}
							</Grid>
							{productsData?.count && (
								<Grid container sx={{ marginTop: "2rem" }}>
									<Grid
										sx={{
											display: "flex",
											color: "text.primary",
											fontSize: {
												sm: 16,
												xs: 13,
											},
											justifyContent: {
												sm: "flex-start",
												xs: "center",
											},
										}}
										alignSelf="flex-end"
										item
										xs={12}
										sm={6}
									>
										Showing {(page - 1) * 9 + 1}-
										{page * 9 > productsData?.count
											? productsData?.count
											: page * 9}{" "}
										of {productsData?.count || 0} products
									</Grid>
									<Grid
										alignSelf="flex-end"
										display="flex"
										sx={{
											justifyContent: {
												sm: "flex-end",
												xs: "center",
											},
											marginTop: {
												sm: 0,
												xs: "2rem",
											},
										}}
										item
										xs={12}
										sm={6}
									>
										<Pagination
											count={Math.ceil(
												(productsData?.count || 0) / 9
											)}
											page={
												Number(
													searchParams.get("page")
												) || 1
											}
											color="error"
											variant="outlined"
											onChange={(e, value) => {
												// setPage(value);
												setSearchParams({
													...Object.fromEntries(
														searchParams
													),
													page: value,
												});
											}}
											sx={{
												float: "right",
											}}
										/>
									</Grid>
								</Grid>
							)}
						</Box>
					</Box>
				)}

				<Box
					sx={{
						marginTop: "3rem",
						display: "flex",
						flexDirection: "column",
						gap: "2rem",
					}}
				>
					<Typography variant="h5" fontWeight="700">
						Recommended Products
					</Typography>
					<Box position="relative">
						<CustomCarousel
							items={recommendedProducts}
							breakPoints={[
								{
									width: 1,
									itemsToShow: 1,
								},
								{
									width: 450,
									itemsToShow: 2,
								},
								{
									width: 650,
									itemsToShow: 3,
								},
								{
									width: 950,
									itemsToShow: 4,
								},
								{
									width: 1300,
									itemsToShow: 5,
								},
							]}
						>
							<CustomCard />
						</CustomCarousel>
					</Box>
				</Box>
			</Container>
		</Box>
	);
};

export default Search;
