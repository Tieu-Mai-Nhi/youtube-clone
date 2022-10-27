import { createSlice } from "@reduxjs/toolkit";

const historyWordSlice = createSlice({
    name: 'historyWord',
    initialState: {
        status: 'idle',  // lưu trạng thái của request đến api
        historyListWord: [],
    },
    reducers: {
        saveHistoryList: (state, action) => {
            state.historyListWord = action.payload;
        }
    },
})

export const historyWordSliceAction = historyWordSlice.actions;
export default historyWordSlice;