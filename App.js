import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import HomePage from "./Screens/HomePage";
import CreateChats from "./Screens/CreateChats";
import ChatScreen from "./Screens/ChatScreen";

export default function App() {
  const Stack = createNativeStackNavigator();
  const globalScreenOptions = {
    headerStyle: {
      backgroundColor: "#2C6BED",
    },
    headerTitleAlign: "center",
    headerTitleStyle: { color: "white" },
    headerTintColor: "white",
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName="ChatScreen"
        screenOptions={globalScreenOptions}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="CreateChats" component={CreateChats} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
