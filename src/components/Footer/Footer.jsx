import { Box, Container, Grid, Link, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";

const Text = styled(Typography)(({ theme, color, fontSize }) => ({
	color: color ? color : "#AEB4BE",
	fontSize: fontSize || "14px",
}));

const StyledLink = styled(Link)(({ theme, color }) => ({
	color: color ? color : "#AEB4BE",
	textDecoration: "none",
	cursor: "pointer",

	":hover": {
		color: theme.palette.primary.main,
	},
}));

const Footer = () => {
	return (
		<footer className="footer">
			<Box sx={{ backgroundColor: "#0C0E30", padding: "5rem" }}>
				<Container sx={{ maxWidth: "1300px" }} maxWidth={false}>
					<Box marginLeft="auto" marginRight="auto">
						<Grid container spacing={3}>
							<Grid item xs={12} sm={6} lg={3}>
								<Box
									component="img"
									src="./images/logo.svg"
									marginBottom="1rem"
								/>
								<Text>
									Lorem ipsum dolor sit amet, consectetur
									adipiscing elit. Auctor libero id et, in
									gravida. Sit diam duis mauris nulla cursus.
									Erat et lectus vel ut sollicitudin elit at
									amet.
								</Text>
								<Box display="flex" gap="1rem"></Box>
							</Grid>
							<Grid item xs={12} sm={6} lg={3}>
								<Text
									variant="h4"
									fontSize="1.5rem"
									fontWeight={600}
									marginBottom="1.25rem"
									color="common.white"
								>
									About Us
								</Text>
								<Box
									display="flex"
									flexDirection="column"
									gap="0.5rem"
								>
									<StyledLink>Careers</StyledLink>
									<StyledLink>Our Stores</StyledLink>
									<StyledLink>Our Cares</StyledLink>
									<StyledLink>Terms & Conditions</StyledLink>
									<StyledLink>Privacy Policy</StyledLink>
								</Box>
							</Grid>
							<Grid item xs={12} sm={6} lg={3}>
								<Text
									variant="h4"
									fontSize="1.5rem"
									fontWeight={600}
									marginBottom="1.25rem"
									color="common.white"
								>
									Customer Care
								</Text>
								<Box
									display="flex"
									flexDirection="column"
									gap="0.5rem"
								>
									<StyledLink>Help Center</StyledLink>
									<StyledLink>How to Buy</StyledLink>
									<StyledLink>Track Your Order</StyledLink>
									<StyledLink>
										Corporate & Bulk Purchasing
									</StyledLink>
									<StyledLink>Returns & Refunds</StyledLink>
								</Box>
							</Grid>
							<Grid item xs={12} sm={6} lg={3}>
								<Text
									variant="h4"
									fontSize="1.5rem"
									fontWeight={600}
									marginBottom="1.25rem"
									color="common.white"
								>
									Contact Us
								</Text>
								<Box
									display="flex"
									flexDirection="column"
									gap="0.5rem"
								>
									<Text>
										70 Washington Square South, New York, NY
										10012, United States
									</Text>
									<Text>Email: uilib.help@gmail.com</Text>
									<Text>Phone: +1 1123 456 780</Text>
								</Box>
								<Box></Box>
							</Grid>
						</Grid>
					</Box>
				</Container>
			</Box>
		</footer>
	);
};

export default Footer;
