import { Grid, Paper, Typography } from "@mui/material";
import { Container, Box } from "@mui/system";
import { NavLink, Outlet } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PlaceIcon from "@mui/icons-material/Place";
import PaymentIcon from "@mui/icons-material/Payment";
import { useSelector } from "react-redux";

const UserProfile = () => {
	const user = useSelector((state) => state.user.userData);
	const { ordersCount } = useSelector((state) => state.counter);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				backgroundColor: "primary.main",
			}}
		>
			<Container
				sx={{
					marginTop: "20px",
					marginBottom: "20px",
				}}
			>
				<Grid
					container
					spacing={2}
					sx={{ display: "flex", justifyContent: "center" }}
				>
					<Grid item xs={12} sm={12} md={3}>
						<Paper elevation={3}>
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									padding: "20px",
								}}
							>
								<Typography
									variant="caption"
									sx={{ padding: "10px" }}
								>
									Dashboard
								</Typography>
								<Box sx={{ paddingBottom: "20px" }}>
									<Box
										sx={{
											display: "flex",
											justifyContent: "space-between",
											padding: "10px",
											"&:hover": {
												borderLeft: "2px solid #D23F57",
												color: "#D23F57",
											},
										}}
									>
										<NavLink
											to="orders"
											style={({ isActive }) => ({
												display: "flex",
												alignItems: "center",
												justifyContent: "space-between",
												gap: "0.5rem",
												width: "100%",
												color: isActive
													? "#D23F57"
													: "#2B3445",
												borderLeft: isActive
													? "2px solid #D23F57"
													: "none",
											})}
										>
											<Box
												sx={{
													display: "flex",
													alignItems: "center",
													gap: "0.5rem",
												}}
											>
												<ShoppingBagOutlinedIcon color="#7D879C" />
												<Typography >
													Orders
												</Typography>
											</Box>
											<Typography >
												{ordersCount || 0}
											</Typography>
										</NavLink>
									</Box>

									<Box
										sx={{
											display: "flex",
											justifyContent: "space-between",
											padding: "10px",
											"&:hover": {
												borderLeft: "2px solid #D23F57",
												color: "#D23F57",
											},
										}}
									>
										<NavLink
											to="wishlist"
											style={({ isActive }) => ({
												display: "flex",
												alignItems: "center",
												justifyContent: "space-between",
												gap: "0.5rem",
												width: "100%",
												color: isActive
													? "#D23F57"
													: "#2B3445",
												borderLeft: isActive
													? "2px solid #D23F57"
													: "none",
											})}
										>
											<Box
												sx={{
													display: "flex",
													alignItems: "center",
													gap: "0.5rem",
												}}
											>
												<FavoriteBorderIcon color="#7D879C" />
												<Typography >
													Wishlist
												</Typography>
											</Box>
											<Typography >
												{user?.wishlist?.length || 0}
											</Typography>
										</NavLink>
									</Box>

									<Box
										sx={{
											display: "flex",
											justifyContent: "space-between",
											padding: "10px",
											"&:hover": {
												borderLeft: "2px solid #D23F57",
												color: "#D23F57",
											},
										}}
									>
										
											<Box
												sx={{
													display: "flex",
													alignItems: "center",
													gap: "0.5rem",
												}}
											>
												<SupportAgentIcon color="#7D879C" />
												<Typography >
													support Tickets
												</Typography>
											</Box>
											<Typography >
												0
											</Typography>
										
									</Box>
								</Box>

								<Typography
									variant="caption"
									sx={{ padding: "10px" }}
								>
									Account Settings
								</Typography>

								<Box sx={{}}>
									<Box
										sx={{
											display: "flex",
											justifyContent: "space-between",
											padding: "10px",
											"&:hover": {
												borderLeft: "2px solid #D23F57",
												color: "#D23F57",
											},
										}}
									>
										<NavLink
											to="profile"
											style={({ isActive }) => ({
												display: "flex",
												alignItems: "center",
												justifyContent: "space-between",
												gap: "0.5rem",
												width: "100%",
												color: isActive
													? "#D23F57"
													: "#2B3445",
												borderLeft: isActive
													? "2px solid #D23F57"
													: "none",
											})}
										>
											<Box
												sx={{
													display: "flex",
													alignItems: "center",
													gap: "0.5rem",
												}}
											>
												<PersonIcon color="#7D879C" />
												<Typography >
													Profile Info
												</Typography>
											</Box>
											<Typography >
												5
											</Typography>
										</NavLink>
									</Box>

									<Box
										sx={{
											display: "flex",
											justifyContent: "space-between",
											padding: "10px",
											"&:hover": {
												borderLeft: "2px solid #D23F57",
												color: "#D23F57",
											},
										}}
									>
										<Box
											sx={{
												display: "flex",
												alignItems: "center",
												gap: "0.5rem",
											}}
										>
											<PlaceIcon color="#7D879C" />
											<Typography >
												Addresses
											</Typography>
										</Box>
										<Typography >5</Typography>
									</Box>

									<Box
										sx={{
											display: "flex",
											justifyContent: "space-between",
											padding: "10px",
											"&:hover": {
												borderLeft: "2px solid #D23F57",
												color: "#D23F57",
											},
										}}
									>
										<Box
											sx={{
												display: "flex",
												alignItems: "center",
												gap: "0.5rem",
											}}
										>
											<PaymentIcon color="#7D879C" />
											<Typography >
												Payment Methods
											</Typography>
										</Box>
										<Typography >5</Typography>
									</Box>
								</Box>
							</Box>
						</Paper>
					</Grid>
					<Outlet />
				</Grid>
			</Container>
		</Box>
	);
};

export default UserProfile;
