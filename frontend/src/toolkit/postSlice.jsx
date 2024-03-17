import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    posts: [],
    post:[]
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
        setPost(state, action) {
            state.post = action.payload;
        },
        addPost(state, action) {
            const existingPost = state.posts.find(post => post.id === action.payload.id);
            if (!existingPost) {
                state.posts.unshift(action.payload);
            }
        },
        LikePosts(state, action) {
            const { postId, userId } = action.payload;
            const postIndex = state?.posts?.findIndex(post => post?.id === postId);
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
        LikePost(state, action) {
            const { userId } = action.payload;
            const post = state?.post[0];
            if (post?.likesUser?.includes(userId) ) {
                post.likesUser = post?.likesUser?.filter(id => id !== userId);
                post.likes -= 1;
            } else {
                post.likesUser?.push(userId);
                post.likes += 1;

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

export const { setPosts, setPost, LikePosts, LikePost, deletePost, addPost, Filter } = postSlice.actions;
export default postSlice.reducer;