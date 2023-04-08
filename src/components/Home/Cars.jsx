import React, { useEffect, useState } from "react";
import CustomProductSection from "../../custom/CustomProductSection";
import axios from "axios";

const Cars = () => {
	const [cars, setCars] = useState([]);
	const [carBrands, setCarBrands] = useState([]);

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_BACKEND_URL + "/shop/brands/cars")
			.then((res) => {
				setCarBrands(res.data.brands);
			})
			.catch((err) => console.log(err));
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get(
				process.env.REACT_APP_BACKEND_URL + "/shop/product?type=cars"
			);
			setCars(result.data);
		};
		fetchData();
	}, []);

	return (
		<CustomProductSection
			title="Cars"
			sidebarItems={carBrands}
			items={cars}
		/>
	);
};

export default Cars;
