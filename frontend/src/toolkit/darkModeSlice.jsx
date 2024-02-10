import {createSlice} from '@reduxjs/toolkit';

let initialState = {
    mode : JSON.parse(sessionStorage.getItem('dark-mode')),
}

export const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState ,
    reducers: {
        setDarkMode(state, action) {
            state.mode = action.payload;
        }
    }
})

const darkModeReducer = darkModeSlice.reducer

export const { setDarkMode } = darkModeSlice.actions

export default darkModeReducer