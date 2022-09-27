import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
    name: 'video',
    initialState: [],
    reducers: {
        render: (state, action) => {
            return action.payload;
        }
    },
})


const { actions, reducer } = videoSlice;
export const { render } = actions;
export default reducer;