import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { forwardRef, useCallback } from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { heightVideo } from '../screens/WatchVideo';
import { useImperativeHandle } from 'react';
import { useSelector } from 'react-redux';
import UserComment from './UserComment';
import { showLike, showTime } from '../../utils/video';


const screenHeight = Dimensions.get('window').height;
const MAX_TRANSLATE_Y = -(screenHeight - heightVideo + 80);
// console.log(MAX_TRANSLATE_Y);
export const bottomSheetHeight = screenHeight - heightVideo;
const BottomSheetComment = forwardRef(({ title, avatar, nameChannel, like, desc, view, day, month, year }, ref) => {

    const translateY = useSharedValue(0);
    const context = useSharedValue({ y: 0 }); // lưu trữ vị trí trc đó, để kéo lần sau nó không reset giật lại vị trí ban đầu

    const scrollTo = useCallback((heighPosition) => {
        'worklet';
        translateY.value = withSpring(heighPosition, { damping: 50 })
    }, []);

    useImperativeHandle(ref, () => ({ scrollTo }), [scrollTo])

    const dragThresHold = -(screenHeight / 5 * 3);  // -780
    // dùng screenHeight vì nó cố định, dùng bottomcomment và chi tiết, size thay đổi theo nội dung
    // console.log(dragThresHold);


    const gesture = Gesture.Pan()
        .onStart(() => {
            context.value = { y: translateY.value }
            // console.log('vị trí dừng lần trước: ', context.value);
        })

        .onUpdate((event) => {
            translateY.value = event.translationY + context.value.y;
            // console.log('quãng đường di chuyển: ', event.translationY);

            console.log('vị trí dừng cuối cùng: ', translateY.value);

            translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y) // khoảng kéo lên max
        })

        .onEnd(() => {
            if (translateY.value < dragThresHold) {
                scrollTo(MAX_TRANSLATE_Y)
            } else if (translateY.value > dragThresHold) {
                scrollTo(0)
            }
        })

    const bottomSheetStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }] //dịch chuyển
        };
    });

    const handleClose = () => {
        ref?.current?.scrollTo(0)
    }

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.container, bottomSheetStyle]}>
                <View style={styles.header}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                        Nội dung mô tả
                    </Text>
                    <TouchableOpacity onPress={handleClose} style={{ marginBottom: 6 }}>
                        <AntDesign name="close" size={30} color="black" />
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.content}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.channel}>
                        <Image style={styles.avatar} source={{ uri: avatar }} />
                        <Text>{nameChannel}</Text>
                    </View>
                    <View style={styles.infoVideo}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold' }}>
                                {like}
                            </Text>
                            <Text>Lượt thích</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold' }}>{view}</Text>
                            <Text>Lượt xem</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold' }}>
                                {day} tháng {month}
                            </Text>
                            <Text>{year}</Text>
                        </View>
                    </View>
                    <View style={styles.desc}>
                        <Text>{desc}</Text>
                    </View>
                </ScrollView>
            </Animated.View>
        </GestureDetector>
    )
})

export default BottomSheetComment

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        height: screenHeight,
        position: 'absolute',
        top: screenHeight,
        left: 0,
        right: 0,
        bottom: 0,
        paddingRight: 6
    },

    header: {
        marginTop: 10,
        color: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 14
    },

    content: {},
    title: {
        padding: 12,
        fontSize: 15,
        fontWeight: 'bold',
    },
    channel: {
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 36 / 2,
        marginRight: 10,
    },
    infoVideo: {
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
    },
    desc: {
        padding: 12,
    }
})