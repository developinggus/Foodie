// Home screen for admins

import React from "react";
import {
  View,
  PixelRatio,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
} from "react-native";
import RestaurantList from "./restaurantList";
import Comments from "./Comments";
import { createStackNavigator } from "@react-navigation/stack";

const SlideNavigator = createStackNavigator();
export default (props) => {
  return (
    <View style={{ flex: 1 }}>
      <SlideNavigator.Navigator
        screenOptions={{
          headerShown: true,
          headerTitle: "",
          cardStyle: {
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          },
        }}
      >
        <SlideNavigator.Screen
          name={"restaurantList"}
          options={{ headerShown: false, gestureEnabled: true }}
        >
          {({ navigation }) => <RestaurantList navigation={navigation} />}
        </SlideNavigator.Screen>
        <SlideNavigator.Screen
          name={"comments"}
          component={Comments}
          options={{ gestureEnabled: true }}
        />
      </SlideNavigator.Navigator>
    </View>
  );
};
