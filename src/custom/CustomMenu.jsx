import { Button, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const CustomMenu = ({ items, fontSize, size }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const open = Boolean(anchorEl);

	const handleButtonClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuItemClick = (event, index) => {
		setSelectedIndex(index);
		setAnchorEl(null);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<Button
				onClick={handleButtonClick}
				sx={{
					fontSize: fontSize,
					minWidth: "auto",
					fontWeight: size === "small" ? "600" : "400",
					textTransform: "capitalize",
				}}
			>
				{items[selectedIndex]}{" "}
				<KeyboardArrowDownIcon
					fontSize={size === "small" ? "small" : "medium"}
				/>
			</Button>
			<Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
				{items.map((category, index) => (
					<MenuItem
						key={index}
						onClick={(e) => handleMenuItemClick(e, index)}
						selected={index === selectedIndex}
						sx={{ fontSize: fontSize }}
					>
						{category}
					</MenuItem>
				))}
			</Menu>
		</>
	);
};

export default CustomMenu;
