import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import searchApi from "../api/searchApi";

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        status: 'idle',
        keyWord: '',
        listVideoSearch: [],
        listChannelSearch: [],
        listPlaylistSearch: [],
    },
    reducers: {
        updateKeyWord(state, action) {
            state.keyWord = action.payload;
            // console.log('action.payload.searchSlice: ', action.payload);
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchSearch.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchSearch.fulfilled, (state, action) => {
                // console.log('Extra.action.payload.searchSlice: ', action.payload);
                state.status = 'idle';
                state.listVideoSearch = [];
                state.listChannelSearch = [];
                state.listPlaylistSearch = [];
                const list = action.payload.items;
                // console.log('action.payload.items: ', list);
                for (let i = 0; i < list.length; i++) {
                    if (list[i].id.kind === 'youtube#video') {
                        state.listVideoSearch.push(list[i]);
                    } else if (list[i].id.kind === 'youtube#channel') {
                        state.listChannelSearch.push(list[i]);
                    } else if (list[i].id.kind === 'youtube#playlist') {
                        state.listPlaylistSearch.push(list[i]);
                    }
                }
            })

    }
})

export const searchSliceAction = searchSlice.actions;

export const fetchSearch = createAsyncThunk('search/fetchSearch', async (keyWord) => {
    const listSearch = await searchApi.get(keyWord)
    // console.log(listSearch);
    return listSearch;
})
export default searchSlice;