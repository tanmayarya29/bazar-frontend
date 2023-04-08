import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { IconButton, Box, Container, Badge, Modal, Tooltip } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import Menubar from "./Menubar";
import AutocompleteSearch from "./AutocompleteSearch";
import Cart from "../Cart/Cart";
import Login from "../../pages/Login";
import { Link, useNavigate } from "react-router-dom";
import SignUp from "../../pages/SignUp";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../../Redux/userSlice";
import { clearCart, fetchCart } from "../../Redux/CounterSlice";
import ForgotPassword from "../../pages/ForgotPassword";

const LoginSignupButton = ({
	userData,
	handleLoginOpen,
	dispatch,
	navigate,
}) => {
	return !userData ? (
		<Tooltip title="Login">
		<IconButton
			sx={{
				backgroundColor: "rgb(243, 245, 249)",
			}}
			onClick={handleLoginOpen}
		>
			<LoginIcon />
		</IconButton>
		</Tooltip>
	) : (
		<Tooltip title="Logout">
		<IconButton
			sx={{
				backgroundColor: "rgb(243, 245, 249)",
			}}
			onClick={() => {
				dispatch(clearUser());
				dispatch(clearCart());
				navigate("/");
			}}
		>
			<LogoutIcon />
		</IconButton>
		</Tooltip>
	);
};

const Header = () => {
	const count = useSelector((state) => state.counter.cartProductsCount);
	const { userData, isSuccess } = useSelector((state) => state.user);

	const dispatch = useDispatch();

	//cart
	const [isCartOpen, setIsCartOpen] = useState(false);
	const cartToggler = () => {
		setIsCartOpen(!isCartOpen);
	};
	//login
	const [isLoginOpen, setIsLoginOpen] = useState(false);
	const handleLoginClose = () => {
		setIsLoginOpen(false);
	};
	const handleLoginOpen = () => {
		setIsLoginOpen(true);
	};
	//
	//sign up modal
	const [isSignUpOpen, setIsSignUpOpen] = useState(false);
	const handleSignUpOpen = () => {
		handleLoginClose();
		setIsSignUpOpen(true);
	};
	const handleSignUpClose = () => {
		setIsSignUpOpen(false);
	};
	// forgot model
	const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
	const handleForgotPasswordOpen = () => {
		handleLoginClose();
		handleSignUpClose();
		setIsForgotPasswordOpen(true);
	}
	const handleForgotPasswordClose = () => {
		setIsForgotPasswordOpen(false);
	}
	//
	const headerRef = useRef();
	const navigate = useNavigate();

	const handleScroll = () => {
		if (window.scrollY >= 40) {
			headerRef.current.classList.add("fixed");
		} else {
			headerRef.current.classList.remove("fixed");
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		if (isSuccess) {
			dispatch(fetchCart());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccess]);

	return (
		<header
			className="header"
			style={{
				display: "flex",
				flexDirection: "column",
			}}
		>
			<Box
				style={{
					display: "flex",
					flexDirection: "column",
				}}
				boxShadow={3}
			>
				<Box backgroundColor="common.white" ref={headerRef}>
					<Container
						sx={{
							maxWidth: "1300px",
							display: "flex",
							gap: "1rem",
							alignItems: "center",
							height: "80px",
							justifyContent: {
								xs: "center",
								md: "space-between",
							},
						}}
						maxWidth={false}
					>
						<Box
							sx={{
								display: { xs: "none", md: "flex" },
							}}
							gap="1rem"
							alignItems="center"
						>
							<Link to="/">
								<img
									style={{ height: "1.75rem" }}
									src="https://bazar-react.vercel.app/assets/images/logo2.svg"
									alt="bazar"
								/>
							</Link>
						</Box>
						<Box sx={{ maxWidth: "650px", width: "100%" }}>
							<AutocompleteSearch />
						</Box>
						<Box display="flex" gap="1rem">
							<Box sx={{ display: { xs: "none", md: "block" } }}>
								<Box display="flex" gap="1rem">
									<LoginSignupButton
										dispatch={dispatch}
										handleLoginOpen={handleLoginOpen}
										navigate={navigate}
										userData={userData}
									/>
									<Badge badgeContent={count} color="error">
										<IconButton
											sx={{
												backgroundColor:
													"rgb(243, 245, 249)",
											}}
											onClick={cartToggler}
										>
											<ShoppingBagOutlinedIcon />
										</IconButton>
									</Badge>
								</Box>
							</Box>
						</Box>
					</Container>
				</Box>
				<Menubar cartToggler={cartToggler}>
					<LoginSignupButton
						dispatch={dispatch}
						handleLoginOpen={handleLoginOpen}
						navigate={navigate}
						userData={userData}
					/>
				</Menubar>
			</Box>
			<Modal
				open={isCartOpen}
				onClose={cartToggler}
				sx={{
					width: "380px",
					height: "100%",
					left: "auto",
					backgroundColor: "#fff",
					"& .MuiBackdrop-root": {
						backgroundColor: "rgba(0,0,0,0.5)",
					},
				}}
			>
				<Cart onClose={cartToggler} />
			</Modal>
			<Modal open={isLoginOpen} onClose={handleLoginClose}>
				<Login
					onClose={handleLoginClose}
					signUpOpen={handleSignUpOpen}
					forgotPasswordOpen={handleForgotPasswordOpen}
				/>
			</Modal>
			<Modal open={isSignUpOpen} onClose={handleSignUpClose}>
				<SignUp
					onClose={handleSignUpClose}
					loginOpen={handleLoginOpen}
					forgotPasswordOpen={handleForgotPasswordOpen}
				/>
			</Modal>
			<Modal open={isForgotPasswordOpen} onClose={handleForgotPasswordClose}>
				<ForgotPassword
					onClose={handleForgotPasswordClose}
					loginOpen={handleLoginOpen}
					signUpOpen={handleSignUpOpen}
				/>
			</Modal>
		</header>
	);
};

export default Header;
