import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//  Define a TypeScript type for user
interface User {
  id: string;
  name?: string;
  email: string;
  role: "DONOR" | "NGO" | "ADMIN"; // Ensure proper role management
} 

//  Read user from localStorage safely
const storedUser = localStorage.getItem("user");
const initialState: { user: User | null } = {
  user: storedUser ? JSON.parse(storedUser) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //  Ensure correct payload type
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload)); //  Sync with localStorage
      } else {
        localStorage.removeItem("user"); //  Remove on logout
      }
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user"); //  Ensure localStorage is cleared
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
