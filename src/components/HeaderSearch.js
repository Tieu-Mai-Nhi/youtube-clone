import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export default function HeaderSearch({ value, onChangeText, onSubmitEditing }) {
    const navigation = useNavigation();
    console.log(value)
    return (
        <View style={styles.headerSearch}>
            {/* <AntDesign name="Left" size="32" /> */}
            <AntDesign name="left" size={24} color="black" style={{ marginLeft: -10 }}
                onPress={() => navigation.goBack()}
            />
            <TextInput
                style={{ width: "80%", height: 32, backgroundColor: "#e6e6e6", borderRadius: 4, paddingHorizontal: 10, }}
                value={value}
                autoFocus={true}
                onChangeText={onChangeText}
                onSubmitEditing={onSubmitEditing}
                placeholder="Search Youtube"
            />
            <MaterialCommunityIcons name="microphone" size={24} color="black" />
            {/* <Ionicons name="send-sharp" size={20} color="black" onPress={onSearch} /> */}
        </View>
    )
}
const styles = StyleSheet.create({
    headerSearch: {
        // flex: 1,
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