import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import userReducer from "./userSlice";
import donationsReducer from "./donationSlice";

const store = configureStore({
    reducer:{auth : authReducer,
        user: userReducer, 
        donations: donationsReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

