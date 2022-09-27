import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import Home from "./src/screens/Home";
import Library from "./src/screens/Library";
import Search from "./src/screens/Search";
import Shorts from "./src/screens/Shorts";
import Subscriptions from "./src/screens/Subscriptions";
import VideoPlayer from "./src/screens/VideoPlayer";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const RootHome = () => {
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
              return (<Image source={require("./assets/icon/home-ac.png")} />)
            } else {
              return (<Image source={require("./assets/icon/home.png")} />)
            }
          }
        }} />
      <Tab.Screen name="Shorts" component={Shorts}
        options={{
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return (<Image source={require("./assets/icon/Shorts-ac.png")} />)
            } else {
              return (<Image source={require("./assets/icon/Shorts.png")} />)
            }
          }
        }} />
      <Tab.Screen name="Subscriptions" component={Subscriptions}
        options={{
          tabBarBadge: "",
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return (<Image source={require("./assets/icon/subs-ac.png")} />)
            } else {
              return (<Image source={require("./assets/icon/subs.png")} />)
            }
          }
        }} />
      <Tab.Screen name="Library" component={Library}
        options={{
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return (<Image source={require("./assets/icon/library-ac.png")} />)
            } else {
              return (<Image source={require("./assets/icon/library.png")} />)
            }
          }
        }} />
    </Tab.Navigator>
  )
}

export default function App() {

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#00BCD4" translucent={true} />
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="RootHome" component={RootHome} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
