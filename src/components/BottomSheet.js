import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { Dimensions, StatusBar, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import VideoPlayer from '../screens/VideoPlayer';


// console.log(screenHeight)
export const screenHeight = Dimensions.get('window').height;
const BottomSheet = forwardRef(({ }, ref) => {

    const translateY = useSharedValue(0);
    const context = useSharedValue({ y: 0 }); // lưu trữ vị trí trc đó, để kéo lần sau nó không reset giật lại vị trí ban đầu

    const scrollTo = useCallback((heighPosition) => {
        'worklet';
        // console.log("A", heighPosition);
        translateY.value = withSpring(heighPosition, { damping: 50 })
    }, []);

    useImperativeHandle(ref, () => ({ scrollTo }));

    const dragThresHold = -(screenHeight - screenHeight / 8);  // -780

    const gesture = Gesture.Pan()
        .onStart(() => {
            context.value = { y: translateY.value }
            // console.log('vị trí dừng lần trước: ', context.value);
        })

        .onUpdate((event) => {
            translateY.value = event.translationY + context.value.y;
            // console.log('di chuyển: ', event.translationY);
            console.log('vị trí dừng hiện tại: ', translateY.value);
            console.log('ngưỡng trên: ', dragThresHold);
            translateY.value = Math.max(translateY.value, -screenHeight)  // kéo max đi lên: nên là số âm
            //set giá trị cực trị,  cuộn cao nhất, cho cuộn tối đa đến khi chạm vào cạnh trên = màn hình
        })

        // giật lên/xuống
        .onEnd(() => {
            if (translateY.value < dragThresHold) {
                scrollTo(-screenHeight)
            } else if (translateY.value > -200) {
                scrollTo(0)
            }
            // -150 
            else if (-200 > translateY.value > dragThresHold) {
                scrollTo(-200)
            }
            else {
                scrollTo(-screenHeight)
            }
        })


    // animation
    const bottomSheetStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }]
        };
    });

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.bottomSheetContainer, bottomSheetStyle]}>
                <VideoPlayer />
            </Animated.View>
        </GestureDetector>
    )
})
const styles = StyleSheet.create({
    bottomSheetContainer: {
        height: screenHeight,
        top: screenHeight,  //+ 40vị trí đầu tiên
        flex: 1,
        backgroundColor: 'white',
        position: 'absolute',
        left: 0,
        right: 0,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex: 100
    },
})

export default BottomSheet