import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Keyboard, StyleSheet, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/Card';

const SearchScreen = ({ navigation }) => {
    const [value, setValue] = useState("")
    // const [cardData, setCardData] = useState([])
    const cardData = useSelector(state => {
        return state;
    })
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)

    const fetchData = () => {
        setLoading(true);
        fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${value}&type=video&key=AIzaSyDsDqQ3UMEMDsz9nu-ovS29cNgAwE9WKi8`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setLoading(false);
                // setCardData(data.items);
                dispatch({
                    type: 'render',
                    payload: data.items
                })

                Keyboard.dismiss();
            })
    }

    const renderItem = ({ item }) => {
        console.log(item.snippet.title)
        return (<Card
            videoId={item.id.videoId}
            title={item.snippet.title}
            channel={item.snippet.channelTitle}
        />)
    }
    return (
        <View style={styles.container}>
            <View style={styles.headerSearch}>
                {/* <AntDesign name="Left" size="32" /> */}
                <AntDesign name="left" size={24} color="black" style={{ marginLeft: -10 }}
                    onPress={() => navigation.goBack()}
                />
                <TextInput
                    style={{ width: "80%", height: 32, backgroundColor: "#e6e6e6", borderRadius: 4, paddingHorizontal: 10, }}
                    value={value}
                    onChangeText={(text) => setValue(text)}
                    placeholder="Search Youtube"
                />
                <MaterialCommunityIcons name="microphone" size={24} color="black" />
                <Ionicons name="send-sharp" size={20} color="black" onPress={() => fetchData()} />
            </View>
            {loading ? <ActivityIndicator style={{ marginVertical: 10 }} /> : null}
            <FlatList
                data={cardData}
                renderItem={renderItem}
                keyExtractor={item => item.id.videoId} />
        </View>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
    },
    headerSearch: {
        // flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        paddingHorizontal: 12,
        paddingVertical: 10,
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        flexDirection: 'row',
        height: 40,
    }
})