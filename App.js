import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import Navigation from "./src/navigation/Navigation";
import store from "./src/redux/store";
import Search from "./src/screens/Search";
import SubScreen from "./src/screens/SubScreen";
import VideoPlayer from "./src/screens/VideoPlayer";
import { GestureHandlerRootView } from 'react-native-gesture-handler'



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#00BCD4" translucent={true} />
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Navigation"
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="Navigation" component={Navigation} />
              <Stack.Screen name="Search" component={Search} />
              <Stack.Screen name="SubSearch" component={SubScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </GestureHandlerRootView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
