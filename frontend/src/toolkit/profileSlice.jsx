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
        },
        profileFavorite(state, action) {
            const { postId } = action.payload;
            const indix = state.profile.favorite.indexOf(postId);
            if (indix !== -1) {
                state.profile.favorite = state.profile.favorite.filter(id => id !== postId)
            }else {
                state.profile.favorite.push(postId)
            }
        }
    }
})


const profileReducer = profileSlice.reducer

export const { setCurrentProfile, setLoginOut, setToken, profileFavorite  } = profileSlice.actions

export default profileReducer