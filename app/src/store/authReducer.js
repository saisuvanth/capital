import { createSlice } from "@reduxjs/toolkit";

export const authReducer = createSlice({
	name: 'auth',
	initialState: {
		user: null,
		token: localStorage.getItem('token'),
		items: [],
		my_items: [],
		purchases: [],
		show: false,
	},
	reducers: {
		userLogin(state, action) {
			state.token = action.payload.token;
			state.user = action.payload.user;
		},
		setUser(state, action) {
			const { purchases, items, ...user } = action.payload
			state.user = user;
			state.purchases = purchases;
			state.my_items = items;
		},
		userLogout(state) {
			state.token = null;
		},
		setToken(state, action) {
			state.token = action.payload;
		},
		setShow(state, action) {
			state.show = action.payload;
		},
		addItem(state, action) {
			state.items.push(action.payload);
		},
		setItems(state, action) {
			state.items = action.payload;
		},
		removeItem(state, action) {
			state.items = state.items.filter(it => it._id !== action.payload)
		}
	}
});

export const { userLogin, userLogout, setShow, addItem, setUser, setToken, setItems, removeItem } = authReducer.actions;

export default authReducer.reducer;