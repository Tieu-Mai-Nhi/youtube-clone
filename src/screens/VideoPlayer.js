import React, { useEffect, useRef } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { decay } from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'
import { showLike, showSubscribe, showTime, showView } from '../../utils/video'
import { screenHeight } from '../components/BottomSheet'
import BottomSheetComment, { bottomSheetHeight } from '../components/BottomSheetComment'
import BottomSheetInfor from '../components/BottomSheetInfor'
import Card from '../components/Card'
import Channel from '../components/Channel'
import Comment from '../components/Comment'
import InforVideo from '../components/InforVideo'
import OptionBar from '../components/OptionBar'
import { channelSliceAction } from '../redux/channelSlice'
import { fetchListComments } from '../redux/commentSlice'
import { fetchRelatedVideo } from '../redux/relatedVideoSlice'
import { videoSliceAction } from '../redux/videoSlice'
import WatchVideo from './WatchVideo'


const VideoPlayer = ({ navigation }) => {

    const dispatch = useDispatch()
    const popularListVideo = useSelector(
        (state) => state.video.popularListVideo,
    );

    const listVideo = useSelector(
        (state) => state.video.listVideo,
    );
    // console.log(listVideo);

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
    }, [videoIdSelected])

    useEffect(() => {
        dispatch(fetchRelatedVideo(videoIdSelected));
        // console.log((fetchRelatedVideo(videoIdSelected)));
    }, [videoIdSelected]);

    const listComments = useSelector(
        (state) => state.comment.listComments
    )
    // console.log(listComments);

    const listRelatedVideo = useSelector(
        (state) => state.relatedVideo.listRelatedVideo
    )
    // console.log(listRelatedVideo);

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
        // navigation.navigate('VideoPlayer');

        // onShowBottomSheet
        console.log('red: ', ref?.current?.scrollTo(-screenHeight));
        ref?.current?.scrollTo(-screenHeight)
    }

    const views = showView(videoSelected?.statistics.viewCount)
    const timeDimensions = showTime(videoSelected?.snippet.publishedAt)

    const likes = Number(showLike(videoSelected?.statistics.likeCount));
    // console.log(likes);
    const subscribed = showSubscribe(channelSelected?.statistics.subscriberCount)
    const dateVideo = new Date(videoSelected?.snippet.publishedAt);
    const day = dateVideo.getDate();
    const month = dateVideo.getMonth() + 1;
    const year = dateVideo.getFullYear();
    const descVideo = videoSelected?.snippet.description;
    // console.log(descVideo);

    const ref = useRef(null);
    const refInfor = useRef(null);
    const refComment = useRef(null);

    const handleShowMoreInformation = () => {
        refInfor?.current?.scrollTo(-bottomSheetHeight - 80)
    }

    const handleShowMoreComment = () => {
        refComment?.current?.scrollTo(-bottomSheetHeight - 80)
    }

    return (
        <View>
            <WatchVideo />
            <ScrollView style={{ marginTop: 230, paddingHorizontal: 16, backgroundColor: 'white' }}>
                <InforVideo
                    title={videoSelected?.snippet.title}
                    view={views}
                    time={timeDimensions}
                    tag={videoSelected?.snippet.tags}
                    onMoreInformation={handleShowMoreInformation}
                />
                <OptionBar
                    like={likes}
                    dislike={Number(videoSelected?.statistics.commentCount)}
                />
                <Channel
                    avt={channelSelected?.snippet.thumbnails.high.url}
                    channelName={channelSelected?.snippet.title}
                    subscribed={subscribed}
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
            <BottomSheetComment ref={refComment} />
            <BottomSheetInfor
                ref={refInfor}
                title={videoSelected?.snippet.title}
                avatar={channelSelected?.snippet.thumbnails.high.url}
                nameChannel={channelSelected?.snippet.title}
                like={likes}
                desc={descVideo}
                view={videoSelected?.statistics.viewCount}
                day={day}
                month={month}
                year={year}
            />
        </View>
    )
}

export default VideoPlayer

const styles = StyleSheet.create({})