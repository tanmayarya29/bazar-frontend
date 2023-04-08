import { Container } from "@mui/material";
import Banner from "../components/Home/Banner";
import BigDiscounts from "../components/Home/BigDiscounts";
import BrandBanners from "../components/Home/BrandBanners";
import Cars from "../components/Home/Cars";
import FlashDeals from "../components/Home/FlashDeals";
import MoreForYou from "../components/Home/MoreForYou";
import NewArrivals from "../components/Home/NewArrivals";
import Services from "../components/Home/Services";
import TopCategories from "../components/Home/TopCategories";
import TopRatings from "../components/Home/TopRatings";

const Home = () => {
	return (
		<>
			<Banner />
			<main className="main">
				<Container sx={{ maxWidth: "1300px" }} maxWidth={false}>
					<FlashDeals />
					<TopCategories />
					<TopRatings />
					<NewArrivals />
					<BigDiscounts />
					<Cars />
					<BrandBanners />
					<MoreForYou />
					<Services />
				</Container>
			</main>
		</>
	);
};

export default Home;
