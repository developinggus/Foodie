import React, { useContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../context";

import MainNav from "./bottomTabNav";
import AdminNav from "./adminNav";
import {
  SignUp,
  SignIn,
  ProfileQuestionaire,
  Profile,
  adminSignIn,
} from "../pages";
import RestaurantDisplay from "../pages/RestaurantDisplay";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

export default () => {
  const auth = useContext(AuthContext);
  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const check = async () => {
      const res = await auth.checkAuth();
      setLoggedIn(res);
      setLoaded(true);
      console.log(res);
    };
    check();

    // get user information from DB by passing token
  }, [loggedIn]);

  return (
    <>
      {!loaded ? null : (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={loggedIn ? "main" : "sign in"}
            screenOptions={{ headerShown: false, gestureEnabled: false }}
          >
            <Stack.Screen
              name="restaurant display"
              component={RestaurantDisplay}
            />
            <Stack.Screen name="questionaire" component={ProfileQuestionaire} />
            <Stack.Screen name="sign in" component={SignIn} />
            <Stack.Screen name="sign up" component={SignUp} />
            <Stack.Screen name="admin sign in" component={adminSignIn} />
            <Stack.Screen name="main" component={MainNav} />
            <Stack.Screen name="adminHome" component={AdminNav} />
            <Stack.Screen name="profile" component={Profile} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
};
