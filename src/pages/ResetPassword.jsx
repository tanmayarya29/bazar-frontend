import { useState, useEffect } from "react";
import {
	Box,
	TextField,
	Typography,
	Paper,
	Button,
	InputAdornment,
	IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [tokenError, setTokenError] = useState(null);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	const [showPassword, setShowPassword] = useState(false);
	const params = useParams();

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_BACKEND_URL}/user/reset`, {
				params: { resetPasswordToken: params.token },
			})
			.then((res) => {
				if (res.data?.message === "reset link is ok") {
					setEmail(res.data.email);
					return;
				}
			})
			.catch((err) => {
				setTokenError(err.response.data.error);
			});
	}, []);

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleSubmit = () => {
		axios
			.put(`${process.env.REACT_APP_BACKEND_URL}/user/updatepassword`, {
				email,
				password,
			})
			.then(res => {
                if (res.data.error) {
					setError(res.data.error)
					return;
				}
                setSuccess("Password Changed Successfully")
            })
			.catch((err) => {
				setError(err.response.data.error);
			});
	};

    const color = error ? 'red' : 'green'

	return (
		<Box
			sx={{
				width: "100%",
				padding: "30px 0px",
				backgroundColor: "#f6f9fc",
			}}
		>
			<Paper
				elevation={3}
				sx={{
					height: "100%",
					margin: "0 auto",
					width: {
                        sm: '70%',
                        md: '50%',
                        lg: '40%'
                    },
					backgroundColor: "#fff",
					padding: {
                        xs: "2rem",
                        sm: "4rem",
                        md: "5rem"
                    },
					borderRadius: "5px",
                    
				}}
			>
				{tokenError ? (
					<Typography variant="h5" sx={{ textAlign: "center" }}>
						{tokenError.charAt(0).toUpperCase() + tokenError.slice(1)}
					</Typography>
				) : (
					<Box
						sx={{
							
							margin: "0 auto",
						}}
					>
						<Typography
							variant="h5"
							sx={{
								textAlign: "center",
                                fontSize: {
                                    xs: "16px",
                                    sm: "17px",
                                    md: "18px",
                                    lg: "19px"
                                },
                                fontWeight: {
                                    xs: "700",
                                    sm: "600"
                                }
							}}
						>
							Enter Your New Password
						</Typography>
						<TextField
							sx={{ width: "100%", marginTop: "2rem" }}
							placeholder="
                            ************"
							size="small"
							value={password}
							onChange={(e) => {
                                setPassword(e.target.value)
                                setError(null)
                                setSuccess(null)
                            }}
							type={showPassword ? "text" : "password"}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
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
						<Typography
							color="error"
							variant="caption"
							sx={{
								fontWeight: "bold",
								marginBottom: "20px",
								color: { color },
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
							onClick={handleSubmit}
						>
							Submit
						</Button>
					</Box>
				)}
			</Paper>
		</Box>
	);
};

export default ResetPassword;
