import React, { useEffect } from 'react';
import { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/Card';
import ChannelCard from '../components/ChannelCard';
import HeaderSearch from '../components/HeaderSearch';
import PlayListCard from '../components/PlayListCard';
import { fetchSearch } from '../redux/searchSlice';

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
    console.log('video: ', listVideoSearch);

    const listChannelSearch = useSelector(
        (state) => state.search.listChannelSearch,
    );
    // console.log('channel: ', listChannelSearch);

    const listPlaylistSearch = useSelector(
        (state) => state.
            search.listPlaylistSearch,
    );
    // console.log('playlist: ', listPlaylistSearch);



    return (
        <View style={styles.container}>
            <HeaderSearch />
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
                        />
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
    }
})