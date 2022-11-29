import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { showDurationVideo, showTime, showView } from '../../utils/video';
import { fetchChannel } from '../redux/channelSlice';
import { fetchVideo } from '../redux/videoSlice';

const Card = (props) => {
    const screenHeight = Dimensions.get('window').height;
    const { videoId, channelId, handleNavigationToVideoPlayer } = props;
    // videoId, channelId đi theo cả list nên phải dùng find để lọc ra, thành từng cái lẻ sẽ có nhiều props hơn

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchVideo(videoId)); // call api lấy về list video là từng video lẻ
    }, []);

    useEffect(() => {
        dispatch(fetchChannel(channelId));
    }, [])

    const listVideo = useSelector(
        (state) => state.video.listVideo,
        console.log(listVideo)
    );

    const listChannel = useSelector(
        (state) => state.channel.listChannel,
    );

    const video = listVideo.find((item) => item.id === videoId);
    // console.log(video);

    const channel = listChannel.find((item2) => item2.id === channelId);
    // console.log(channel);

    // fix syntax
    const timeDurationString = video?.contentDetails.duration;
    // console.log(timeDurationString);
    const viewString = showView(video?.statistics.viewCount);
    // console.log(viewString);
    const dateString = showTime(video?.snippet.publishedAt);

    const durationVideo = showDurationVideo(video?.contentDetails.duration);


    return (
        <View style={styles.card}>
            <TouchableOpacity onPress={() => handleNavigationToVideoPlayer(video, channel)}>
                {/* click vào 1 video thì nhận được 1 video và 1 channel đó => để truyền sang màn home => màn home dispatch (video và channel này, sau đó .id) => videoplayer useSelector về dùng*/}

                <Image
                    style={styles.imageCard}
                    source={{
                        uri: video?.snippet.thumbnails.high.url,
                    }}
                />
            </TouchableOpacity>
            <View style={styles.timeContainer}>
                <Text style={styles.time}>{durationVideo}</Text>
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
                        <Text style={styles.viewer}>{viewString}</Text>
                        <Text style={styles.viewer}> - {dateString}</Text>
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
        alignSelf: 'top',
    },

    timeContainer: {
        backgroundColor: '#000',
        opacity: 0.7,
        width: 44,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        position: 'absolute',
        right: 12,
        bottom: 120,
    },

    time: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 10,
    }


})