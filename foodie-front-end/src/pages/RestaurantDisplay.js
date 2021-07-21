import React, { useState, useContext, useEffect, Component } from "react";
import {
  View,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  Platform,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  Image,
  Animated,
  Linking,
  Share,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AuthContext, AuthProvider } from "../context/AuthContext";
import logo from "../images/ru.jpg";
import { ScrollView } from "react-native-gesture-handler";
import openMap from "react-native-open-maps";
import { PlacesContext, PlacesProvider } from "../context/Places";
import Icon from "react-native-vector-icons/FontAwesome";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import AwesomeButtonRick from "react-native-really-awesome-button/src/themes/rick";
import { AdminContext, AdminProvider } from "../context/AdminContext";
import { Likes } from "../components";
/*
  Opens prompt to call phone number
  @param number is the phone number to call
  */
const phoneNumber = async (number) => {
  var formatted_number = number.replace(/\D/g, "");
  var int_formatted_number = parseInt(formatted_number);
  try {
    Linking.openURL(`tel:${int_formatted_number}`);
  } catch (error) {}
};

/*
Opens google maps
@params opens google maps using address
*/
const openGoogleMaps = async (address) => {
  var googleQuery = "https://www.google.com/maps/search/?api=1&query=";
  var restaurantEncoded = encodeURIComponent(address);
  try {
    Linking.openURL(googleQuery + "'" + restaurantEncoded + "'");
  } catch (error) {}
};

/*
Opens a website
@params opens the url website
*/
const openRestaurantWebsite = async (website) => {
  try {
    Linking.openURL(website);
  } catch (error) {}
};

const { width, height } = Dimensions.get("window");

