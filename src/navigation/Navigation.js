import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import SearchScreen from '../screens/Search';
import SubScreen from '../screens/SubScreen';
import SignUp from '../screens/SignUp';
import BottomTabNavigator from './BottomTabNavigator'

const Stack = createNativeStackNavigator();
export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Navigation"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Navigation" component={BottomTabNavigator} />
                <Stack.Screen name="Search" component={SearchScreen} />
                <Stack.Screen name="SubSearch" component={SubScreen} />
                <Stack.Screen name="SignUp" component={SignUp} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}