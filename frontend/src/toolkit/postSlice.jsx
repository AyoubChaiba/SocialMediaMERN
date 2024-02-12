import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    posts: [],
};

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts(state, action) {
            state.posts = action.payload;
        },
        toggleLike(state, action) {
            const { postId, userId } = action.payload;
            const postIndex = state.posts.findIndex(post => post.id === postId);
            if (postIndex !== -1) {
                const post = state.posts[postIndex];
                if (post.likes.includes(userId)) {
                post.likes = post.likes.filter(id => id !== userId);
                } else {
                post.likes.push(userId);
                }
            }
        },
        deletePost(state, action) {
            const { postId } = action.payload;
            const postIndex = state.posts.findIndex(post => post.id === postId);
            if (postIndex!== -1) {
                state.posts.splice(postIndex, 1);
            }
        },
        updatePost(state, action) {
            const { newPost } = action.payload;
            const postIndex = state.posts.findIndex(post => post.id === newPost.id);
            if (postIndex!== -1) {
                state.posts[postIndex] = newPost;
            }
        },
        addPost(state, action) {
            state.posts = [ action.payload, ...state.posts ];
        }
    },
});

export const { setPosts, toggleLike, deletePost, addPost } = postSlice.actions;
export default postSlice.reducer;
