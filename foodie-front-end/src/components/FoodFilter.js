import React, {useState, useContext} from 'react';
import { View, PixelRatio, Image, TouchableOpacity, useWindowDimensions, StyleSheet, ScrollView, Pressable, Text, ImageBackground } from 'react-native';
import Icon from './icon'
import { PlacesContext, PlacesProvider } from "./../context/"

export default (props) => {
    const placesContext = useContext(PlacesContext);
    const [pressed, setPressed] = useState(true)
    const width = useWindowDimensions().width;
    const height = useWindowDimensions().width;
    const { foodFilters } = placesContext.state

    const filterPressed = async () => {
        setPressed(!pressed)
        console.log(pressed)
        if(pressed){
            if(await foodFilters.indexOf(props.name) < 0){
                 await placesContext.setFoodFilters(oldArray => [...oldArray, props.name])
            }
        } else {
            var newArray = foodFilters
            var index = newArray.indexOf(props.name)
            newArray.splice(index,1)
            await placesContext.setFoodFilters(newArray)
        }        
    }
    const styles = StyleSheet.create({

        image: {
            justifyContent:'center', 
            alignItems:'center',
            borderRadius:width*.2/2, 
            margin:10, 
        },
    })
    return (   
        <View style = {{justifyContent:'center', alignItems:'center',}}> 
            <TouchableOpacity 
                            style = {{alignItems:'center',justifyContent:'center'}} 
                            onPress = {() => filterPressed()}>
                <View style = {{...styles.image,backgroundColor:!pressed ? '#e67373':'white', height:width*.2, width:width*.2}}>
                    <Icon name = {props.icon} size = {{height: height*.13 , width:height*.13}}/>
                </View>

                <Text style = {{color: !pressed ? '#e67373': 'black'}}>{props.name}</Text>
            </TouchableOpacity>     
        </View>
    )}

 