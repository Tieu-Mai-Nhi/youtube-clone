import { configureStore } from '@reduxjs/toolkit'
import channelSlice from './channelSlice';
import recommendWordSlice from './recommendWordSlice';
import searchSlice from './searchSlice';
import videoSlice from './videoSlice';

const store = configureStore({
    reducer: {
        video: videoSlice.reducer,
        channel: channelSlice.reducer,
        search: searchSlice.reducer,
        recommendWord: recommendWordSlice.reducer,
    },
})

export default store;