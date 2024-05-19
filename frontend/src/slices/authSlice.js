import { createSlice } from '@reduxjs/toolkit';

//set user credentials to local storage and remove them when user logs out
const initialState = {
	userInfo: localStorage.getItem('userInfo')
		? JSON.parse(localStorage.getItem('userInfo'))
		: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			state.userInfo = action.payload;
			localStorage.setItem('userInfo', JSON.stringify(action.payload));
		},
		logout: (state, action) => {
			state.userInfo = null;
			localStorage.clear();
		},
	},
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
