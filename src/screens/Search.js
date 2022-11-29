import React, { useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BottomSheet, { screenHeight } from '../components/BottomSheet';
import Card from '../components/Card';
import ChannelCard from '../components/ChannelCard';
import HeaderSearch from '../components/HeaderSearch';
import PlayListCard from '../components/PlayListCard';
import { channelSliceAction } from '../redux/channelSlice';
import { fetchSearch } from '../redux/searchSlice';
import { videoSliceAction } from '../redux/videoSlice';


const SearchScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    // const [loading, setLoading] = useState(false)
    const keyWord = useSelector((state) => state.search.keyWord);
    // console.log(keyWord);
    useEffect(() => {
        dispatch(fetchSearch(keyWord));
    }, [])

    const listVideoSearch = useSelector(
        (state) => state.search.listVideoSearch,
    );
    // console.log('video: ', listVideoSearch);

    const listChannelSearch = useSelector(
        (state) => state.search.listChannelSearch,
    );
    // console.log('channel: ', listChannelSearch);

    const listPlaylistSearch = useSelector(
        (state) => state.
            search.listPlaylistSearch,
    );
    // console.log('playlist: ', listPlaylistSearch);

    const handleNavigation = () => {
        navigation.popToTop();
    }

    const handleFocus = () => {
        navigation.goBack();
    }
    const ref = useRef(null);
    const handleNavigationToVideoPlayer = (videoSelected, channelSelected) => {
        console.log(videoSelected); //item ở đây = video sau khi find từ màn Card
        const actionUpdatedVideoId = videoSliceAction.updatedVideoId(videoSelected.id)
        // console.log(actionUpdatedVideoId);
        dispatch(actionUpdatedVideoId)

        const actionUpdatedChannelId = channelSliceAction.updatedChannelId(channelSelected.id)
        // console.log(actionUpdatedChannelId);
        dispatch(actionUpdatedChannelId)

        // // hàm mở bottomSheet
        ref?.current?.scrollTo(-screenHeight)
    }

    return (
        <View style={styles.container}>
            <HeaderSearch
                value={keyWord} //vẫn hiện keyword ở ô input
                onGoBack={handleNavigation}
                onFocus={handleFocus}  // focus vào lùi về
            />
            {/* {loading ? <ActivityIndicator style={{ marginVertical: 10 }} /> : null} */}

            <ScrollView>
                {listChannelSearch.map((item) => (
                    <ChannelCard
                        key={item.id.channelId}
                        channelId={item.id.channelId}
                        channelTitle={item.snippet.title}
                        url={item.snippet.thumbnails.high.url}
                    />
                ))}
                {listPlaylistSearch.map((item) => (
                    <PlayListCard
                        key={item.id.playlistId}
                        playlistId={item.id.playlistId}
                        url={item.snippet.thumbnails.high.url}
                        title={item.snippet.title}
                        channelTitle={item.snippet.channelTitle}
                    />
                ))}
                {listVideoSearch.map((item) => {
                    return (
                        <Card
                            key={item.id.videoId}
                            videoId={item.id.videoId}
                            channelId={item.snippet.channelId}
                            handleNavigationToVideoPlayer={handleNavigationToVideoPlayer}
                        />
                    )
                })}
            </ScrollView>

            <BottomSheet ref={ref} />
        </View>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
    }
})