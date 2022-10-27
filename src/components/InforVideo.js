import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

const InforVideo = ({ title, view, time, tag, onMoreInfomation }) => {


    const videoIdSelected = useSelector(
        (state) => state.video.videoId
    );


    return (
        <TouchableOpacity style={styles.container} onPress={onMoreInfomation}>
            <View style={styles.left}>
                <Text numberOfLines={2} style={styles.title}>
                    {title}
                </Text>
                <Text style={styles.desc}>
                    {view} views - {time}
                </Text>
            </View>
            <View>
                <MaterialIcons
                    name="keyboard-arrow-down"
                    size={24}
                    color="black"
                />
            </View>
        </TouchableOpacity>
    );
};

export default InforVideo;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    left: {
        width: '90%',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10
    },
    desc: {
        fontSize: 12,
        color: '#6C6C6C',
    },
});
