import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../toolkit/profileSlice";

const store = configureStore({
    reducer : {
        profile : profileReducer
    }
})

export default store