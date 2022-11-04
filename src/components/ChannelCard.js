import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function ChannelCard({ channelId, url, channelTitle }) {
    return (
        <View style={styles.container}>
            <View style={styles.avt}>
                <Image source={{ uri: url }} style={styles.image} />
            </View>
            <View style={styles.text}>
                <Text style={styles.channelName}>{channelTitle}</Text>
                <Text style={styles.videos}>2.2k videos</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.subscribed}>SUBSCRIBED</Text>
                    <FontAwesome name="bell" size={24} color="red" />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        width: '100%',
        height: 200,
        borderTopWidth: 4,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    avt: {
        width: '50%',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: '50%',
    },
    text: {
        width: '50%',
        marginHorizontal: 4
        // alignItems: 'center',
    },

    channelName: {
        fontSize: 16,
        fontWeight: '500'
    },
    videos: {
        marginVertical: 4,
        opacity: 0.8
    },

    subscribed: {
        color: 'red',
        fontSize: 16,
        fontWeight: '600',
        marginRight: 8,
    }
})