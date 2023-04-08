import {
	Button,
	Checkbox,
	Container,
	Grid,
	Rating,
	Typography,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addToCart, removeFromCart } from "../Redux/CounterSlice";
import RelatedProducts from "../components/Product/RelatedProducts";
import FrequentlyBought from "../components/Product/FrequentlyBought";
import AlsoAvailable from "../components/Product/AlsoAvailable";
import { wishlistProduct } from "../Redux/userSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const ActionButton = styled(Button)(({ theme }) => ({
	padding: "0.5rem",
	minWidth: "0",
	border: `1px solid ${theme.palette.error.main}`,
	color: theme.palette.error.main,
}));

const previewImages = [
	{ id: 1, src: "./images/flash/flash-1.png" },
	{ id: 2, src: "./images/flash/flash-2.png" },
	{ id: 3, src: "./images/flash/flash-3.png" },
	{ id: 4, src: "./images/flash/flash-4.png" },
];

const Product = () => {
	const { productId } = useParams();
	const { cart } = useSelector((state) => state.counter);
	const [product, setProduct] = useState(null);
	const quantity = cart.items?.find(
		(item) => item._id === product?._id
	)?.quantity;
	const dispatch = useDispatch();
	const [selectedImage, setSelectedImage] = useState(product?.imgSrc);
	const { userData } = useSelector((state) => state.user);
	const isLiked =
		userData?.wishlist?.find((p) => p === product?._id) || false;

	useEffect(() => {
		axios
			.get(
				`${process.env.REACT_APP_BACKEND_URL}/shop/product/${productId}`
			)
			.then((res) => {
				setProduct(res.data.product);
			})
			.catch((err) => console.log(err));
	}, [productId]);

	return (
		<main className="main">
			<Container
				sx={{
					maxWidth: "1300px",
					paddingTop: "2rem",
					paddingBottom: "3rem",
				}}
				maxWidth={false}
			>
				<Grid container spacing={3}>
					<Grid
						item
						xs={12}
						md={6}
						display="flex"
						flexDirection="column"
						alignItems="center"
					>
						<Box position="relative">
							<Box
								component="img"
								src={selectedImage || product?.imgSrc}
								width="300px"
								marginBottom="3rem"
							/>
							<Checkbox
								sx={{
									color: "rgba(0, 0, 0, 0.54)",
									position: "absolute",
									right: "0.75rem",
									top: "0.5rem",
								}}
								checked={Boolean(isLiked)}
								icon={<FavoriteBorderIcon fontSize="small" />}
								checkedIcon={
									<FavoriteIcon
										color="error"
										fontSize="small"
									/>
								}
								onChange={(e) => {
									dispatch(wishlistProduct(product));
								}}
							/>
						</Box>
						<Box display="flex" gap="0.5rem">
							{previewImages.map((img, index) => (
								<Box
									key={index}
									width="64px"
									height="64px"
									sx={{
										cursor: "pointer",
										border: "1px solid #dae1e7",
										borderColor:
											selectedImage === img.src
												? "error.main"
												: "#dae1e7",
									}}
									backgroundColor="common.white"
									display="flex"
									alignItems="center"
									justifyContent="center"
									borderRadius="10px"
									onClick={() => setSelectedImage(img.src)}
								>
									<Box
										component="img"
										width="40px"
										src={img.src}
									/>
								</Box>
							))}
						</Box>
					</Grid>
					<Grid
						item
						xs={12}
						md={6}
						display="flex"
						flexDirection="column"
						gap="1rem"
					>
						<Typography fontSize="30px" fontWeight="700">
							{product?.name}
						</Typography>
						<Box display="flex" alignItems="center" gap="0.5rem">
							<Typography color="text.info">Brand:</Typography>
							<Typography
								fontWeight="600"
								textTransform="capitalize"
							>
								{product?.brand?.name}
							</Typography>
						</Box>
						<Box display="flex" alignItems="center" gap="0.5rem">
							<Typography>Rated:</Typography>
							<Rating
								value={product?.rating || 0}
								size="small"
								readOnly
							/>
							<Typography fontWeight="600">
								({product?.reviews || 0})
							</Typography>
						</Box>
						<Box>
							<Typography
								fontSize="25px"
								fontWeight="700"
								color="error"
							>
								${product?.discountedPrice}
							</Typography>
							<Typography>
								<s>${product?.originalPrice}</s>
							</Typography>
						</Box>
						<Box display="flex">
							{quantity > 0 ? (
								<Box
									display="flex"
									gap="1.5rem"
									alignItems="center"
								>
									<ActionButton
										onClick={() =>
											dispatch(removeFromCart(product))
										}
									>
										<RemoveIcon
											fontSize="small"
											color="error"
										/>
									</ActionButton>
									<Typography
										fontSize="20px"
										fontWeight="600"
									>
										{String(quantity).padStart(2, "0")}
									</Typography>
									<ActionButton
										onClick={() =>
											dispatch(addToCart(product))
										}
									>
										<AddIcon
											fontSize="small"
											color="error"
										/>
									</ActionButton>
								</Box>
							) : (
								<Button
									variant="contained"
									sx={{
										fontWeight: "600",
										padding: "6.5px 1.85rem",
									}}
									color="error"
									onClick={() => dispatch(addToCart(product))}
								>
									Add To Cart
								</Button>
							)}
						</Box>
						{/* <Box>
							<Button
								variant="contained"
								sx={{
									fontWeight: "600",
									padding: "6.5px 1.85rem",
								}}
								color="error"
								onClick={() =>
									dispatch(wishlistProduct(product))
								}
							>
								Add To Wishlist
							</Button>
						</Box> */}
						<Box display="flex" alignItems="center" gap="0.5rem">
							<Typography color="text.info">Sold by:</Typography>
							<Typography fontWeight="600">
								Mobile Store
							</Typography>
						</Box>
					</Grid>
				</Grid>
				<Box sx={{ marginTop: "3rem" }}>
					<Typography
						fontWeight="700"
						fontSize="20px"
						margin="1.5rem 0 1rem 0"
					>
						Specification:
					</Typography>
					<Typography>
						Brand: Beats
						<br />
						Model: S450
						<br />
						Wireless Bluetooth Headset
						<br />
						FM Frequency Response: 87.5 - 108 MHz
						<br />
						Feature: FM Radio, Card Supported (Micro SD / TF)
						<br />
						Made in China
					</Typography>
				</Box>

				<FrequentlyBought />

				<AlsoAvailable />

				<RelatedProducts />
			</Container>
		</main>
	);
};

export default Product;