export default (props) => {
  const auth = useContext(AuthContext);
  const placesContext = useContext(PlacesContext);
  const admin = useContext(AdminContext);

  const width = useWindowDimensions.width;
  const height = useWindowDimensions.height;

  const {
    restaurantPhoneNumber,
    restaurantName,
    restaurantAddress,
    restaurantType,
    restaurantPrice,
    restaurantRating,
    restaurantWebsite,
    googleRestaurantAddress,
    places,
    priceColor,
    photo,
    GOOGLE_API_KEY,
  } = placesContext.state;

  /*
    fetches comments of the restaurant
    */
  useEffect(() => {
    (async () => {
      admin.getComments(places[0].name);
    })();
  }, []);

  let comment_list = admin.state.comments;

  //let websites = ["q","https://twitter.com/home","https://stackoverflow.com/questions/29452822/how-to-fetch-data-from-local-json-file-on-react-native"];

  const styles = StyleSheet.create({
    background_image: {
      flexGrow: 1,
      justifyContent: "flex-start",
      width: "100%",
      resizeMode: "cover",
    },
    container: {
      flex: 1,
      backgroundColor: "#FFFAFA",
      marginBottom: 0,
    },
    message: {
      fontWeight: "bold",
      fontSize: 35,
      color: "#FF6347",
      //marginTop:10,
      //marginBottom:10,
      textAlign: "center",
      textAlignVertical: "center",
      //flex: 1,
      //width: width,
      //height: height,
      width: "100%",
    },
    logo: {
      width: height * 8,
      height: height * 8,
      borderRadius: (height * 8) / 2,
      overflow: "hidden",
      borderWidth: 3,
      borderColor: "#DC143C",
      marginTop: "3%",
      marginBottom: "3%",
    },
    header: {
      fontWeight: "bold",
      fontSize: 25,
      color: "#FF6347",
      textAlign: "center",
      marginBottom: "2%",
      marginTop: "2%",
      flex: 1,
    },
    logoContainer: {
      //justifyContent: 'center',
      //alignItems: 'center',
      flex: 3,
    },
    innerText: {
      fontSize: 20,
      color: "#696969",
      textAlign: "left",
      marginTop: "3%",
      marginBottom: "3%",
    },
    inputView: {
      width: width * 0.8,
      backgroundColor: "#465881",
      borderRadius: 25,
      height: height * 0.1,
      justifyContent: "center",
      marginBottom: "3%",
      alignItems: "center",
    },
    innerText2: {
      fontSize: 20,
      color: "#7FFF00",
      textAlign: "left",
      marginTop: "3%",
      marginBottom: "3%",
    },

    card: {
      height: "80%",
      width: "80%",
      backgroundColor: "white",
      borderRadius: 15,
      padding: "2.5%",
      elevation: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
    },

    backButton: {
      //elevation: 8,
      backgroundColor: "#FF6347",
      borderRadius: 10,
      paddingVertical: 4,
      paddingHorizontal: 18,
      marginTop: 15,
      //alignSelf: "flex-end",
      //position: 'absolute',
      bottom: 0,
    },

    appButtonText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase",
    },
  });

  /*
      opens the share prompt
      */
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "Just got recommended to eat at " + places[0].name + " via Foodie",
        url:
          "https://maps.googleapis.com/maps/api/place/photo?maxwidth=" +
          places[0].photos[0].width +
          "&photoreference=" +
          places[0].photos[0].photo_reference +
          "&key=" +
          GOOGLE_API_KEY,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View style={styles.container}>
        {/* Displays restaurant name */}
        {places[0].hasOwnProperty("name") && (
          <View
            style={{
              backgroundColor: "#FFFFFF",
              width: width,
              alignContent: "center",
            }}
          >
            <Text style={styles.message}>{places[0].name}</Text>
          </View>
        )}

        <View style={styles.logoContainer}>
          {/* Displays restaurant photo */}
          <Image
            source={{
              uri:
                "https://maps.googleapis.com/maps/api/place/photo?maxwidth=" +
                places[0].photos[0].width +
                "&photoreference=" +
                places[0].photos[0].photo_reference +
                "&key=" +
                GOOGLE_API_KEY,
            }}
            style={{ width: "100%", height: "65%", flex: 1 }}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.header}> Info</Text>
          <TouchableOpacity onPress={onShare}>
            <Icon name="share" size={30} color="#FF6347" />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 3 }}>
          {/* Displays restaurant address */}
          {places[0].hasOwnProperty("vicinity") && (
            <View
              style={{
                borderColor: "#DCDCDC",
                borderBottomWidth: 1,
                borderTopWidth: 1,
              }}
            >
              <TouchableOpacity
                onPress={() => openGoogleMaps(places[0].vicinity)}
              >
                <Text style={styles.innerText}>
                  {"Address: " + places[0].vicinity}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {/* Displays restaurant phone number */}
          {places[0].hasOwnProperty("formatted_phone_number") && (
            <View
              style={{
                borderColor: "#DCDCDC",
                borderBottomWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <TouchableOpacity
                onPress={() => phoneNumber(places[0].formatted_phone_number)}
              >
                <Text style={styles.innerText}>
                  {places[0].formatted_phone_number}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {/* Displays restaurant price level */}
          {places[0].hasOwnProperty("price_level") && (
            <View
              style={{
                borderColor: "#DCDCDC",
                borderBottomWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  textAlign: "left",
                  marginTop: 12,
                  marginBottom: 12,
                  color: "#696969",
                }}
              >
                {"Price Level: " + places[0].price_level + "/4"}
              </Text>
            </View>
          )}

          {/* Displays restaurant types */}
          {places[0].hasOwnProperty("types") && (
            <View
              style={{
                borderColor: "#DCDCDC",
                borderBottomWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <Text style={styles.innerText}>
                {"Type: " + places[0].types[0].replace(/_/g, " ")}
              </Text>
            </View>
          )}

          {/* Displays restaurant rating */}
          {places[0].hasOwnProperty("rating") && (
            <View
              style={{
                borderColor: "#DCDCDC",
                borderBottomWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <Text style={styles.innerText}>
                {"Rating: " + places[0].rating + "/5"}
              </Text>
            </View>
          )}
        </View>
        <View style={{ alignItems: "center", flex: 2, marginTop: "5%" }}>
          {/* Displays restaurant comments */}

          <View style={styles.card}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>Comments</Text>
            </View>
            <ScrollView>
              {admin.state.comments.map((item, index) => {
                return (
                  <View key={index}>
                    <TouchableOpacity
                      onLongPress={() => props.navigation.navigate("profile")}
                    >
                      <Text>
                        {item.poster + " says:\n" + item.content + "\n\n"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>

        <View>
          <Likes />
        </View>

        <View
          style={{ flexDirection: "column", flex: 1, paddingHorizontal: "10%" }}
        >
          <TouchableOpacity
            onPress={() => props.navigation.navigate("home")}
            style={styles.backButton}
          >
            <Text style={styles.appButtonText}>{"Retry"} </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
