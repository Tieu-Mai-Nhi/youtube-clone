import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import recommendWordApi from "../api/recommendWordApi"


const recommendWordSlice = createSlice({
    name: 'recommendWord',
    initialState: {
        status: 'idle',
        listRecommendWord: [],
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchRecommendWord.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchRecommendWord.fulfilled, (state, action) => {
                // console.log(action.payload);
                state.listRecommendWord = action.payload;
                state.status = 'idle';
            })
            .addCase(fetchRecommendWord.rejected, (state, action) => {
                state.status = 'reject';
            })
    }
})

export const fetchRecommendWord = createAsyncThunk('recommendWord/fetchRecommendWord', async (text) => {
    const listWord = await recommendWordApi.get(text);
    // console.log(listWord.data[1]);
    return listWord.data[1];
})

export default recommendWordSlice;