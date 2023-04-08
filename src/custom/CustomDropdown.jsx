import { useState } from "react";
import { Box, Typography, Collapse } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useSearchParams } from "react-router-dom";
// import { Link } from "react-router-dom";

const CustomDropdown = ({ data, setIsCategoryClicked }) => {
	const [open, setOpen] = useState(true);
	const [searchParams, setSearchParams] = useSearchParams();

	return (
		<Box>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					cursor: "pointer",
					color: "#7D879C",
				}}
				onClick={() => setOpen(!open)}
			>
				{/* <Link to={`/search/category/${data.name}`}> */}
				<Typography
					variant="body1"
					textTransform="capitalize"
					onClick={(e) => {
						searchParams.set("category", data.name);
						setSearchParams(searchParams);
						setIsCategoryClicked(true);
					}}
				>
					{data.name}
				</Typography>
				{/* </Link> */}
				{open ? (
					<KeyboardArrowDownIcon fontSize="small" />
				) : (
					<KeyboardArrowRightIcon fontSize="small" />
				)}
			</Box>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<Box
					sx={{ paddingLeft: "20px", color: "#7D879C" }}
					component="div"
					disablePadding
				>
					{data.subCategory.map((subCategory) => (
						<Typography
							variant="body1"
							marginBottom="0.5rem"
							marginTop="0.5rem"
							key={subCategory._id}
							textTransform="capitalize"
							sx={{
								cursor: "pointer",
							}}
							onClick={(e) => {
								searchParams.set(
									"subCategory",
									subCategory.name
								);
								setSearchParams(searchParams);
								setIsCategoryClicked(false);
							}}
						>
							{subCategory.name}
						</Typography>
					))}
				</Box>
			</Collapse>
		</Box>
	);
};

export default CustomDropdown;
