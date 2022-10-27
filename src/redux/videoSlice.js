import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import videoApi from "../api/videoApi";

const videoSlice = createSlice({
    name: 'video',
    initialState: {
        status: 'idle',  // lưu trạng thái của request đến api
        popularListVideo: [],
        videoId: '',
        // videoSearch: [],
        listVideo: [],
    },
    reducers: {
        updatedVideoId: (state, action) => {
            state.videoId = action.payload;
            // console.log(action.payload);
        }
    },
    extraReducers: builder => {  // xử lý các logic
        builder
            .addCase(fetchPopularListVideo.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchPopularListVideo.fulfilled, (state, action) => {
                // console.log(state.popularListVideo);
                // console.log(action.payload.items);                // giống tạo action, reducer
                state.popularListVideo = action.payload.items;
                // console.log(state.popularListVideo);
                state.status = 'idle';
            })
            .addCase(fetchPopularListVideo.rejected, (state, action) => {
                state.status = 'failed';
            })


            .addCase(fetchVideo.fulfilled, (state, action) => {
                // console.log(action.payload.items);
                state.listVideo = [...state.listVideo, ...action.payload.items];
                // state.listVideo = action.payload.items;
            })

    }
})

// thunk func creator trả về 3 thunk action (pending, fulfilled, rejected)
export const fetchPopularListVideo = createAsyncThunk('video/fetchPopularListVideo', async () => {
    const video = await videoApi.getVideoMostPopular();
    // console.log(video);
    return video;   //obj
})

//tạo thunk action , cần nhận vào action obj mới nhất
export const fetchVideo = createAsyncThunk('video/fetchVideo', async (videoId) => {
    const listEachVideo = await videoApi.getVideo(videoId);   //videoId? = videoId truyền từ video Popular từ màn Home của component Card khi dispatch
    // console.log(listEachVideo);
    return listEachVideo;
})


export const videoSliceAction = videoSlice.actions;
export default videoSlice;