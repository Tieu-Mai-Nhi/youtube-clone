import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useRef } from 'react'
import { Dimensions, FlatList, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import BottomSheet from '../components/BottomSheet'
import Card from '../components/Card'
import Header from '../components/Header'
import { channelSliceAction } from '../redux/channelSlice'
import { historyWordSliceAction } from '../redux/historyWordSlice'
import { fetchPopularListVideo, videoSliceAction } from '../redux/videoSlice'

const Home = ({ navigation }) => {
    const screenHeight = Dimensions.get('window').height;
    const dispatch = useDispatch()
    const popularListVideo = useSelector(
        (state) => state.video.popularListVideo,
    );

    useEffect(() => {
        dispatch(fetchPopularListVideo());   // mới chỉ dispatch thunk action creator, cần dispatch 1 action thực sự sau xử lý ở thunk action nếu muốn custom payload/dữ liệu trước khi nó đc chuyển đến reducer ở store
    }, [])


    // dùng màn này ban đầu vào load app, lấy về luôn lịch sử tìm kiếm trên async, gửi list word lịch sử lên kho => để lấy ra ở màn subscreen
    useEffect(() => {
        handleGetWord()
    }, [])

    const handleGetWord = async () => {
        try {
            const text1 = await AsyncStorage.getItem('keyWord');
            // console.log('getAsyn: ', text1);
            const list = await JSON.parse(text1);
            // console.log('listAsync: ', list);
            dispatch(historyWordSliceAction.saveHistoryList(list));
        }
        catch (error) {
            console.log(error);
        }
    }

    const ref = useRef(null);

    const handleNavigationToVideoPlayer = (videoSelected, channelSelected) => {
        // console.log(videoSelected); //item ở đây = video sau khi find từ màn Card
        const actionUpdatedVideoId = videoSliceAction.updatedVideoId(videoSelected.id)
        // console.log(actionUpdatedVideoId);
        dispatch(actionUpdatedVideoId)

        const actionUpdatedChannelId = channelSliceAction.updatedChannelId(channelSelected.id)
        // console.log(actionUpdatedChannelId);
        dispatch(actionUpdatedChannelId)
        // navigation.navigate('VideoPlayer');
        // hàm mở bottomSheet
        ref?.current?.scrollTo(-screenHeight)
    }


    // console.log(status)
    const renderItemListVideo = ({ item }) => {
        // console.log(item);
        return (
            <Card
                videoId={item.id}
                channelId={item.snippet.channelId}
                handleNavigationToVideoPlayer={handleNavigationToVideoPlayer}
            />
        )
    }

    return (
        <View>
            <Header />
            <FlatList
                data={popularListVideo}
                renderItem={renderItemListVideo}
                keyExtractor={item => item.id}
            />
            <BottomSheet ref={ref} />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({})