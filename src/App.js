import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Product from "./pages/Product";
import UserProfile from "./pages/UserProfile";
import ProfileInfo from "./components/Profile/ProfileInfo";
import EditProfile from "./components/Profile/EditProfile";
import Orders from "./components/Profile/Orders";
import WishList from "./components/Profile/WishList";
import Search from "./pages/Search";
import ResetPassword from "./pages/ResetPassword";

function App() {
	return (
		<>
			<Header className="header" />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/product/:productId" element={<Product />} />
				<Route path="/user" element={<UserProfile />}>
					<Route path="profile" element={<ProfileInfo />} />
					<Route path="edit" element={<EditProfile />} />
					<Route path="orders" element={<Orders />} />
					<Route path="wishlist" element={<WishList />} />
				</Route>
				<Route path="/search/product" element={<Search />} />
				<Route
					path="/search/product/:name"
					element={<Search isPLP={true} />}
				/>
				<Route path="/search/category/:name" element={<Search />} />
				<Route path="/reset/:token" element={<ResetPassword />} />
			</Routes>
			<Footer />
		</>
	);
}

export default App;
