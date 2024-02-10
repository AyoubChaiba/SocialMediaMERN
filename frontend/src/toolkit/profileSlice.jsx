import {createSlice} from '@reduxjs/toolkit';

let tokenString = sessionStorage.getItem('currentToken');
let token = tokenString ? JSON.parse(tokenString) : null;

let initialState = {
    isLogin: tokenString ? true : false,
    token: token,
    profile: null,
};

console.log(sessionStorage.getItem('currentToken'))

export const profileSlice = createSlice({
    name : 'profile',
    initialState ,
    reducers : {
        setCurrentProfile(state,action) {
            state.profile = action.payload
        },
        setLoginOut(state, action) {
            state.isLogin = action.payload
        },
        setToken(state,action) {
            state.token = action.payload
        }
    }
})


const profileReducer = profileSlice.reducer

export const {setCurrentProfile , setLoginOut , setToken} = profileSlice.actions

export default profileReducer