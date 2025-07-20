import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  account: {
    accessToken: "",
    refreshToken: "",
    userId: "",
    role: "",
    isEmailVerified: false,
  },
  isAuthenticated: false,
};

const handleLoginSuccess = (state, action) => {
  let data = action.payload.data;
  // console.log("Login Success Data:", data);

  state.account = {
    accessToken: data.token.accessToken,
    refreshToken: data.token.refreshToken,
    userId: data.userId,
    role: data.role,
    isEmailVerified: data.isEmailVerified,
  };
  state.isAuthenticated = true;
};

const handleLogout = (state, action) => {
  let data = action.payload.data;
  console.log("Logout Data:", data);
  state.account = {
    accessToken: "",
    refreshToken: data.token.refreshToken,
    userId: "",
    role: "",
    isEmailVerified: false,
  };
  state.isAuthenticated = false;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: handleLoginSuccess,
    logout: handleLogout,
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
