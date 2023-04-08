import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import React from "react";

const SectionHeader = ({ title, Icon, headerSize }) => {
	return (
		<Box
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			gap="0.5rem"
			marginBottom="1rem"
			sx={headerSize}
		>
			<Box display="flex" alignItems="center" gap="0.5rem">
				{Icon && <Icon color="error" />}
				<Typography color="info.main" fontSize="25px" fontWeight="700">
					{title}
				</Typography>
			</Box>
		</Box>
	);
};

export default SectionHeader;
