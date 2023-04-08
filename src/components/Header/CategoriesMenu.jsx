import { Category } from "@mui/icons-material";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import axios from "axios";

const StyledCategoryMenuItem = styled(MenuItem)(({ theme }) => ({
	textTransform: "capitalize",
	padding: "0.6rem 1rem",
	"&:hover": {
		backgroundColor: "#FCE9EC",
		color: "#D23F57",
	},
}));

const CategoriesMenu = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const navigate = useNavigate();
	const [categoriesMenuItems, setCategoriesMenuItems] = useState([]);

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_BACKEND_URL + "/shop/categories")
			.then((res) => {
				setCategoriesMenuItems(res.data.categories);
			})
			.catch((err) => console.log(err));
	}, []);

	const handleButtonClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuItemClick = (_event, index) => {
		setAnchorEl(null);
		navigate(`/search/category/${categoriesMenuItems[index].name}`);
	};

	function handleClose() {
		setAnchorEl(null);
	}

	return (
		<Box position="relative">
			<Button
				variant="contained"
				color="primary"
				sx={{
					padding: "6px 8px",
					height: "40px",
					width: "278px",
					display: "flex",
					alignItems: "center",
					gap: "0.5rem",
					boxShadow: "4",
					"&:hover": {
						backgroundColor: "rgba(43, 52, 69, 0.04)",
					},
				}}
				onClick={(e) => handleButtonClick(e)}
			>
				<Category fontSize="small" />
				<Box
					sx={{
						flex: "1 1 auto",
					}}
				>
					<Typography textAlign="start">Categories</Typography>
				</Box>
				<KeyboardArrowDownIcon
					fontSize="small"
					sx={{
						transform: open ? "rotateX(0deg)" : "rotateZ(-90deg)",
						transition: "transform 200ms ease-in-out",
					}}
				/>
			</Button>

			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				sx={{
					"& .MuiPaper-root": {
						width: "278px",
						marginTop: "0.75rem",
						boxShadow: "1",
					},
				}}
			>
				{categoriesMenuItems.map((category, index) => (
					<StyledCategoryMenuItem
						key={index}
						onClick={(e) => handleMenuItemClick(e, index)}
					>
						{category.name}
					</StyledCategoryMenuItem>
				))}
			</Menu>
		</Box>
	);
};

export default CategoriesMenu;
