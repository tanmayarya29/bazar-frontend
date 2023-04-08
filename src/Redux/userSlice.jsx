import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
	"user/details",
	async ({ email, password }) => {
		const res = await axios.post(
			process.env.REACT_APP_BACKEND_URL + "/user/login",
			{
				email,
				password,
			}
		);

		return res.data;
	}
);

export const wishlistProduct = createAsyncThunk(
	"user/wishlist/product",
	async (item) => {
		await axios.post(
			`${process.env.REACT_APP_BACKEND_URL}/user/wishlist/${item._id}`,
			{},
			{
				headers: {
					"x-access-token": JSON.parse(
						localStorage.getItem("userData")
					)?.token,
					"Content-Type": "application/json",
				},
			}
		);
		return item;
	}
);

export const editUser = createAsyncThunk("user/edit", async (user) => {
	const res = await axios.put(
		process.env.REACT_APP_BACKEND_URL + "/user/profile/edit",
		user,
		{
			headers: {
				"x-access-token": JSON.parse(localStorage.getItem("userData"))
					?.token,
			},
		}
	);

	return res.data;
});

export const userSlice = createSlice({
	name: "user",
	initialState: {
		userData: JSON.parse(localStorage.getItem("userData")) || null,
		emailError: null,
		passwordError: null,
		isSuccess: false,
	},

	reducers: {
		clearUser: (state, action) => {
			state.userData = null;
			localStorage.removeItem("userData");
		},

		removeError: (state) => {
			state.emailError = null;
			state.passwordError = null;
		},
	},

	extraReducers: {
		[loginUser.fulfilled.type]: (state, action) => {
			const { cart, ...user } = action.payload;
			localStorage.setItem("userData", JSON.stringify(user));
			state.userData = action.payload;
			state.isSuccess = true;
		},

		[loginUser.rejected.type]: (state, action) => {
			if (action.error.message.match(/(\d+)/)[0] == 404) {
				state.emailError = "User does not exist";
			} else {
				state.passwordError = "Incorrect Password";
			}
			state.isSuccess = false;
		},
		[wishlistProduct.fulfilled.type]: (state, action) => {
			const product = state.userData.wishlist.find(
				(p) => p === action.payload._id
			);
			if (product) {
				state.userData.wishlist = state.userData.wishlist.filter(
					(p) => p !== action.payload._id
				);
			} else {
				state.userData.wishlist.push(action.payload._id);
			}
			const { cart, ...user } = state.userData;
			localStorage.setItem("userData", JSON.stringify(user));
		},
		[editUser.fulfilled.type]: (state, action) => {
			state.userData = action.payload;
			const { cart, ...user } = action.payload;
			localStorage.setItem("userData", JSON.stringify(user));
		},
	},
});

export const { clearUser, removeError } = userSlice.actions;

export default userSlice.reducer;
