import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    posts: [],
};

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts(state, action) {
            const existingPosts = state.posts.filter(post => action.payload.some(newPost => newPost.id === post.id));
            const newPosts = action.payload.filter(post => !existingPosts.some(existingPost => existingPost.id === post.id));
            state.posts = [...state.posts, ...newPosts];
        },
        addPost(state, action) {
            const existingPost = state.posts.find(post => post.id === action.payload.id);
            if (!existingPost) {
                state.posts.unshift(action.payload);
            }
        },
        toggleLike(state, action) {
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
        deletePost(state, action) {
            const { postId } = action.payload;
            const postIndex = state.posts.findIndex(post => post.id === postId);
            if (postIndex!== -1) {
                state.posts.splice(postIndex, 1);
            }
        },
        Filter(state, action) {
            state.posts = action.payload
        }
    },
});

export const { setPosts, toggleLike, deletePost, addPost, Filter } = postSlice.actions;
export default postSlice.reducer;
