import {createSlice} from '@reduxjs/toolkit';

let initialState = {
    favorite : [] ,
}

export const favoriteSlice = createSlice({
    name : 'favorite',
    initialState ,
    reducers : {
        setFavorite(state, action) {
            // const existingPosts = state.favorite.filter(post => action.payload.some(newPost => newPost.id === post.id));
            // const newPosts = action.payload.filter(post => !existingPosts.some(existingPost => existingPost.id === post.id));
            // state.favorite = [...state.favorite, ...newPosts];
            state.favorite = action.payload
        },
        toggleFavorite(state, action) {
            const { postId } = action.payload;
            state.favorite = state.favorite.filter(e => e.id !== postId)
        }
    }
})


const favoriteReducer = favoriteSlice.reducer

export const {setFavorite, toggleFavorite } = favoriteSlice.actions

export default favoriteReducer