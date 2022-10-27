import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import relatedVideoApi from '../api/relatedVideoApi';

const relatedVideoSlice = createSlice({
    name: 'relatedVideo',
    initialState: {
        listRelatedVideo: [],
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRelatedVideo.fulfilled, (state, action) => {
            state.listRelatedVideo = action.payload.items;
        });
    },
});

export const fetchRelatedVideo = createAsyncThunk(
    'relatedVideo/fetchRelatedVideo',
    async (videoSelectedId) => {
        const video = relatedVideoApi.getRelatedVideo(videoSelectedId);
        return video;
    },
);

export default relatedVideoSlice;
