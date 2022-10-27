import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChannel } from '../redux/channelSlice';
import { fetchVideo, videoSliceAction } from '../redux/videoSlice';

const Card = (props) => {
    const { videoId, channelId, handleNavigationToVideoPlayer } = props;
    // console.log('videoId: ', videoId);
    // console.log('channelId: ', channelId);
    const dispatch = useDispatch();
    // console.log(videoId);
    useEffect(() => {
        dispatch(fetchVideo(videoId));  //dispatch thunk action creator (để ra listvideo dựa trên id từng video một)
    }, []);

    useEffect(() => {
        dispatch(fetchChannel(channelId));
    }, [])

    const listVideo = useSelector(
        (state) => state.video.listVideo,
    );

    const listChannel = useSelector(
        (state) => state.channel.listChannel,
    );
    // console.log("listChannel: ", listChannel);


    const video = listVideo.find((item) => item.id === videoId);
    // console.log(video);
    const channel = listChannel.find((item2) => item2.id === channelId);
    // console.log(channel);
    // ---------------  //
    // dispatch id của từng video để dùng ở các màn khác
    // useEffect(() => {
    //     const action = videoSliceAction.updatedVideoId(videoId)
    //     dispatch(action);
    // }, [])

    // ==> không dùng. mà mình click ở màn nào dispatch ở màn đó, tất cả đều dùng chung lên store

    const navigation = useNavigation();
    // console.log(videoId);
    return (
        <View style={styles.card}>
            <TouchableOpacity onPress={() => handleNavigationToVideoPlayer(video, channel)}>
                <Image
                    style={styles.imageCard}
                    source={{
                        uri: video?.snippet.thumbnails.high.url,
                    }}
                />
            </TouchableOpacity>
            <View style={styles.timeContainer}>
                <Text style={styles.time}>{video?.contentDetails.duration}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', position: 'relative', marginBottom: 20, marginTop: 14 }}>

                <Image
                    source={{
                        uri: channel?.snippet.thumbnails.high.url,
                    }}
                    style={styles.avt}
                />

                <View style={{ flex: 1 }}>
                    <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">{video?.snippet.title}</Text>
                    <View style={{ flexDirection: 'row' }} >
                        <Text style={styles.viewer}>{video?.statistics.viewCount}views</Text>
                        <Text style={styles.viewer}>.{video?.snippet.publishedAt}</Text>
                    </View>
                </View>
                <Image source={require('../../assets/icon/More.png')} style={styles.more} />
            </View>
        </View >
    )
}

export default Card

const styles = StyleSheet.create({
    card: {
        marginBottom: 10,
    },

    imageCard: {
        width: '100%',
        height: 215,

    },
    avt: {
        width: 36,
        height: 36,
        borderRadius: 36,
        marginHorizontal: 12,
    },

    title: {
        width: Dimensions.get('screen').width - 100,
        paddingRight: 8,
        color: '#0A0A0A',
        fontWeight: '500',
        marginBottom: 8,
    },

    viewer: {
        color: '#6C6C6C',
        fontWeight: '500',
    },

    more: {
        marginRight: 6,
        marginTop: 6,
        position: 'relative',
        // top: -14,
        alignSelf: 'top'
    },

    timeContainer: {
        backgroundColor: '#000',
        opacity: 0.7,
        width: 36,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        position: 'absolute',
        right: 12,
        bottom: 100,
    },

    time: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 10,
    }


})