import React from 'react'
import { useEffect, useRef } from "react";
import { Dimensions, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider, useSelector } from "react-redux";
import BottomSheet, { screenHeight } from "./src/components/BottomSheet";
import Navigation from "./src/navigation/Navigation";

const AppWrapper = () => {
    const screenHeight = Dimensions.get('window').height;
    const ref = useRef(null);

    // const heightPosition = useSelector((state) => state.bottomSheet.heightPosition)
    // console.log('heightHome: ', typeof (heightPosition));
    // useEffect(() => {
    //     ref?.current?.scrollToNumber(-heightPosition)
    // }, [Number(-heightPosition)])
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#00BCD4" translucent={true} />
                <Navigation />
                {/* <BottomSheet ref={ref} /> */}
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

export default AppWrapper

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
