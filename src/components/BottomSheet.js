import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { AntDesign } from '@expo/vector-icons';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

const SPRING_CONFIG = {
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    stiffness: 500,
}

const BottomSheet = () => {
    const height = useWindowDimensions().height;
    const topAnimataion = useSharedValue(height);
    const animationStyle = useAnimatedStyle(() => {
        const top = topAnimataion.value;
        return {
            top,
        };
    });

    const gestureHandler = useAnimatedGestureHandler({
        onStart: (_, context) => {

        }
    })




    return (
        <>
            <PanGestureHandler onGestureEvent={gestureHandler}>
                <Animated.View style={[styles.container, animationStyle]}>
                    <StatusBar hidden={true} />
                    <Pressable onPress={() => {
                        top.value = withSpring(
                            height / 4 * 3,
                            SPRING_CONFIG
                        );
                    }}>
                        <AntDesign name="down" size={24} color="black" />
                    </Pressable>
                    <Text>BottomSheet</Text>
                </Animated.View>
            </PanGestureHandler>
        </>
    )
}


export default BottomSheet

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
})