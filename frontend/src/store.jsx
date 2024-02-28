import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./toolkit/userSlice";
import darkModeReducer from "./toolkit/darkModeSlice";
import postReducer from "./toolkit/postSlice";
import favoriteReducer from "./toolkit/favoriteSlice";
import profileReducer from "./toolkit/profilesSlice";

const store = configureStore({
    reducer : {
        user : userReducer ,
        darkMode : darkModeReducer,
        posts : postReducer,
        favorite : favoriteReducer,
        profile : profileReducer,
    }
})

export default store