import { createSlice } from "@reduxjs/toolkit";
let mode = "light";
if (typeof window !== "undefined") {
  // Only run in browser
  mode = localStorage.getItem("theme");
}

const themeSlice = createSlice({
  name: "theme",
  initialState: { mode },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.mode);
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
      localStorage.setItem("theme", state.mode);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
