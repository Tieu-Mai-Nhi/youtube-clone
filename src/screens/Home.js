import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Card from '../components/Card'
import Header from '../components/Header'
import { historyWordSliceAction } from '../redux/historyWordSlice'
import { fetchPopularListVideo, videoSliceAction } from '../redux/videoSlice'
import { channelSliceAction } from '../redux/channelSlice'

const Home = ({ navigation }) => {

    // ----------------------------------------------------------------
    const bottomSheetRef = React.useRef(null);
    const [open, isOpen] = useState(true);
    const snapPoints = ['100%', '75%']


    //--------------------------------//

    const dispatch = useDispatch()
    const popularListVideo = useSelector(
        (state) => state.video.popularListVideo,
    );

    useEffect(() => {
        dispatch(fetchPopularListVideo());   // mới chỉ dispatch thunk action creator, cần dispatch 1 action thực sự sau xử lý ở thunk action nếu muốn custom payload/dữ liệu trước khi nó đc chuyển đến reducer ở store
    }, [])

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

    const handleNavigationToVideoPlayer = (videoSelected, channelSelected) => {
        // console.log(videoSelected); //item ở đây = video sau khi find từ màn Card
        const actionUpdatedVideoId = videoSliceAction.updatedVideoId(videoSelected.id)
        // console.log(actionUpdatedVideoId);
        dispatch(actionUpdatedVideoId)

        const actionUpdatedChannelId = channelSliceAction.updatedChannelId(channelSelected.id)
        // console.log(actionUpdatedChannelId);
        dispatch(actionUpdatedChannelId)


        navigation.navigate('VideoPlayer');
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
            {/* <StatusBar barStyle="dark-content" hidden={true} backgroundColor="#00BCD4" translucent={true} /> */}
            <Header />
            <FlatList
                data={popularListVideo}
                renderItem={renderItemListVideo}
                keyExtractor={item => item.id}
            />

            {/* <BottomSheet
                ref={bottomSheetRef}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
            >
                <BottomSheetView>
                    <Text style={{ color: 'blue', fontSize: 28, backgroundColor: 'orange', width: '100%', textAlign: 'center' }}>Hellorr</Text>
                </BottomSheetView>
            </BottomSheet> */}
        </View>
    )
}

export default Home

const styles = StyleSheet.create({})