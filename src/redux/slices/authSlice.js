import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage if available
const loadInitialState = () => {
  if (typeof window === "undefined") {
    return {
      user: null,
      isAuthenticated: false,
    };
  }

  const storedUser = localStorage.getItem("user");
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return {
    user: storedUser ? JSON.parse(storedUser) : null,
    isAuthenticated: isAuthenticated,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: loadInitialState(),
  reducers: {
    login: (state, action) => {
      const user = action.payload;
      state.user = user;
      state.isAuthenticated = true;
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("isAuthenticated", true);
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.setItem("isAuthenticated", false);
    },
    updateUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    deleteAccount: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout, updateUser, deleteAccount } = authSlice.actions;
export default authSlice.reducer;
