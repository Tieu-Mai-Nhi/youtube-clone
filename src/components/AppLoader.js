import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'

const AppLoader = () => {
    return (
        <View style={[styles.container, StyleSheet.absoluteFill]}>
            <LottieView style={styles.icon} source={require('../../assets/image/59700-dragon-flying-fly-dragao-voador-voando.json')} autoPlay loop />
            {/* <Text>Loading...</Text> */}
        </View>
    )
}

export default AppLoader

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        opacity: 0.9,
        zIndex: 100,
        flex: 1,
    },
    icon: {
        width: 150,
        height: 150,
    }
})