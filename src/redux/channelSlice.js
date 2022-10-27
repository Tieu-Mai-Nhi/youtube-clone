import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import channelApi from "../api/channelApi";

const channelSlice = createSlice({
    name: 'channel',
    initialState: {
        status: 'idle',
        listChannel: [],
        channelId: '',
    },
    reducers: {
        updatedChannelId: (state, action) => {
            state.channelId = action.payload;
            // console.log(action.payload);
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchChannel.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchChannel.fulfilled, (state, action) => {
                state.listChannel = [...state.listChannel, ...action.payload.items];
                // console.log('action.payload.channelSlice: ', action.payload.items);
                state.status = 'idle';
            })
    }
})

export const fetchChannel = createAsyncThunk('channel/fetchListChannel', async (channelId) => {
    const listEachChannel = await channelApi.getChannel(channelId);
    // console.log(listEachChannel);
    return listEachChannel;
})

export const channelSliceAction = channelSlice.actions;
export default channelSlice;