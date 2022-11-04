import React, { useCallback, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import { useSelector } from 'react-redux';

export const heightVideo = 300;
const WatchVideo = () => {
    const videoIdSelected = useSelector(
        (state) => state.video.videoId
    );

    const [playing, setPlaying] = useState(false);

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
            Alert.alert("video has finished playing!");
        }
    }, []);

    const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev);
    }, []);

    return (
        <View style={styles.container}>
            {/* <View style={styles.webView}>
                <WebView
                    source={{ uri: `${linkWeb}${videoId}` }}
                    style={{ width: '100%', height: 340 }}
                />
            </View> */}
            <YoutubePlayer
                height={heightVideo}
                play={playing}
                videoId={videoIdSelected}
                onChangeState={onStateChange}
            />
            <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
        </View>
    )
}

export default WatchVideo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: Constants.statusBarHeight
    },
    webView: {
        width: '100%',
        // height: 200
    }
})