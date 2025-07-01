// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   account: {
//     access_token: "",
//     refresh_token: "",
//     username: "",
//     email: "",
//     image: "",
//     role: "",
//   },
//   isAuthenticated: false,
// };

// const handleLoginSuccess = (state, action) => {
//   const data = action.payload?.DT || {};
//   state.account = {
//     access_token: data.access_token,
//     refresh_token: data.refresh_token,
//     username: data.username,
//     email: data.email,
//     image: data.image,
//     role: data.role,
//   };
//   state.isAuthenticated = true;
// };

// const handleLogout = (state, action) => {
//   const data = action.payload?.DT || {};
//   state.account = {
//     access_token: "",
//     refresh_token: data.refresh_token,
//     username: "",
//     email: "",
//     image: "",
//     role: "",
//   };
//   state.isAuthenticated = false;
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     loginSuccess: handleLoginSuccess,
//     logout: handleLogout,
//   },
// });

// export const { loginSuccess, logout } = userSlice.actions;
// export default userSlice.reducer;
