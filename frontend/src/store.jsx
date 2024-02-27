import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./toolkit/profileSlice";
import darkModeReducer from "./toolkit/darkModeSlice";
import postReducer from "./toolkit/postSlice";
import favoriteReducer from "./toolkit/favoriteSlice";

const store = configureStore({
    reducer : {
        profile : profileReducer ,
        darkMode : darkModeReducer,
        posts : postReducer,
        favorite : favoriteReducer
    }
})

export default store