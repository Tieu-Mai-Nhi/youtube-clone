import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

const PlayListCard = ({ url, title, channelTitle }) => {
    return (
        <View style={styles.playListCard}>
            <View style={{ flexDirection: 'row' }}>
                <Image
                    source={{
                        uri: url,
                    }}
                    style={styles.image}
                />
                <View style={styles.subThumbnail}>
                    <Text style={{ color: 'white', fontSize: 18 }}>194</Text>
                    <MaterialIcons name="playlist-play" size={36} color="white" />
                </View>
            </View>

            <View style={{ flex: 1, marginHorizontal: 10, marginVertical: 5 }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.title}>{title}</Text>
                    <Image source={require('../../assets/icon/More.png')} style={styles.more} />
                </View>
                <Text>{channelTitle}</Text>
                <Text>194 videos</Text>
            </View>
        </View>
    )
}

export default PlayListCard

const styles = StyleSheet.create({
    playListCard: {
        marginTop: 15,
        width: '100%',
        height: 270,
    },
    image: {
        width: '100%',
        height: 200,
        position: 'relative',
    },
    subThumbnail: {
        position: 'absolute',
        right: 0,
        width: '50%',
        height: 200,
        backgroundColor: 'black',
        opacity: 0.4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        width: Dimensions.get('screen').width - 100,
        color: '#0A0A0A',
        fontWeight: '500',
        marginBottom: 8,
        fontSize: 16,
    },
    more: {
        marginTop: 6,
        marginRight: 4,
    },
})