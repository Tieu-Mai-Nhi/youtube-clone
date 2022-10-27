import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import WatchVideo from './WatchVideo'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../components/Card'
import InforVideo from '../components/InforVideo'
import OptionBar from '../components/OptionBar'
import Channel from '../components/Channel'
import Comment from '../components/Comment'
import { fetchListComments } from '../redux/commentSlice'
import { fetchRelatedVideo } from '../redux/relatedVideoSlice'
import { videoSliceAction } from '../redux/videoSlice'
import { channelSliceAction } from '../redux/channelSlice'


const VideoPlayer = ({ navigation }) => {
    const dispatch = useDispatch()
    const popularListVideo = useSelector(
        (state) => state.video.popularListVideo,
    );

    const listVideo = useSelector(
        (state) => state.video.listVideo,
    );
    // console.log(listVideo);
    // ==> đây là list video lẻ

    const listChannel = useSelector(
        (state) => state.channel.listChannel,
    );

    const videoIdSelected = useSelector(
        (state) => state.video.videoId,
    )
    // console.log(videoIdSelected)
    // ; ==> id của video đc chọn => sau đó dùng list.find => dữ liệu video đc chọn

    const channelIdSelected = useSelector(
        (state) => state.channel.channelId,
    )
    // console.log(channelIdSelected)

    const videoSelected = listVideo.find((item) => item.id === videoIdSelected);
    // console.log(videoSelected);

    const channelSelected = listChannel.find((item) => item.id === channelIdSelected);
    // console.log(channelSelected);

    useEffect(() => {
        dispatch(fetchListComments(videoIdSelected));
        // console.log(fetchListComments(videoIdSelected));
        // console.log("1");
    }, [videoIdSelected])

    useEffect(() => {
        dispatch(fetchRelatedVideo(videoIdSelected));
    }, [videoIdSelected]);

    const listComments = useSelector(
        (state) => state.comment.listComments
    )
    // console.log(listComments);

    const listRelatedVideo = useSelector(
        (state) => state.relatedVideo.listRelatedVideo
    )
    console.log(listRelatedVideo);

    const handleShowMoreInformation = () => {

    }

    const handleShowMoreComment = () => {

    }

    const renderItemListVideo = ({ item }) => {
        // console.log(item);
        return (
            <Card
                videoId={item.id}
                channelId={item.snippet.channelId}
            />
        )
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

    return (
        <View>
            <WatchVideo />
            <ScrollView style={{ marginTop: 226, paddingHorizontal: 16 }}>
                <InforVideo
                    title={videoSelected.snippet.title}
                    view={videoSelected.statistics.viewCount}
                    time={videoSelected.contentDetails.dimension}
                    tag={videoSelected.snippet.tags}
                    onMoreInfomation={handleShowMoreInformation}
                />
                <OptionBar
                    like={videoSelected.statistics.likeCount}
                    dislike={videoSelected.statistics.commentCount}
                />
                <Channel
                    avt={channelSelected.snippet.thumbnails.high.url}
                    channelName={channelSelected.snippet.title}
                    subscribed={channelSelected.statistics.subscriberCount}
                />
                <Comment
                    numberComments={'108'}
                    // để cứng vì mình lấy maxComment = 10
                    avtUser={listComments[0]?.snippet.topLevelComment.snippet.authorProfileImageUrl}
                    comment={listComments[0]?.snippet.topLevelComment.snippet.textOriginal}
                    onShowMoreComment={handleShowMoreComment}
                />

                {listRelatedVideo.map((item) => {
                    return (
                        <Card
                            handleNavigationToVideoPlayer={handleNavigationToVideoPlayer}
                            key={item.id.videoId}
                            channelId={item.snippet.channelId}
                            videoId={item.id.videoId}
                        />
                    );
                })}
            </ScrollView>

            {/* <FlatList
                data={popularListVideo}
                renderItem={renderItemListVideo}
                keyExtractor={item => item.id}
            /> */}

        </View>
    )
}

export default VideoPlayer

const styles = StyleSheet.create({})