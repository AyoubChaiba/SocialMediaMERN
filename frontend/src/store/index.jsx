import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../toolkit/profile";

const store = configureStore({
    reducer : {
        profile : profileReducer
    }
})

export default store