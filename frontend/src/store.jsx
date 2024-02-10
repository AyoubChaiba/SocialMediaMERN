import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./toolkit/profileSlice";
import darkModeReducer from "./toolkit/darkModeSlice";

const store = configureStore({
    reducer : {
        profile : profileReducer ,
        darkMode : darkModeReducer
    }
})

export default store