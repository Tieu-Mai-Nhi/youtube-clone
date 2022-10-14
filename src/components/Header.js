import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import React from 'react';
import { Image, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';

const Header = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.header}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <TouchableOpacity>
                    <Image
                        style={styles.logo}
                        source={require('../../assets/icon/logo.png')}
                    />
                </TouchableOpacity>


                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between', flex: 0.5 }}>
                    <TouchableOpacity>
                        <Image
                            style={styles.connectedTv}
                            source={require('../../assets/icon/mayquay.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialCommunityIcons name="bell-outline" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialIcons name="search" size={24} color="black" onPress={() => navigation.navigate('SubSearch')} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialIcons name="account-circle" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            <View
                style={{
                    borderBottomWidth: 1,
                    borderBottomColor: '#CECECE',
                    marginTop: 16,
                }}
            />
        </SafeAreaView >
    )
}

export default Header;

const styles = StyleSheet.create({
    header: {
        marginTop: Constants.statusBarHeight,
        justifyContent: 'center',
        paddingHorizontal: 12,
        paddingVertical: 10,
    },

    text: {
        fontSize: 22
    },

    connectedTv: {
        marginRight: 6,
    }
})