import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const HeaderSearch = ({ value, autoFocus, onChangeText, onFocus, onSubmitEditing, onGoBack }) => {

    return (
        <View style={styles.headerSearch}>
            {/* <AntDesign name="Left" size="32" /> */}
            <AntDesign name="left" size={24} color="black" style={{ marginLeft: -10 }}
                onPress={onGoBack}
            />
            <TextInput
                style={{ width: "80%", height: 32, backgroundColor: "#e6e6e6", borderRadius: 4, paddingHorizontal: 10, }}
                value={value}
                autoFocus={autoFocus}
                onFocus={onFocus}
                onChangeText={onChangeText}
                onSubmitEditing={onSubmitEditing}
                placeholder="Search Youtube"
            />
            <MaterialCommunityIcons name="microphone" size={24} color="black" />
        </View>
    )
}

export default HeaderSearch;

const styles = StyleSheet.create({
    headerSearch: {
        alignItems: "center",
        justifyContent: 'center',
        paddingHorizontal: 12,
        paddingVertical: 10,
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        flexDirection: 'row',
        height: 50,
    }
})