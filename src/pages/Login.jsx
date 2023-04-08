import {
	TextField,
	Box,
	Typography,
	Button,
	InputAdornment,
	Link
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, removeError } from "../Redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

function Login({ onClose, signUpOpen, forgotPasswordOpen }) {
	const dispatch = useDispatch();
	let { emailError, passwordError } = useSelector((state) => state.user);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleLogin = async () => {
		const isSuccess = await dispatch(loginUser({ email, password }));
		if (isSuccess?.error?.code === "ERR_BAD_REQUEST") {
		} else {
			navigate("/");
			onClose();
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
				justifyContent: "center",
				alignItems: "center",
				overflowY: "auto",
			}}
		>
			<Box
				mb={3}
				sx={{ display: "flex", flexDirection: "column", width: "100%" }}
			>
				<Typography
					alignSelf={"center"}
					variant="h6"
					fontWeight={700}
					sx={{ color: "info.main" }}
				>
					Welcome To Bazar
				</Typography>
				<Typography alignSelf={"center"}>
					Log in with email & password
				</Typography>
			</Box>

			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
					justifyContent: "center",
					width: "100%",
				}}
			>
				<Typography>Email or Phone Number</Typography>

				<TextField
					sx={{ width: "100%" }}
					maxWidth
					placeholder="example@mail.com"
					size="small"
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
						dispatch(removeError());
					}}
				/>
				<Box
					variant="span"
					sx={{ color: "red", fontSize: "12px", fontWeight: "bold" }}
				>
					{emailError ? emailError : ""}
				</Box>
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
					justifyContent: "center",
					width: "100%",
				}}
			>
				<Typography maxWidth sx={{ marginTop: "20px !important" }}>
					Password
				</Typography>

				<TextField
					sx={{ width: "100%" }}
					type={showPassword ? "text" : "password"}
					value={password}
					onChange={(event) => {
						setPassword(event.target.value);
						dispatch(removeError());
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									edge="end"
								>
									{!showPassword ? (
										<VisibilityOff />
									) : (
										<Visibility />
									)}
								</IconButton>
							</InputAdornment>
						),
					}}
					size="small"
					placeholder="*********"
				/>
				<Box
					variant="span"
					sx={{ color: "red", fontSize: "12px", fontWeight: "bold" }}
				>
					{passwordError ? passwordError : ""}
				</Box>
			</Box>

			<Button
				fullWidth
				variant="contained"
				sx={{
					backgroundColor: "error.main",
					padding: 1.5,
					color: "white",
					margin: "30px 0px !important",
				}}
				onClick={handleLogin}
				disabled={!email || !password}
			>
				Login
			</Button>
			<Typography>
				Don't have account?{" "}
				<Link
					sx={{
						color: "error.main",
						cursor: "pointer",
					}}
					onClick={signUpOpen}
				>
					Sign Up
				</Link>
			</Typography>
			<Typography mt={2}>
				Forgot password?{" "}
				<Link
					sx={{
						color: "error.main",
						cursor: "pointer",
					}}
					onClick={forgotPasswordOpen}
				>
					Reset
				</Link>
			</Typography>
		</Box>
	);
}

export default Login;
