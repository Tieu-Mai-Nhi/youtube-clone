import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import commentApi from "../api/commentApi";

const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        status: 'idle',
        listComments: [],
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchListComments.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchListComments.fulfilled, (state, action) => {
                // console.log(action.payload);
                state.listComments = action.payload.items;
                // console.log(action.payload);
                state.status = 'idle';
            })
            .addCase(fetchListComments.rejected, (state, action) => {
                state.status = 'reject';
            })
    }
})

export const fetchListComments = createAsyncThunk('comment/fetchListComments', async (videoId) => {
    const listComments = await commentApi.getComment(videoId);
    // console.log('listComments gọi từ api: ', listComments);
    return listComments;
})

export default commentSlice;