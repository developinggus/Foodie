import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from './mainNav'
import {Profile} from '../pages'
const Tab = createBottomTabNavigator();

export default () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Main} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}