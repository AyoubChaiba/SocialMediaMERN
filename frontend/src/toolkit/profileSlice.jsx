import {createSlice} from '@reduxjs/toolkit';

let initialState = {
    isLogin  : JSON.parse(sessionStorage.getItem('currentToken')) ? true : false ,
    token : JSON.parse(sessionStorage.getItem('currentToken')) ,
    profile : null ,
}

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