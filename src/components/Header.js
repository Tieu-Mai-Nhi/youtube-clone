import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import React from 'react';
import { Image, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';

const Header = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Image
                        style={styles.logo}
                        source={require('../../assets/icon/logo.png')}
                    />
                </TouchableOpacity>


                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity style={styles.icon}>
                        <Image
                            style={styles.connectedTv}
                            source={require('../../assets/icon/mayquay.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon}>
                        <MaterialCommunityIcons name="bell-outline" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon}>
                        <MaterialIcons name="search" size={24} color="black" onPress={() => navigation.navigate('SubSearch')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon}>
                        <MaterialIcons name="account-circle" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            <View
                style={{
                    borderColor: '#cfcfcf',
                    opacity: 0.6,
                    borderWidth: 0.6,
                    width: '80%',
                    alignSelf: 'center',
                    // marginTop: 16,
                    marginBottom: 16
                }}
            />
        </SafeAreaView >
    )
}

export default Header;

const styles = StyleSheet.create({
    header: {
        // height: Constants.statusBarHeight,
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 10,
        paddingTop: 20,
        marginBottom: 10,
        marginRight: 40,
        flexDirection: "row",
        justifyContent: "space-between"
    },

    logo: {
        marginRight: 80,

    },
    text: {
        fontSize: 22
    },

    connectedTv: {
        marginRight: 6,
    },

    icon: {
        paddingHorizontal: 6
    }
})