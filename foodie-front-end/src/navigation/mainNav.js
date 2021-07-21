import React from 'react';
import { Home, Profile} from '../pages';
import { createStackNavigator } from '@react-navigation/stack';
import RestaurantDisplay from '../pages/RestaurantDisplay';


const Stack = createStackNavigator();

const MainNav = () => {
  return (
    <Stack.Navigator headerMode="none" mode="modal" initialRouteName = 'home'>
      <Stack.Screen name="restaurant display" component ={RestaurantDisplay} />
      <Stack.Screen name="home" component={Home}></Stack.Screen>
      <Stack.Screen name="Profile" component={Profile}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default MainNav;
