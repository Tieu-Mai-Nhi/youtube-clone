import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import VideoPlayer from '../screens/VideoPlayer';


// console.log(screenHeight)
export const screenHeight = Dimensions.get('window').height;
const BottomSheet = forwardRef(({ }, ref) => {

    const refVideoPlayer = useRef(null);
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
            console.log('vị trí dừng lần trước: ', context.value);
        })

        .onUpdate((event) => {
            translateY.value = event.translationY + context.value.y;
            console.log('di chuyển: ', event.translationY);
            console.log('vị trí dừng hiện tại: ', translateY.value);
            // console.log('ngưỡng trên: ', dragThresHold);
            translateY.value = Math.max(translateY.value, -screenHeight)  // kéo max đi lên: nên là số âm
            // translateY.value = Math.min(translateY.value, screenHeight - 100) // kéo max đi xuống: nên là dương
            //set giá trị cực trị,  cuộn cao nhất, cho cuộn tối đa đến khi chạm vào cạnh trên = màn hình
        })
        // cuộn lên/xuống
        .onEnd(() => {

            if (translateY.value < dragThresHold) {
                scrollTo(-screenHeight)
            } else if (translateY.value > dragThresHold) {
                scrollTo(-200)
            }
        })


    // animation
    const bottomSheetStyle = useAnimatedStyle(() => {
        // hiệu ứng border
        // const borderRadius = interpolate(
        //     translateY.value,
        //     [-screenHeight + 50 + 30, -screenHeight + 50],   // nếu translate y di chuyển đến vị trí + 30 thì nó =25 -> về 0 thì nó = 5
        //     [25, 5],
        //     Extrapolate.CLAMP // chặn không cho vượt ra ngoài biên
        // )

        return {
            // borderRadius: borderRadius,
            transform: [{ translateY: translateY.value }] //dịch chuyển
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
        // borderRadius: 25,
        height: screenHeight,
        top: screenHeight,  //vị trí đầu tiên
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