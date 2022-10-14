import React from 'react'
import Home from '../screens/Home'
import Library from '../screens/Library'
import Shorts from '../screens/Shorts'
import Subscriptions from '../screens/Subscriptions'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native'

const Tab = createBottomTabNavigator();
export default function Navigation() {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            inactiveColor="black"
            screenOptions={{
                tabBarActiveTintColor: '#000',
                // tabBarInactiveTintColor: '#ccc',
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
            <Tab.Screen name="Shorts" component={Shorts}
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