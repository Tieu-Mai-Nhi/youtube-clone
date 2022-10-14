import React, { useEffect, useState } from 'react'
import { Keyboard, ScrollView, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import HeaderSearch from '../components/HeaderSearch'
import SubItemSearch from '../components/SubItemSearch'
import { fetchRecommendWord } from '../redux/recommendWordSlice'
import { searchSliceAction } from '../redux/searchSlice'

export default function SubScreen({ navigation }) {
    const dispatch = useDispatch()

    const [text, setText] = useState('');

    // console.log(text);
    const handleChangeText = (text) => {
        setText(text);
    }

    // ============== Xử lý sự kiện Search
    const handleSearchVideo = () => {
        const action = searchSliceAction.updateKeyWord(text);
        // gửi dữ liệu text được yêu cầu search = keyWord lên store
        // console.log(action);
        dispatch(action);
        navigation.navigate('Search');
        Keyboard.dismiss();
    }

    const handleNavigationSearch = (item) => {
        setText(item);
        const action = searchSliceAction.updateKeyWord(item);
        console.log(action);  // gửi dữ liệu text từ item được yêu cầu search = keyWord lên store
        dispatch(action);
        navigation.navigate('Search');
        Keyboard.dismiss();
    }

    // =================================================================
    // RENDER subItem gợi ý

    useEffect(() => {
        dispatch(fetchRecommendWord(text))   // gửi dữ liệu text gợi ý lên kho
    }, [text])

    const handleSetText = (item) => {
        setText(item)
    }

    const listRecommendWord = useSelector((state) => state.recommendWord.listRecommendWord)
    // console.log(listRecommendWord);    // lấy được từ gợi ý trên store từ thư viện api


    // ==============

    return (
        <View>
            <HeaderSearch
                value={text}    // text = keyword
                onSearch={handleSearchVideo}
                onSubmitEditing={handleSearchVideo}
                onChangeText={handleChangeText} />
            <ScrollView>
                {listRecommendWord.map((item, index) => {
                    return (
                        <SubItemSearch  // đây là component chứa đồng hồ và các thẻ thời gian
                            key={index}
                            text={item}   // truyền từ gợi ý xuống component con SubItemSearch là các ô để làm giao diện
                            onSetText={() => handleSetText(item)}  // cập nhật text ở ô gợi ý lên ô search input
                            onNavigationSearch={() => handleNavigationSearch(item)}  // ==> nhận được text để thực hiện search và chuyển hướng trang
                        />
                    )
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({})