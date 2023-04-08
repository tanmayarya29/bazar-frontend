import { KeyboardArrowDown } from "@mui/icons-material";
import {
	Badge,
	Container,
	IconButton,
	MenuItem,
	Typography,
} from "@mui/material";
import MenuWrapper from "./MenuWrapper";
import { Box, styled } from "@mui/system";
import React, { useState } from "react";
import CategoriesMenu from "./CategoriesMenu";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
	"&:hover": {
		color: theme.palette.error.main,
	},
}));

const navMenuItems = [
	{
		id: 1,
		title: "User Account",
		menu: [
			{
				title: "Orders",
				src: "/user/orders",
			},
			{
				title: "Profile",
				src: "/user/profile",
			},
			{ title: "Wishlist", src: "/user/wishlist" },
		],
	},
];

const DropdownMenu = ({ item: navItem }) => {
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Box
			display="flex"
			onClick={handleClick}
			onMouseOver={handleClick}
			onMouseLeave={handleClose}
			alignItems="center"
			gap="0.25rem"
			position="relative"
			sx={{
				color: "info.main",
				cursor: "pointer",
			}}
		>
			<Typography>{navItem.title}</Typography>
			<KeyboardArrowDown fontSize="small" sx={{ color: "#AEB4BE" }} />
			{open && (
				<MenuWrapper
					topLevelStyle={{
						top: "100%",
						left: "50%",
						transform: "translateX(-50%)",
					}}
					innerMargin={{ marginTop: "1rem" }}
				>
					{navItem?.menu?.map((item, ind) => (
						<StyledMenuItem key={ind} onClick={handleClose}>
							{item && (
								<Link to={item.src} style={{ color: "black" }}>
									<Typography>{item.title}</Typography>
								</Link>
							)}
						</StyledMenuItem>
					))}
				</MenuWrapper>
			)}
		</Box>
	);
};

const Menubar = ({ cartToggler, children }) => {
	const user = useSelector((state) => state.user.userData);
	const { cartProductsCount } = useSelector((state) => state.counter);
	const navigate = useNavigate();

	return (
		<Box backgroundColor="common.white">
			<Container
				sx={{
					maxWidth: "1300px",
					display: "flex",
					alignItems: "center",
					minHeight: "60px",
					paddingRight: "3rem !important",
					paddingBottom: "1rem",
					justifyContent: { xs: "center", md: "space-between" },
				}}
				maxWidth={false}
			>
				<Box
					width="100%"
					display="flex"
					gap="1rem"
					alignItems="center"
					flexWrap="wrap"
					sx={{
						justifyContent: { xs: "center", sm: "space-between" },
					}}
				>
					<CategoriesMenu />
					<Box
						sx={{
							display: { xs: "flex", md: "none" },
						}}
						alignItems="center"
						gap="0.75rem"
					>
						{children}
						<IconButton
							sx={{
								backgroundColor: "rgb(243, 245, 249)",
							}}
							onClick={() => navigate("/user/profile")}
						>
							<PersonOutlineOutlinedIcon />
						</IconButton>
						<Badge badgeContent={cartProductsCount} color="error">
							<IconButton
								sx={{
									backgroundColor: "rgb(243, 245, 249)",
								}}
								onClick={cartToggler}
							>
								<ShoppingBagOutlinedIcon />
							</IconButton>
						</Badge>
					</Box>
					{user && (
						<Box
							sx={{
								display: { xs: "none", md: "flex" },
							}}
							gap="2rem"
						>
							{navMenuItems.map((item, index) => (
								<DropdownMenu key={index} item={item} />
							))}
						</Box>
					)}
				</Box>
			</Container>
		</Box>
	);
};

export default Menubar;
