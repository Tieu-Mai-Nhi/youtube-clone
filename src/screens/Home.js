import React from 'react'
import { useEffect } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../components/Card'
import Header from '../components/Header'
import { fetchPopularListVideo } from '../redux/videoSlice'

const Home = ({ navigation }) => {

    const dispatch = useDispatch()
    const popularListVideo = useSelector(
        (state) => state.video.popularListVideo,
    );


    // console.log(popularListVideo);
    // const status = useSelector(
    //     (state) => state.video.status,
    // );

    useEffect(() => {
        dispatch(fetchPopularListVideo());   // mới chỉ dispatch thunk action creator, cần dispatch 1 action thực sự sau xử lý ở thunk action
    }, [])

    // console.log(status)
    const renderItemListVideo = ({ item }) => {
        // console.log(item);
        return (
            <Card
                videoId={item.id}
                channelId={item.snippet.channelId}
            />
        )
    }


    const handleScroll = () => {

    }

    return (
        <View>
            <Header />
            <FlatList
                data={popularListVideo}
                renderItem={renderItemListVideo}
                keyExtractor={item => item.id}
                onScroll={handleScroll}
            />

        </View>
    )
}

export default Home

const styles = StyleSheet.create({})