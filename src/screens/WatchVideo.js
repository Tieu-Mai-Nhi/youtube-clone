import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { useSelector } from 'react-redux';

const WatchVideo = ({ route }) => {
    const videoId = route.route.params.videoId;
    const linkWeb = 'https://www.youtube.com/watch?v=';
    return (
        <View style={styles.container}>
            <View style={styles.webView}>
                <WebView
                    source={{ uri: `${linkWeb}${videoId}` }}
                    style={{ width: '100%', height: 340 }}
                />
            </View>
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