import { SearchOutlined } from "@mui/icons-material";
import { styled, TextField, Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import useDebounce from "../../hooks/useDebounce";
import { Box } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import useOutsideClick from "../../hooks/useClickOutside";

const SearchBar = styled(TextField)(({ theme }) => ({
	width: "100%",
	"& .Mui-FormControl-root": {
		width: "100%",
	},
	"& .MuiOutlinedInput-root": {
		display: "flex",
		alignItems: "center",
		gap: "0.5rem",
		flex: 1,
		borderRadius: 100,
		padding: "0 0 0 1rem",
	},
	"& .MuiOutlinedInput-input": {
		padding: "0",
	},
	"& .MuiButton-root": {
		borderTopRightRadius: 100,
		borderBottomRightRadius: 100,
		padding: "0.75rem 1.5rem",
		whiteSpace: "nowrap",
		minWidth: "auto",
		height: "100%",
		borderLeft: "1px solid rgb(218, 225, 231)",
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.text.primary,
	},
}));

const AutocompleteSearch = () => {
	const [searchTerm, setSearchTerm] = React.useState("");
	const [productsData, setProductsData] = useState([]);
	const debouncedValue = useDebounce(searchTerm, 500);
	const navigate = useNavigate();

	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const autocompleteRef = useRef();
	useOutsideClick(autocompleteRef, handleClose);

	useEffect(() => {
		if (debouncedValue.trim()) {
			axios
				.get(
					`${process.env.REACT_APP_BACKEND_URL}/shop/search?name=${debouncedValue.trim()}`
				)
				.then((res) => {
					setProductsData(res.data.products);
					if (res.data.products.length > 0) setOpen(true);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [debouncedValue]);

	return (
		<>
			<Box sx={{ position: "relative" }}>
				<SearchBar
					color="error"
					placeholder="Searching for..."
					className="search-bar"
					variant="outlined"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					onKeyUp={(e) => {
						if (e.key === "Enter") {
							navigate(`/search/product/${searchTerm}`);
							setOpen(false);
						}
					}}
					InputProps={{
						startAdornment: (
							<SearchOutlined
								fontSize="small"
								sx={{
									color: "#A4AAB4",
								}}
							/>
						),
						endAdornment: (
							<Button
								sx={{
									textTransform: "initial",
								}}
								onClick={(e) => {
									if (debouncedValue.trim()) {
										navigate(
											`/search/product/${searchTerm.trim()}`
										);
										setOpen(false);
									}
								}}
							>
								Search
							</Button>
						),
					}}
				/>
				{open && (
					<Box
						ref={autocompleteRef}
						sx={{
							width: "95%",
							position: "absolute",
							minHeight: "100%",
							top: "120%",
							backgroundColor: "common.white",
							padding: "0.5rem",
							paddingLeft: "1.5rem",
							boxShadow: "3",
							zIndex: 5,
							maxHeight: "250px",
							overflowY: "auto",
						}}
					>
						{productsData.map((product) => (
							<Box
								key={product._id}
								sx={{
									marginBottom: "0.75rem",
									fontSize: "14px",
								}}
							>
								<Link
									style={{
										color: "#2B3445",
									}}
									to={`/product/${product._id}`}
									onClick={() => setOpen(false)}
								>
									{product.name}
								</Link>
							</Box>
						))}
					</Box>
				)}
			</Box>
		</>
	);
};

export default AutocompleteSearch;
