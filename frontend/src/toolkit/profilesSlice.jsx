import {createSlice} from '@reduxjs/toolkit';

let initialState = {
    profile : null ,
    posts : []
}

export const profileSlice = createSlice({
    name : 'profile',
    initialState ,
    reducers : {
        setProfile(state,action) {
            state.profile = action.payload
        },
        setPostProfile(state, action) {
            state.posts = action.payload
        },
        postProfileLike(state, action) {
            const { postId, userId } = action.payload;
            const postIndex = state.posts.findIndex(post => post.id === postId);
            if (postIndex !== -1) {
                const post = state.posts[postIndex];
                if (post.likesUser.includes(userId)) {
                    post.likesUser = post.likesUser.filter(id => id !== userId);
                    post.likes -= 1;
                } else {
                    post.likesUser.push(userId);
                    post.likes += 1;
                }
            }
        },
        deleteProfilePost(state, action) {
            const { postId } = action.payload;
            const postIndex = state.posts.findIndex(post => post.id === postId);
            if (postIndex!== -1) {
                state.posts.splice(postIndex, 1);
            }
        }
    }
})


const profileReducer = profileSlice.reducer

export const { setProfile, setPostProfile, postProfileLike, deleteProfilePost } = profileSlice.actions

export default profileReducer