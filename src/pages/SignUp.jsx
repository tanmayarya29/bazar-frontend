import {
	TextField,
	Box,
	Typography,
	Button,
	InputAdornment,
	Link,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import axios from "axios";

function SignUp(props) {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [error, setError] = useState("");

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleClickShowConfirmPassword = () => {
		setShowConfirmPassword(!showConfirmPassword);
	};

	const handleMouseDownConfirmPassword = (event) => {
		event.preventDefault();
	};

	const handleSignUp = () => {
		axios
			.post(process.env.REACT_APP_BACKEND_URL + "/user/signup", {
				firstName,
				lastName,
				email,
				password,
			})
			.then((res) => {
				if (!res.data.error) {
					handleLoginOpen();
				}
			})
			.catch((err) => {
				if (err.response.status === 409) {
					setError("Email already exists");
				} else {
					setError("Something went wrong!");
				}
			});
	};

	const handleLoginOpen = () => {
		props.onClose();
		props.loginOpen();
	};

	const confirmPasswordCheck = () => {
		if (password !== confirmPassword) {
			return "Passwords do not match";
		}
	};

	return (
		<Box
			sx={{
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
				width: "450px",
				maxWidth: "80%",
				boxShadow: 24,
				borderRadius: 2,
				p: 6,
				backgroundColor: "background.paper",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				alignItems: "space-between",
				maxHeight: "calc(100vh - 10vh)",
				overflowY: "auto",
			}}
		>
			<Box
				mb={2}
				sx={{ display: "flex", flexDirection: "column", width: "100%" }}
			>
				<Typography
					alignSelf={"center"}
					variant="h5"
					fontWeight={700}
					sx={{ color: "info.main" }}
				>
					Create Your Account
				</Typography>
				<Typography alignSelf={"center"} variant="caption">
					Please fill all the fields to continue
				</Typography>
			</Box>
			<Typography>First Name</Typography>
			<TextField
				sx={{ width: "100%", marginBottom: "20px" }}
				placeholder="Mark"
				size="small"
				value={firstName}
				onChange={(e) => setFirstName(e.target.value)}
			/>
			<Typography>Last Name</Typography>
			<TextField
				sx={{ width: "100%", marginBottom: "20px" }}
				placeholder="Nickolas"
				size="small"
				value={lastName}
				onChange={(e) => setLastName(e.target.value)}
			/>
			<Typography>Email</Typography>
			<TextField
				sx={{ width: "100%" }}
				placeholder="
                            mark@nickolas.com"
				size="small"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<Typography
				color="error"
				variant="caption"
				sx={{
					fontWeight: "bold",
					marginBottom: "20px",
				}}
			>
				{error}
			</Typography>
			<Typography>Password</Typography>
			<TextField
				sx={{ width: "100%", marginBottom: "20px" }}
				placeholder="
                            ************"
				size="small"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				type={showPassword ? "text" : "password"}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={handleClickShowPassword}
								onMouseDown={handleMouseDownPassword}
							>
								{showPassword ? (
									<Visibility />
								) : (
									<VisibilityOff />
								)}
							</IconButton>
						</InputAdornment>
					),
				}}
			/>
			<Typography>Confirm Password</Typography>
			<TextField
				sx={{ width: "100%" }}
				placeholder="
                            ************"
				size="small"
				value={confirmPassword}
				onChange={(e) => {
					setConfirmPassword(e.target.value);
				}}
				type={showConfirmPassword ? "text" : "password"}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={handleClickShowConfirmPassword}
								onMouseDown={handleMouseDownConfirmPassword}
							>
								{showConfirmPassword ? (
									<Visibility />
								) : (
									<VisibilityOff />
								)}
							</IconButton>
						</InputAdornment>
					),
				}}
			/>
			<Typography
				color="error"
				variant="caption"
				sx={{
					fontWeight: "bold",
				}}
			>
				{confirmPasswordCheck()}
			</Typography>
			<Button
				fullWidth
				variant="contained"
				sx={{
					backgroundColor: "error.main",
					padding: 1.5,
					color: "white",
					margin: "30px 0px !important",
				}}
				onClick={handleSignUp}
				disabled={
					firstName === "" ||
					lastName === "" ||
					email === "" ||
					password === "" ||
					confirmPasswordCheck()
				}
			>
				Sign Up
			</Button>

			<Typography sx={{ textAlign: "center" }}>
				Already have an account?{" "}
				<Link
					sx={{
						color: "error.main",
						cursor: "pointer",
					}}
					onClick={handleLoginOpen}
				>
					Sign In
				</Link>
			</Typography>
		</Box>
	);
}

export default SignUp;
