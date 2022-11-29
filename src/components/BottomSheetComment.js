import { Dimensions, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
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
export const bottomSheetHeight = screenHeight - heightVideo;
const BottomSheetComment = forwardRef(({ }, ref) => {

    const listComment = useSelector((state) => state.comment.listComments)
    // console.log(listComment);

    const renderItem = ({ item }) => {
        let timeString = showTime(
            item.snippet.topLevelComment.snippet.publishedAt,
        );
        let likeCount = showLike(
            item.snippet.topLevelComment.snippet.likeCount,
        );
        return (
            <UserComment
                avatar={
                    item.snippet.topLevelComment.snippet.authorProfileImageUrl
                }
                userName={
                    item.snippet.topLevelComment.snippet.authorDisplayName
                }
                time={timeString}
                comment={item.snippet.topLevelComment.snippet.textOriginal}
                like={likeCount}
            />
        );
    };


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
    const MAX_TRANSLATE_Y = -(screenHeight - heightVideo + 80);

    const gesture = Gesture.Pan()
        .onStart(() => {
            context.value = { y: translateY.value }
            // console.log('vị trí dừng lần trước: ', context.value);
        })

        .onUpdate((event) => {
            translateY.value = event.translationY + context.value.y;
            // console.log('quãng đường di chuyển: ', event.translationY);

            // console.log('vị trí dừng cuối cùng: ', translateY.value);

            translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y) // khoảng kéo lên max
        })

        .onEnd(() => {
            if (translateY.value < dragThresHold) {
                scrollTo(MAX_TRANSLATE_Y)
            } else {
                scrollTo(0)
            }
        })

    const bottomSheetStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }]
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
                        Bình luận
                    </Text>
                    <TouchableOpacity onPress={handleClose} style={{ marginBottom: 6 }}>
                        <AntDesign name="close" size={30} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.comment}>
                    <FontAwesome name="user-circle-o" size={24} color="black" />
                    <TextInput
                        style={{ width: '85%', marginLeft: 12, borderWidth: 1, padding: 6, alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}
                        placeholder="Viết bình luận..."
                    />
                </View>
                <FlatList
                    data={listComment}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
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

    comment: {
        marginVertical: 8,
        marginBottom: 14,
        flexDirection: 'row',
        marginLeft: 12,
        alignItems: 'center',
    },
})