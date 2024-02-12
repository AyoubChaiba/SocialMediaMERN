import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./toolkit/profileSlice";
import darkModeReducer from "./toolkit/darkModeSlice";
import postReducer from "./toolkit/postSlice";

const store = configureStore({
    reducer : {
        profile : profileReducer ,
        darkMode : darkModeReducer,
        posts : postReducer
    }
})

export default store