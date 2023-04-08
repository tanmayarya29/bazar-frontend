import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart = createAsyncThunk("cart", async () => {
	const res = await axios.get(
		`${process.env.REACT_APP_BACKEND_URL}/user/cart`,
		{
			headers: {
				"x-access-token": JSON.parse(localStorage.getItem("userData"))
					?.token,
				"Content-Type": "application/json",
			},
		}
	);
	return res.data;
});

export const addToCart = createAsyncThunk("cart/add", async (item) => {
	await axios.post(
		`${process.env.REACT_APP_BACKEND_URL}/user/add/cart/${item._id}`,
		{},
		{
			headers: {
				"X-Access-Token": JSON.parse(localStorage.getItem("userData"))
					?.token,
				"Content-Type": "application/json",
			},
		}
	);
	return item;
});

export const removeFromCart = createAsyncThunk("cart/remove", async (item) => {
	await axios.post(
		`${process.env.REACT_APP_BACKEND_URL}/user/remove/cart/${item._id}`,
		{},
		{
			headers: {
				"X-Access-Token": JSON.parse(localStorage.getItem("userData"))
					?.token,
				"Content-Type": "application/json",
			},
		}
	);
	return item;
});

export const deleteFromCart = createAsyncThunk("cart/delete", async (item) => {
	await axios.post(
		`${process.env.REACT_APP_BACKEND_URL}/user/delete/cart/${item._id}`,
		{},
		{
			headers: {
				"X-Access-Token": JSON.parse(localStorage.getItem("userData"))
					?.token,
				"Content-Type": "application/json",
			},
		}
	);
	return item;
});

export const createOrder = createAsyncThunk(
	"cart/order",
	async (_, { getState }) => {
		const state = getState();
		const product = state.counter.cart?.items?.map((item) => ({
			productId: item.product._id,
			quantity: item.quantity,
		}));
		const res = await axios.post(
			process.env.REACT_APP_BACKEND_URL + "/user/order",
			{
				product,
				totalAmount: state.counter.totalPrice,
			},
			{
				headers: {
					"X-Access-Token": JSON.parse(
						localStorage.getItem("userData")
					)?.token,
					"Content-Type": "application/json",
				},
			}
		);
		return res.data;
	}
);

export const getOrders = createAsyncThunk("orders", async (_) => {
	const res = await axios.get(
		process.env.REACT_APP_BACKEND_URL + "/user/order",
		{
			headers: {
				"X-Access-Token": JSON.parse(localStorage.getItem("userData"))
					?.token,
				"Content-Type": "application/json",
			},
		}
	);

	return res.data;
});

export const CounterSlice = createSlice({
	name: "counter",
	initialState: {
		cart: JSON.parse(localStorage.getItem("cart")) || { items: [] },
		cartProductsCount:
			JSON.parse(localStorage.getItem("cart"))?.items?.length || 0,
		totalPrice:
			JSON.parse(localStorage.getItem("cart"))?.items?.reduce(
				(acc, current) => {
					return (
						acc + current.product.discountedPrice * current.quantity
					);
				},
				0
			) || 0,
		ordersCount: 0,
		orders: [],
	},
	reducers: {
		clearCart: (state, action) => {
			localStorage.removeItem("cart");
			state.cart = [];
			state.cartProductCount = 0;
			state.totalPrice = 0;
		},
	},

	extraReducers: {
		[fetchCart.fulfilled]: (state, action) => {
			state.cart = action.payload;
			state.cartProductsCount = state.cart?.items?.length;
			localStorage.setItem("cart", JSON.stringify(action.payload));
		},

		[addToCart.pending]: (state) => {},
		[addToCart.fulfilled]: (state, action) => {
			const product = state.cart?.items?.find(
				(item) => action.payload._id === item.product._id
			);

			if (!product) {
				state.cartProductsCount += 1;
				state.cart.items.push({ product: action.payload, quantity: 1 });
			} else {
				product.quantity++;
			}

			state.totalPrice += action.payload.discountedPrice;
			localStorage.setItem("cart", JSON.stringify(state.cart));
		},
		[addToCart.rejected]: (state) => {},

		[removeFromCart.pending.type]: (state) => {},
		[removeFromCart.fulfilled.type]: (state, action) => {
			const product = state.cart?.items?.find(
				(item) => action.payload._id === item.product._id
			);

			if (product && product.quantity === 1) {
				state.cartProductsCount -= 1;
				state.cart.items = state.cart.items.filter(
					(item) => item.product._id !== action.payload._id
				);
			} else {
				product.quantity--;
			}
			state.totalPrice -= action.payload.discountedPrice;
			localStorage.setItem("cart", JSON.stringify(state.cart));
		},
		[removeFromCart.rejected]: (state) => {},

		[deleteFromCart.fulfilled.type]: (state, action) => {
			state.cart.items = state.cart?.items?.filter(
				(item) => item.product._id !== action.payload._id
			);

			state.totalPrice = state.cart.items.reduce(
				(acc, curr) =>
					acc + curr.product.discountedPrice * curr.quantity,
				0
			);

			state.cartProductsCount--;
			localStorage.setItem("cart", JSON.stringify(state.cart));
		},

		[createOrder.fulfilled.type]: (state, action) => {
			state.cart.items = [];
			state.cartProductsCount = 0;
			state.totalPrice = 0;
			localStorage.removeItem("cart");
		},

		[getOrders.fulfilled.type]: (state, action) => {
			state.orders = action.payload;
			state.ordersCount = action.payload.length;
		},
	},
});

export const { clearCart } = CounterSlice.actions;

export default CounterSlice.reducer;
