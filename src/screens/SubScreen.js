import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { Keyboard, ScrollView, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import HeaderSearch from '../components/HeaderSearch'
import SubItemSearch from '../components/SubItemSearch'
import { historyWordSliceAction } from '../redux/historyWordSlice'
import { fetchRecommendWord } from '../redux/recommendWordSlice'
import { searchSliceAction } from '../redux/searchSlice'

export default function SubScreen({ navigation }) {
    const dispatch = useDispatch()

    const [text, setText] = useState('');

    // console.log(text);


    const handleChangeText = (text) => {
        setText(text);
    }
    // => lấy được text nhập ở headerSearch

    // ============== Xử lý sự kiện Search
    const handleSearchVideo = () => {
        const action = searchSliceAction.updateKeyWord(text);
        // gửi dữ liệu text được yêu cầu search = keyWord lên store để dùng ở màn search, search ra video playlist
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
    // text = item

    const listRecommendWord = useSelector(
        (state) => state.recommendWord.listRecommendWord
    )
    // console.log(listRecommendWord);    // lấy được từ gợi ý trên store từ thư viện api

    // ==============

    const handleNavigation = () => {
        navigation.goBack()
    }



    const historyListWord = useSelector(
        (state) => state.historyWord.historyListWord
    )
    // console.log('historyListWord: ', historyListWord);



    // save keyWord
    // save word vào lịch sử khi ấn vào item
    const handleSaveWordItem = async (item) => {
        console.log(item)
        let updatedKeyWord = [];
        const historyKeyWord = historyListWord.find((word) => word === item);
        console.log(historyKeyWord);
        if (historyKeyWord) {
            updatedKeyWord = historyListWord; // nếu trùng keyWord thì cho keyWord vào mảng rỗng ban đầu rồi cho lên Store 
            // console.log(updatedKeyWord);
        } else {
            updatedKeyWord = [...historyListWord, item];  // nếu thấy từ mới thì thêm vào mảng, rồi cho lên store
            // console.log(updatedKeyWord);
        }

        try {
            AsyncStorage.setItem('keyWord', JSON.stringify(updatedKeyWord));
            const action = historyWordSliceAction.saveHistoryList(updatedKeyWord);
            // console.log(action);
            dispatch(action);
        }
        catch (error) {
            console.log(error);
        }
    };

    // save Word vào lịch sử khi nộp ở ô input
    const saveWordInput = async () => {
        console.log(text);
        let updatedKeyWord = [];
        const historyKeyWord = historyListWord.find((word) => word === text);
        if (historyKeyWord) {
            updatedKeyWord = historyListWord; // nếu trùng keyWord thì cho keyWord vào mảng rỗng ban đầu rồi cho lên Store 
        } else {
            updatedKeyWord = [...historyListWord, text];  // nếu thấy từ mới thì thêm vào mảng, rồi cho lên store
        }
        // console.log(updatedKeyWord);
        try {
            AsyncStorage.setItem('keyWord', JSON.stringify(updatedKeyWord));
            const action = historyWordSliceAction.saveHistoryList(updatedKeyWord);
            // console.log(action);
            dispatch(action);
            //disptach list mới đầy đủ cả từ đang search
        }
        catch (error) {
            console.log(error);
        }
    }

    const listWordFilter = historyListWord.filter((item) => item.startsWith(text.toLowerCase()));
    // console.log("listWordFilter: ", listWordFilter);

    const listRecommendWordNotHistory = listRecommendWord.filter((item) => !listWordFilter.includes(item))
    // console.log("listRecommendWordNotHistory: ", listRecommendWordNotHistory);
    return (
        <View>
            <HeaderSearch
                value={text} // text = keyword: hiện nguyên ở ô input
                onSearch={handleSearchVideo}
                onSubmitEditing={handleSearchVideo} // cả ấn item search và nhập enter đều chung 1 func => gửi keyword
                onChangeText={handleChangeText}
                onGoBack={handleNavigation}
                autoFocus={true} />
            <ScrollView>
                {
                    listWordFilter.map((item, index) => {
                        return (
                            <SubItemSearch  // đây là component chứa đồng hồ và các thẻ thời gian
                                key={index}
                                text={item}   // truyền từ gợi ý xuống component con SubItemSearch là các ô để làm giao diện
                                onSetText={() => handleSetText(item)}  // cập nhật text ở ô gợi ý lên ô search input
                                onNavigationSearch={() => handleNavigationSearch(item)}  // ==> nhận được text để thực hiện search và chuyển hướng trang
                                onSaveWord={() => handleSaveWordItem(item)}
                                nameIcon='clockcircleo'
                            />
                        )
                    })
                }
                {
                    listRecommendWordNotHistory.map((item, index) => {
                        return (
                            <SubItemSearch  // đây là component chứa đồng hồ và các thẻ thời gian
                                key={index}
                                text={item}   // truyền từ gợi ý xuống component con SubItemSearch là các ô để làm giao diện
                                onSetText={() => handleSetText(item)}  // cập nhật text ở ô gợi ý lên ô search input
                                onNavigationSearch={() => handleNavigationSearch(item)}  // ==> nhận được text để thực hiện search và chuyển hướng trang
                                onSaveWord={() => handleSaveWordItem(item)}
                                nameIcon={'search1'}
                            />
                        )
                    })

                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({})