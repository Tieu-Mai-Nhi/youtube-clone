import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Subscriptions from '../screens/Subscriptions';
import Library from '../screens/Library';

const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName='Shorts'
            inactiveColor="black"
            screenOptions={{
                tabBarActiveTintColor: '#000',
                headerShown: false,
            }}
        >
            <Tab.Screen name="Home" component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return (<Image source={require("../../assets/icon/home-ac.png")} />)
                        } else {
                            return (<Image source={require("../../assets/icon/home.png")} />)
                        }
                    }
                }}
            />
            <Tab.Screen name="Shorts" component={Login}
                options={{
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return (<Image source={require("../../assets/icon/Shorts-ac.png")} />)
                        } else {
                            return (<Image source={require("../../assets/icon/Shorts.png")} />)
                        }
                    }
                }}
            />
            <Tab.Screen name="Subscriptions" component={Subscriptions}
                options={{
                    tabBarBadge: "",
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return (<Image source={require("../../assets/icon/subs-ac.png")} />)
                        } else {
                            return (<Image source={require("../../assets/icon/subs.png")} />)
                        }
                    }
                }}
            />
            <Tab.Screen name="Library" component={Library}
                options={{
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return (<Image source={require("../../assets/icon/library-ac.png")} />)
                        } else {
                            return (<Image source={require("../../assets/icon/library.png")} />)
                        }
                    }
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabNavigator

const styles = StyleSheet.create({})