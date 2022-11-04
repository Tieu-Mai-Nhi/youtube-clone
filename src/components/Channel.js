import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const Channel = ({ avt, channelName, subscribed }) => {
    const [sub, setSub] = useState(false);
    const [subCount, setSubCount] = useState(Number(subscribed));

    const handleSub = () => {
        sub === false ? setSubCount(subCount + 1) : setSub(subCount - 1);
        setSub(!sub)
    }

    return (
        <View style={styles.container}>
            <View
                style={{
                    flexDirection: 'row',
                    width: '70%',
                    alignItems: 'center',
                }}
            >
                <Image style={styles.img} source={{ uri: avt }} />
                <View style={{ marginLeft: 10 }}>
                    <Text style={styles.nameChannel}>{channelName}</Text>
                    <Text style={styles.subcribe}>{subscribed}</Text>
                </View>
            </View>
            <View>
                {sub === false ? (
                    <TouchableOpacity onPress={() => handleSub()}>
                        <Text style={[styles.text, styles.red]}>Subscribe</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => handleSub()}>
                        <Text style={[styles.text, styles.gray]}>Subscribed</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default Channel;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 14,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: '#ccc',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    img: {
        width: 36,
        height: 36,
        borderRadius: '50%',
    },
    nameChannel: {
        fontWeight: 'bold',
        fontSize: 16,
        alignContent: 'flex-start',
    },
    subcribe: {
        fontSize: 12,
        color: '#6C6C6C',
        marginTop: 6,
    },
    text: {
        fontWeight: '600',
        fontSize: 16,
        textTransform: 'uppercase',
        marginRight: 8
    },

    red: {
        color: '#FF0000',
    },
    gray: {
        color: 'gray',
    },
});
