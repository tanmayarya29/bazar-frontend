import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import CustomCard from "../../custom/CustomCard";
import { useSelector } from "react-redux";
import axios from "axios";

const WishList = () => {
	const [cardItems, setCardItems] = useState([]);
	const { userData } = useSelector((state) => state.user);
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get(
				`${process.env.REACT_APP_BACKEND_URL}/user/wishlist/`,
				{
					headers: {
						"x-access-token": JSON.parse(
							localStorage.getItem("userData")
						)?.token,
						"Content-Type": "application/json",
					},
				}
			);
			setCardItems(result.data?.products?.wishlist);
		};

		fetchData();
	}, [userData.wishlist]);

	return (
		<Grid item sm={12} md={9}>
			<Grid container spacing={2}>
				{cardItems.map((data) => (
					<Grid item xs={12} sm={6} md={4}>
						<CustomCard item={data} />
					</Grid>
				))}
			</Grid>
		</Grid>
	);
};
export default WishList;
