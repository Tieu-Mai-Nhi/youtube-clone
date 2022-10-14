import AsyncStorage from '@react-native-async-storage/async-storage'
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
        saveWordInput();
    }

    // save Key word

    const handleNavigationSearch = (item) => {
        setText(item);
        const action = searchSliceAction.updateKeyWord(item);
        // console.log(action);  // gửi dữ liệu text từ item được yêu cầu search = keyWord lên store
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

    const handleNavigation = () => {
        navigation.goBack()
    }

    // save keyWord
    const handleSaveWord = async (item) => {
        // console.log(item);
        try {
            AsyncStorage.setItem('keyWord', item);
        }
        catch (error) {
            console.log(error);
        }
    };

    const saveWordInput = async () => {
        // console.log(text);
        try {
            AsyncStorage.setItem('keyWord', text);
        }
        catch (error) {
            console.log(error);
        }
    }



    // get keyWord
    const handleGetWord = async () => {
        try {
            const text1 = await AsyncStorage.getItem('keyWord');
            console.log(text1);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleGetWord()
    }, [])


    return (
        <View>
            <HeaderSearch
                value={text}    // text = keyword
                onSearch={handleSearchVideo}
                onSubmitEditing={handleSearchVideo}
                onChangeText={handleChangeText}
                onGoBack={handleNavigation}
                autoFocus={true} />
            <ScrollView>
                {listRecommendWord.map((item, index) => {
                    return (
                        <SubItemSearch  // đây là component chứa đồng hồ và các thẻ thời gian
                            key={index}
                            text={item}   // truyền từ gợi ý xuống component con SubItemSearch là các ô để làm giao diện
                            onSetText={() => handleSetText(item)}  // cập nhật text ở ô gợi ý lên ô search input
                            onNavigationSearch={() => handleNavigationSearch(item)}  // ==> nhận được text để thực hiện search và chuyển hướng trang
                            onSaveWord={() => handleSaveWord(item)}
                        />
                    )
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({})