import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WatchVideo from './WatchVideo'

const VideoPlayer = (route) => {
    // console.log(route);
    return (
        <View>
            <WatchVideo route={route} />
        </View>
    )
}

export default VideoPlayer

const styles = StyleSheet.create({})