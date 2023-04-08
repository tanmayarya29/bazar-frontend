import { Grid, Box, Typography, Paper, Chip, Tooltip } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../Redux/CounterSlice";

const Orders = () => {
	const dispatch = useDispatch();
	const { orders } = useSelector((state) => state.counter);

	useEffect(() => {
		dispatch(getOrders());
	}, []);

	return (
		<Grid item sm={12} md={9}>
			<Grid container>
				<Grid item xs={12} sm={12}>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							gap: "0.5rem",
						}}
					>
						<ShoppingBagIcon sx={{ color: "#D23F57" }} />
						<Typography
							sx={{
								fontSize: "25px",
								fontWeight: "700",
								lineHeight: "1",
								marginLeft: "10px",
							}}
							variant="h5"
						>
							My Orders
						</Typography>
					</Box>
				</Grid>
				<Grid item xs={12} sm={12}>
					<Grid
						container
						spacing={1}
						sx={{
							padding: "10px",
							color: "rgb(125, 135, 156)",
							marginTop: "10px",
							marginBottom: "10px",
						}}
						flexDirection="row"
						justifyContent="flex-start"
						alignItems="flex-start"
					>
						<Grid item xs={3} sm={3} md={3}>
							<Typography
								sx={{ fontSize: "16px", fontWeight: "600" }}
							>
								Order#
							</Typography>
						</Grid>
						<Grid item xs={3} sm={3} md={3}>
							<Typography
								sx={{ fontSize: "16px", fontWeight: "600", textAlign: "center" }}
							>
								Status
							</Typography>
						</Grid>
						<Grid item xs={3} sm={3} md={3}>
							<Typography
								sx={{ fontSize: "16px", fontWeight: "600" }}
							>
								Date Purchased
							</Typography>
						</Grid>
						<Grid item xs={3} sm={3} md={3}>
							<Typography
								sx={{ fontSize: "16px", fontWeight: "600" }}
							>
								Total
							</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Grid>

			{orders.map((item) => (
				<Grid
					item
					xs={12}
					sm={12}
					lg={12}
					sx={{ marginBottom: "20px" }}
				>
					<Paper>
						<Grid container spacing={1} sx={{ padding: "10px" }}>
							<Grid item xs={3} lg={3} >
								<Tooltip
									title={item._id}
									placement="bottom-start"
								>
									<Typography
										sx={{
											display: "inline-block",
											width: "100%",
											color: "#2B3445",
											fontSize: "14px",
											fontWeight: "600",
										}}
										noWrap
									>
										{" "}
										{item._id}
									</Typography>
								</Tooltip>
							</Grid>
							<Grid item xs={3} lg={3}>
								<Typography 
									sx={{
										textAlign: "center",
									}}
									>
									<Chip label={item.status} />
								</Typography>
							</Grid>
							<Grid item xs={3} lg={3}>
								<Typography>
									{" "}
									{new Date(item.datePurchased)
										.toDateString()
										.slice(4)}
								</Typography>
							</Grid>
							<Grid item xs={3} lg={3}>
								<Typography>
									{" "}
									{item.totalAmount.toFixed(2)}
								</Typography>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
			))}
		</Grid>
	);
};

export default Orders;
