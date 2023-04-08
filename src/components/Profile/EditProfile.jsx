import { useState } from "react";
import { Grid, TextField, Button, Typography, Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { useSelector, useDispatch } from "react-redux";
import { editUser } from "../../Redux/userSlice";

function EditProfile() {
	const { userData } = useSelector((state) => state.user);
	const [user, setUser] = useState(userData);
	const [isEditedMessage, setIsEditedMessage] = useState("");
	const dispatch = useDispatch();

	const handleChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const handleSubmit = async () => {
		const isEdited = await dispatch(editUser(user));
		if(isEdited.type === "user/edit/fulfilled"){
			setIsEditedMessage("Successfully Edited!")
		}
	};

	return (
		<Grid item sm={12} md={9}>
			<Grid container display="flex" flexDirection="row" spacing={3}>
				<Grid
					sx={{ display: "flex", alignItems: "center" }}
					item
					sm={12}
					md={6}
				>
					<PersonIcon
						sx={{
							display: "inline-block",
							marginRight: "20px",
							color: "#D23F57",
						}}
					/>
					<Typography
						sx={{ display: "inline-block", fontWeight: "bold" }}
						variant="h5"
					>
						Edit Profile
					</Typography>
				</Grid>
				<Grid item sm={12} md={6}>
					<Button
						variant="contained"
						style={{
							display: "inline-block",
							float: "right",
							backgroundColor: "#FCE9EC",
							textTransform: "normal",
							marginRight: "25px",
						}}
					>
						<NavLink
							to="/user/profile"
							style={{
								color: "#D23F57",
							}}
						>
							Back to Profile
						</NavLink>
					</Button>
				</Grid>
				<Grid
					container
					display="flex"
					direction="row"
					justify="space-between"
					alignItems="center"
					spacing={3}
					sx={{
						width: "100%",
						backgroundColor: "white",
						padding: "1rem",
						margin: "25px",
						borderRadius: "5px",
					}}
				>
					<Grid item sm={12} md={6}>
						<TextField
							label="First Name"
							name="firstName"
							value={user?.firstName}
							onChange={handleChange}
							fullWidth
							variant="outlined"
							sx={{
								label: {
									color: "info.main",
								},
								fieldset: {
									borderColor: "grey",
								},
								"& label.Mui-focused": {
									color: "error.main",
								},
							}}
						/>
					</Grid>
					<Grid item sm={12} md={6}>
						<TextField
							label="Last Name"
							name="lastName"
							value={user?.lastName}
							onChange={handleChange}
							fullWidth
							variant="outlined"
							sx={{
								label: {
									color: "info.main",
								},
								fieldset: {
									borderColor: "grey",
								},
							}}
						/>
					</Grid>
					<Grid item sm={12} md={6}>
						<TextField
							label="Email"
							name="email"
							value={user?.email}
							disabled
							fullWidth
							variant="outlined"
							sx={{
								label: {
									color: "info.main",
								},
								fieldset: {
									borderColor: "grey",
								},
							}}
						/>
					</Grid>
					<Grid item sm={12} md={6}>
						<TextField
							label="Phone"
							name="phone"
							value={user?.phone}
							onChange={handleChange}
							fullWidth
							variant="outlined"
							sx={{
								label: {
									color: "info.main",
								},
								fieldset: {
									borderColor: "grey",
								},
							}}
						/>
					</Grid>
					<Grid item sm={12} md={3}>
						<Button
							variant="contained"
							sx={{
								backgroundColor: "error.main",
								color: "white",
								"&:hover": {
									backgroundColor: "#E3364E",
								},
							}}
							onClick={handleSubmit}
							disabled={
								!user?.firstName ||
								!user?.lastName ||
								!user?.email
							}
						>
							Save Changes
						</Button>
						<Box variant="span" sx={{color: 'green', fontSize: '12px', fontWeight: 'bold'}}>{isEditedMessage ? isEditedMessage: ""}</Box>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default EditProfile;
