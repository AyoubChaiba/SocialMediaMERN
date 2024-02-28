import {createSlice} from '@reduxjs/toolkit';

let initialState = {
    profile : null ,
    posts : []
}

export const profileSlice = createSlice({
    name : 'user',
    initialState ,
    reducers : {
        setProfile(state,action) {
            state.profile = action.payload
        },
        setPostProfile(state, action) {
            state.posts = action.payload
        }
    }
})


const profileReducer = profileSlice.reducer

export const { setProfile, setPostProfile  } = profileSlice.actions

export default profileReducer