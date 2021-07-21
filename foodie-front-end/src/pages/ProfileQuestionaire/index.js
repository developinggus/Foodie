// stack navigator for profile questionaire screens
import React from "react";
import { View, SafeAreaView, Dimensions, StyleSheet, Text } from "react-native";

import PriceQuestion from "./PriceQuestion";
import FoodType from "./FoodType";
import Distance from "./Distance";
import DiningType from "./DiningType";
import { createStackNavigator } from "@react-navigation/stack";
const { width, height } = Dimensions.get("window");
const cross = Math.sqrt(width * width + height * height);

export default () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      headerMode="float"
      screenOptions={{ headerShown: true, title: "Profile Questionaire" }}
    >
      <Stack.Screen name="price" component={PriceQuestion}></Stack.Screen>
      <Stack.Screen name="food" component={FoodType}></Stack.Screen>
      <Stack.Screen name="dining" component={DiningType}></Stack.Screen>
      <Stack.Screen name="distance" component={Distance}></Stack.Screen>
    </Stack.Navigator>
  );
};
