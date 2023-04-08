import { TextField, Box, Typography, Button, Link } from "@mui/material";
import { useState } from "react";
import axios from "axios";

function ForgotPassword(props) {
	const [email, setEmail] = useState("");
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);

	const handleForgot = async () => {
		const res = await axios
			.post(`${process.env.REACT_APP_BACKEND_URL}/user/forgotpassword`, {
				email
			})
			.then((res) => {
				if (res.data.error) {
					setError(res.data.error)
					return;
				}
				setSuccess("Password reset link is sent to your email")
			})
			.catch((err) => {
				setError(err.response.data.error)
			});
	};

	const handleLoginOpen = () => {
		props.onClose();
		props.loginOpen();
	};

	const color = error ? 'red' : 'green'

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
					Reset Your Password
				</Typography>
				<Typography alignSelf={"center"} variant="caption">
					Please fill all the fields to continue
				</Typography>
			</Box>
			<Typography>Email</Typography>
			<TextField
				sx={{ width: "100%" }}
				placeholder="
                            mark@nickolas.com"
				size="small"
				value={email}
				onChange={(e) => {
					setEmail(e.target.value)
					setError(null)
					setSuccess(null)
				}}
			/>
			<Typography
				color="error"
				variant="caption"
				sx={{
					fontWeight: "bold",
					marginBottom: "20px",
					color: {color}
				}}
			>
				{error ? error : success}
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
				onClick={handleForgot}
			>
				Send Link
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

export default ForgotPassword;
