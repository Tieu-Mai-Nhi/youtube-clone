import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const OptionBar = ({ like, dislike }) => {
    const [likeStatus, setLikeStatus] = useState(false)
    const [likeCount, setLikeCount] = useState(Number(like))

    const [disLikeStatus, setDisLikeStatus] = useState(false)
    const [disLikeCount, setDisLikeCount] = useState(Number(dislike))
    // console.log(typeof like);
    // console.log(likeCount);

    const handleClickLike = () => {
        likeStatus === false ? setLikeCount(likeCount + 1) : setLikeCount(likeCount - 1);
        setLikeStatus(!likeStatus)
    }

    const handleClickDisLike = () => {
        disLikeStatus === false ? setDisLikeCount(disLikeCount + 1) : setDisLikeCount(disLikeCount - 1);
        setDisLikeStatus(!disLikeStatus)
    }

    return (
        <View style={styles.container}>

            <TouchableOpacity onPress={() => handleClickLike()} style={styles.item}>
                {likeStatus === false
                    ?
                    <>
                        <AntDesign name="like2" size={24} color="black" />
                        <Text>{likeCount}</Text>
                    </>
                    :
                    <>
                        <AntDesign name="like1" size={24} color="black" />
                        <Text>{likeCount}</Text>
                    </>
                }
            </TouchableOpacity>


            <TouchableOpacity onPress={() => handleClickDisLike()} style={styles.item}>
                {disLikeStatus === false
                    ?
                    <>
                        <AntDesign name="dislike2" size={24} color="black" />
                        <Text>{disLikeCount}</Text>
                    </>
                    :
                    <>
                        <AntDesign name="dislike1" size={24} color="black" />
                        <Text>{disLikeCount}</Text>
                    </>
                }
            </TouchableOpacity>


            <TouchableOpacity style={styles.item}>
                <MaterialCommunityIcons name="share" size={24} color="black" />
                <Text>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
                <AntDesign name="download" size={24} color="black" />
                <Text>Download</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
                <MaterialIcons name="playlist-add" size={24} color="black" />
                <Text>Save</Text>
            </TouchableOpacity>
        </View>
    )
}

export default OptionBar

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    item: {
        alignItems: 'center',
    },
})