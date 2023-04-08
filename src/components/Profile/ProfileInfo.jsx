import { Button, Box, Container, Grid, Paper, Typography, Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import FaceIcon from "@mui/icons-material/Face";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfileInfo = () => {
	const user = useSelector((state) => state.user.userData);
	const {ordersCount} = useSelector((state) => state.counter);

	let birthDate = user?.birthDate;
	birthDate = new Date(birthDate);
	birthDate = birthDate.toDateString().slice(4);

	return (
		<Grid item sm={12} md={9}>
			<Container
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					marginBottom: "1rem",
					paddingLeft: "0px !important",
					paddingRight: "0px !important",
				}}
			>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						gap: "0.5rem",
					}}
				>
					<PersonIcon sx={{ color: "error.main" }} />
					<Typography variant="h5" fontWeight="700" fontSize="25px">
						My Profile
					</Typography>
				</Box>
				<Box>
					<Button
						variant="contained"
						style={{
							display: "inline-block",
							float: "right",
							backgroundColor: "#FCE9EC",
							textTransform: "normal",
						}}
					>
						<NavLink
							to="/user/edit"
							style={{
								color: "#D23F57",
							}}
						>
							Edit Profile
						</NavLink>
					</Button>
				</Box>
			</Container>
			<Grid container spacing={2}>
				<Grid
					item
					xs={12}
					sm={12}
					md={6}
					sx={{
						display: "flex",
						flexDirection: "column",
						height: "100%",
					}}
				>
					<Paper elevation={3}>
						<Container>
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-between",
									padding: "28px",
								}}
							>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										gap: "1rem",
									}}
								>
									<Avatar 

										sx={{
											width: "56px",
											height: "56px",
											backgroundColor: "error.main",
										}}
									>
										{user?.firstName[0].toUpperCase()}
										{user?.lastName[0].toUpperCase()}
									</Avatar>

									<Box
										sx={{
											display: "flex",
											flexDirection: "column",
										}}
									>
										<Typography variant="h6">
											{user?.firstName} {user?.lastName}
										</Typography>
										<Typography variant="caption">
											Balance:
											<span color="#D23F57">$500</span>
										</Typography>
									</Box>
								</Box>

								<Box p={2}>
									<Typography variant="caption">
										{user?.tier.charAt(0).toUpperCase() +
											user?.tier.slice(1)}{" "}
										User
									</Typography>
								</Box>
							</Box>
						</Container>
					</Paper>
				</Grid>
				<Grid item sm={12} md={6}>
					<Grid container spacing={3}>
						<Grid item xs={6} sm={6} md={6} lg={3}>
							<Paper>
								<Box
									sx={{
										display: "flex",
										flexDirection: "column",
										padding: "20px",
										justifyContent: "center",
									}}
								>
									<Typography
										variant="h5"
										color="#D23F57"
										sx={{
											textAlign: "center",
											fontSize: "20px",
											fontWeight: "600",
										}}
									>
										{ordersCount}
									</Typography>
									<Typography
										variant="caption"
										sx={{ textAlign: "center" }}
									>
										All Orders
									</Typography>
								</Box>
							</Paper>
						</Grid>

						<Grid item xs={6} sm={6} md={6} lg={3}>
							<Paper>
								<Box
									sx={{
										display: "flex",
										flexDirection: "column",
										padding: "20px",
										justifyContent: "center",
									}}
								>
									<Typography
										variant="h5"
										color="#D23F57"
										sx={{
											textAlign: "center",
											fontSize: "20px",
											fontWeight: "600",
										}}
									>
										{user?.awaitingPayments}
									</Typography>
									<Typography
										variant="caption"
										sx={{ textAlign: "center" }}
									>
										Awaiting Payments
									</Typography>
								</Box>
							</Paper>
						</Grid>

						<Grid item xs={6} sm={6} md={6} lg={3}>
							<Paper>
								<Box
									sx={{
										display: "flex",
										flexDirection: "column",
										padding: "20px",
										justifyContent: "center",
									}}
								>
									<Typography
										variant="h5"
										color="#D23F57"
										sx={{
											textAlign: "center",
											fontSize: "20px",
											fontWeight: "600",
										}}
									>
										{user?.awaitingShipments}
									</Typography>
									<Typography
										variant="caption"
										sx={{ textAlign: "center" }}
									>
										Awaiting Shipments
									</Typography>
								</Box>
							</Paper>
						</Grid>

						<Grid item xs={6} sm={6} md={6} lg={3}>
							<Paper>
								<Box
									sx={{
										display: "flex",
										flexDirection: "column",
										padding: "20px",
										justifyContent: "center",
									}}
								>
									<Typography
										variant="h5"
										color="#D23F57"
										sx={{
											textAlign: "center",
											fontSize: "20px",
											fontWeight: "600",
										}}
									>
										{user?.awaitingDelivery}
									</Typography>
									<Typography
										variant="caption"
										sx={{ textAlign: "center" }}
									>
										Awaiting Delivery
									</Typography>
								</Box>
							</Paper>
						</Grid>
					</Grid>
				</Grid>

				<Grid item sm={12} md={12} sx={{ marginTop: "30px" }}>
					<Paper elevation={3}>
						<Box sx={{ display: "flex", padding: "20px" }}>
							<Grid container spacing={2}>
								<Grid
									item
									xs={2}
									sm={2}
									md={2}
									lg={2}
									sx={{
										display: "flex",
										flexDirection: "column",
									}}
								>
									<Typography
										variant="caption"
										color="rgb(125, 135, 156)"
									>
										Firstname
									</Typography>
									<span
										style={{
											fontSize: "14px",
											color: "#2B3445",
										}}
									>
										{user?.firstName}
									</span>
								</Grid>

								<Grid
									item
									xs={2}
									sm={2}
									md={2}
									lg={2}
									sx={{
										display: "flex",
										flexDirection: "column",
									}}
								>
									<Typography
										variant="caption"
										color="rgb(125, 135, 156)"
									>
										Lastname
									</Typography>
									<span
										style={{
											fontSize: "14px",
											color: "#2B3445",
										}}
									>
										{user?.lastName}
									</span>
								</Grid>

								<Grid
									item
									xs={3}
									sm={3}
									md={3}
									lg={3}
									sx={{
										display: "flex",
										flexDirection: "column",
									}}
								>
									<Typography
										variant="caption"
										color="rgb(125, 135, 156)"
									>
										Email
									</Typography>
									<span
										style={{
											fontSize: "14px",
											color: "#2B3445",
										}}
									>
										{user?.email}
									</span>
								</Grid>

								<Grid
									item
									xs={3}
									sm={3}
									md={3}
									lg={3}
									sx={{
										display: "flex",
										flexDirection: "column",
									}}
								>
									<Typography
										variant="caption"
										color="rgb(125, 135, 156)"
									>
										Phone
									</Typography>
									<span
										style={{
											fontSize: "14px",
											color: "#2B3445",
										}}
									>
										+91{user?.phone}
									</span>
								</Grid>

								<Grid
									item
									sm={2}
									md={2}
									lg={2}
									sx={{
										display: "flex",
										flexDirection: "column",
									}}
								>
									<Typography
										variant="caption"
										color="rgb(125, 135, 156)"
									>
										Birthdate
									</Typography>
									<span
										style={{
											fontSize: "14px",
											color: "#2B3445",
										}}
									>
										{birthDate}
									</span>
								</Grid>
							</Grid>
							{/*
							<Grid container spacing={2}>
								
							</Grid>
							<Grid container spacing={2}>
								
							</Grid>
							<Grid container spacing={2}>
								
									</Grid> */}
						</Box>
					</Paper>
				</Grid>
			</Grid>
		</Grid>
	);
};
export default ProfileInfo;
