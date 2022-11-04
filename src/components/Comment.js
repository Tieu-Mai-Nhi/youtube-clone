import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';


const Comment = ({ comment, avtUser, numberComments, onShowMoreComment }) => {
    // console.log(avtUser);
    return (
        <TouchableOpacity style={{ marginBottom: 16 }} onPress={onShowMoreComment}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity style={{ flexDirection: 'row' }}>
                    <Text style={{ marginRight: 6 }}>Comments</Text>
                    <Text style={{ color: 'gray' }}>{numberComments}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                    <MaterialIcons name="unfold-more" size={20} color="black" />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 12, marginRight: 10 }}>
                <Image source={{ uri: avtUser }} style={{ width: 26, height: 26, borderRadius: "50%", marginRight: 10 }} />
                <Text style={{ paddingLeft: 6, paddingRight: 14 }}>{comment}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Comment

const styles = StyleSheet.create({

})