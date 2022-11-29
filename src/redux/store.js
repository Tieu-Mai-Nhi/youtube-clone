import { configureStore } from '@reduxjs/toolkit'
import bottomSheetSlice from './bottomSheetSlice';
import channelSlice from './channelSlice';
import commentSlice from './commentSlice';
import historyWordSlice from './historyWordSlice';
import recommendWordSlice from './recommendWordSlice';
import relatedVideoSlice from './relatedVideoSlice';
import searchSlice from './searchSlice';
import videoSlice from './videoSlice';

const store = configureStore({
    reducer: {
        video: videoSlice.reducer,
        channel: channelSlice.reducer,
        search: searchSlice.reducer,
        recommendWord: recommendWordSlice.reducer,
        historyWord: historyWordSlice.reducer,
        comment: commentSlice.reducer,
        relatedVideo: relatedVideoSlice.reducer,
        bottomSheet: bottomSheetSlice.reducer,
    },
})

export default store;