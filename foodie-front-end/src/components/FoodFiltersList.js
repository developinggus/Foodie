import React, {useState, useContext} from 'react';
import { View, PixelRatio, Dimensions, StyleSheet, ScrollView, Pressable, Text, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FoodFilter from './FoodFilter'
import Filter from './filter'
import { PlacesContext, PlacesProvider } from "./../context/"

const { width, height } = Dimensions.get('window');

export default (props) => {
    const placesContext = useContext(PlacesContext);
    const foodTypes = [
        {name:'Fast Food', icon:'FastFood'}, 
        {name:'Burgers', icon:'Burgers'}, 
        {name:'Mexican', icon:'Mexican'},
        {name:'Breakfast', icon:'Breakfast'},
        {name:'Sandwhiches', icon:'Sandwhiches'},
        {name:'Dessert', icon:'Dessert'},
        {name:'Healthy', icon:'Healthy'},
        {name:'Japanese', icon:'Japanese'},
        {name:'Chinese', icon:'Chinese'},
        {name:'Sushi', icon:'Sushi'},
        {name:'Pizza', icon:'Pizza'},
        {name:'Vegan', icon:'Vegan'},
        {name:'Italian', icon:'Italian'},
        {name:'Asian', icon:'Asian'}
        ]
    const filters = [
        {name:'$'},
        {name:'$$'},
        {name:'$$$'},
        {name:'Under 5 km'},
        {name:'Under 10 km'},
        {name:'Under 20 km'},
        {name:'Takeout'},
        {name:'Dine In'},
    ]

 
    return (
        
        <View>
            <ScrollView horizontal = {true} showsHorizontalScrollIndicator = {false} marginBottom = {'5%'}>
                {foodTypes.map((item,index) => {
                    return(
                        <View key = {index} >
                            <FoodFilter icon = {item.icon} name = {item.name}/>
                        </View>
                    )
                })}
            </ScrollView>
            <ScrollView horizontal = {true} showsHorizontalScrollIndicator = {false}>
                {filters.map((item,index) => {
                    return(
                        <View key = {index} >
                            <Filter name = {item.name} />
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    )}

