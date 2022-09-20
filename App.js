import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import Header from "./src/components/Header";
import Home from "./src/screens/Home";
import Library from "./src/screens/Library";
import Shorts from "./src/screens/Shorts";
import Subscriptions from "./src/screens/Subscriptions";


export default function App() {

  const Tab = createBottomTabNavigator();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#00BCD4" translucent={true} />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            labelStyle: {
              fontSize: 16,
              marginBottom: 12,
            },
            activeTintColor: 'red',
            inactiveTintColor: 'black',
          }}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Shorts" component={Shorts} />
          <Tab.Screen name="Subscriptions" component={Subscriptions} />
          <Tab.Screen name="Library" component={Library} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
