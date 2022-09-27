import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Card = (props) => {
    return (
        <View style={styles.card}>
            <TouchableOpacity>
                <Image
                    style={styles.imageCard}
                    source={{
                        uri: `https://i.ytimg.com/vi/${props.videoId}/hqdefault.jpg`,
                    }}
                />
            </TouchableOpacity>
            <View style={styles.timeContainer}>
                <Text style={styles.time}>15:23</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', position: 'relative', marginBottom: 20, marginTop: 14 }}>
                <Image source={require('../../assets/image/fon-devushka-volosy-vzgliad-milaia.jpg')} style={styles.avt} />
                <View style={{ flex: 1 }}>
                    <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">{props.title}</Text>
                    <Text style={styles.viewer}>19,210,251 viewsJul • 1, 2016</Text>
                </View>
                <Image source={require('../../assets/icon/More.png')} style={styles.more} />
            </View>
        </View >
    )
}

export default Card

const styles = StyleSheet.create({
    card: {
        flex: 1
    },

    imageCard: {
        width: '100%',
        height: 215,

    },
    avt: {
        width: 36,
        height: 36,
        borderRadius: 36,
        marginHorizontal: 12,
    },

    title: {
        width: Dimensions.get('screen').width - 100,
        color: '#0A0A0A',
        fontWeight: '500',
        marginBottom: 8,
    },

    viewer: {
        color: '#6C6C6C',
        fontWeight: '500',
    },

    more: {
        marginHorizontal: 23,
        position: 'relative',
        top: -14,
    },

    timeContainer: {
        backgroundColor: '#000',
        opacity: 0.7,
        width: 36,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        position: 'absolute',
        right: 12,
        bottom: 100,
    },

    time: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 10,
    }


})