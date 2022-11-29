import { createSlice } from "@reduxjs/toolkit";

const bottomSheetSlice = createSlice({
    name: 'bottomSheet',
    initialState: {
        heightPosition: '',
    },
    reducers: {
        setScrollPosition: (state, action) => {
            state.heightPosition = action.payload;
        }
    },
})

export const bottomSheetSliceAction = bottomSheetSlice.actions;
export default bottomSheetSlice;