import React, { useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  PixelRatio,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
  ImageBackground,
  Alert,
  useWindowDimensions,
} from "react-native";
import { PlacesContext, PlacesProvider, LocationContext } from "./../context/";
import Filters from "../components/FoodFiltersList";
import AwesomeButtonRick from "react-native-really-awesome-button/src/themes/rick";

export default (props) => {
  const placesContext = useContext(PlacesContext);
  const locationContext = useContext(LocationContext);
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().width;

  // Function is called when Home.js is rendered
  useEffect(function () {
    //get token
    AsyncStorage.getItem("token")
      .then(placesContext.setToken)
      .catch(function (error) {
        console.log(`Failed to get token: ${error}`);
        Alert.alert("Failed to get token", error);
        return;
      });

    // Get the location
    locationContext
      .getLocation(false)
      .then(function () {
        placesContext.setLatitude(locationContext.state.latitude);
        placesContext.setLongitude(locationContext.state.longitude);
      })
      .catch(function (error) {
        console.log(`Failed to get location: ${error}`);
        Alert.alert("Failed to get your location", error);
        return;
      });

    // Get the email
    AsyncStorage.getItem("email")
      .then(placesContext.setEmail)
      .catch(function (error) {
        console.log(`Failed to get email: ${error}`);
        Alert.alert("Failed to get your email", error);
        return;
      });
  });

  const buttonClickedHandler = async function () {
    // Try to get the token from the async storage
    // Try to find places given the query
    // It returns an array of places
    var places;
    try {
      places = await placesContext.findPlace();
    } catch (error) {
      console.log(`Failed to find a place: ${error}`);
      Alert.alert("Failed to find a place", error);
      return;
    }

    // No relevant places found
    if (places.length == 0) {
      console.log("No relevant places");
      console.log(places);

      Alert.alert("No places found", "No relevant places");
    } else {
      // Atleast 1 place was found
      props.navigation.navigate('restaurant display');

    }

    return;
  };

  const toProfile = function () {
    try {
      props.navigation.navigate("profile");
    } catch (error) {
      console.log(`Failed to go to profile: ${error}`);
      throw "failed to move";
    }
  };

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      paddingVertical: height * 0.15,
      alignItems: "center",
      backgroundColor: "white",
    },

    roundButton1: {
      width: 200,
      height: 200,
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      borderRadius: 100,
      backgroundColor: "red",
    },
    buttonText: {
      color: "white",
      fontSize: 20,
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" animated={true} />
      <View style={{ flexDirection: "row" }}>
        <Filters />
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <AwesomeButtonRick
          type="primary"
          onPress={buttonClickedHandler}
          stretch={false}
          height={width / 3}
          width={width / 2}
          textSize={10}
          textFamily="sans-seriff"
          raiseLevel={6}
          backgroundColor="red"
          backgroundDarker="#BF0000"
        >
          <Text style={styles.buttonText}>Ask Foodie!</Text>
        </AwesomeButtonRick>
      </View>
    </View>
  );
};
