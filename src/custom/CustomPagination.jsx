import { Pagination } from "@mui/material";
import { useState } from "react";

function CustomPagination(props) {
	const [page, setPage] = useState(1);
	const handleChange = (event, value) => {
		setPage(value);
	};

	return (
		<Pagination
			count={props.count}
			page={page}
			color="error"
			variant="outlined"
			onChange={handleChange}
			sx={{
				float: "right",
			}}
		/>
	);
}

export default CustomPagination;
