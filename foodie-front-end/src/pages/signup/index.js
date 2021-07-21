// stack navigator for sign up
import React from "react";
import { View, SafeAreaView, Dimensions, StyleSheet, Text } from "react-native";

import Username from "./username";
import Birthday from "./birthday";
import Email from "./email";
import Password from "./password";
import Name from "./name";
import { createStackNavigator } from "@react-navigation/stack";
const { width, height } = Dimensions.get("window");
const cross = Math.sqrt(width * width + height * height);

export default () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="username" component={Username}></Stack.Screen>
      <Stack.Screen name="email" component={Email}></Stack.Screen>
      <Stack.Screen name="birthday" component={Birthday}></Stack.Screen>
      <Stack.Screen name="password" component={Password}></Stack.Screen>
      <Stack.Screen name="name" component={Name}></Stack.Screen>
    </Stack.Navigator>
  );
};
