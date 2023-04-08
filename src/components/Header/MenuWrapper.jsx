import { Box } from "@mui/material";
import React from "react";

const MenuWrapper = ({ children, topLevelStyle, innerMargin }) => {
	return (
		<Box
			sx={{
				zIndex: "5",
				position: "absolute",
				color: "info.main",
				cursor: "pointer",
				...topLevelStyle,
			}}
		>
			<Box
				sx={{
					...innerMargin,
					backgroundColor: "common.white",
					minWidth: "200px",
					borderRadius: "0.5rem",
				}}
				boxShadow={3}
			>
				{children}
			</Box>
		</Box>
	);
};

export default MenuWrapper;
