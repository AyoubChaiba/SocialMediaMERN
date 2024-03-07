import {createSlice} from '@reduxjs/toolkit';

let initialState = {
    isLogin  : JSON.parse(sessionStorage.getItem('currentToken')) ? true : false ,
    token : JSON.parse(sessionStorage.getItem('currentToken')) ,
    user : null ,
}

export const userSlice = createSlice({
    name : 'user',
    initialState ,
    reducers : {
        setCurrentUser(state,action) {
            state.user = action.payload
        },
        setLoginOut(state, action) {
            state.isLogin = action.payload
        },
        setToken(state,action) {
            state.token = action.payload
        },
        userFavorite(state, action) {
            const { postId } = action.payload;
            const indix = state.user.favorite.indexOf(postId);
            if (indix !== -1) {
                state.user.favorite = state.user.favorite.filter(id => id !== postId)
            }else {
                state.user.favorite.push(postId)
            }
        },
        removefollow(state, action) {
            state.user.following = state.user.following.filter(item => item.id !== action.payload);
        },
        addfollow(state, action) {
            state.user.following = [ ...state.user.following, action.payload];
        }
    }
})


const userReducer = userSlice.reducer

export const { setCurrentUser, setLoginOut, setToken, userFavorite, removefollow, addfollow  } = userSlice.actions

export default userReducer