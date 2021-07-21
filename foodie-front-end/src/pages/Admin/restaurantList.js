// component that displays list of restaurants in database
import React, { useState, useContext, useEffect } from "react";
import {
  View,
  PixelRatio,
  Dimensions,
  StyleSheet,
  ScrollView,
  Pressable,
  Text,
  ImageBackground,
  useWindowDimensions,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import FoodFilter from "../../components/FoodFilter";
import Filter from "../../components/filter";
import { AdminContext, PlacesProvider } from "../../context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

export default (props) => {
  const adminContext = useContext(AdminContext);
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;

  useEffect(() => {
    (async () => {
      adminContext.getRestaurants();
    })();
  }, []);

  function get_font_size(size) {
    return size / PixelRatio.getFontScale();
  }
  const toComments = (name, id) => {
    props.navigation.navigate("comments", { name, id });
  };

  const logOut = async () => {
    props.navigation.navigate("sign in");
    await AsyncStorage.removeItem("token");
  };

  return (
    <View style={{ flex: 1, width: width }}>
      <View
        style={{
          flexDirection: "row",
          marginTop: height * 0.1,
          marginBottom: height * 0.05,
        }}
      >
        <View
          style={{
            position: "absolute",
            marginLeft: height * 0.02,
            marginTop: -height * 0.05,
            borderWidth: 1,
            alignItems: "center",
            justifyContent: "center",
            padding: height * 0.005,
          }}
        >
          <TouchableOpacity
            style={{ alignItems: "center", justifyContent: "center" }}
            onPress={() => logOut()}
          >
            <Text style={{ fontSize: get_font_size(14) }}>Log out</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ fontSize: get_font_size(24) }}>Restaurants</Text>
        </View>
      </View>
      <View style={{ height: height * 0.8 }}>
        <ScrollView
          style={{ height: height }}
          showsVerticalScrollIndicator={false}
          marginBottom={"5%"}
        >
          {adminContext.state.restaurants.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => toComments(item.name, item._id)}
                key={index}
                style={{
                  borderColor: "grey",
                  borderWidth: 1,
                  padding: "4%",
                  margin: "5%",
                  width: width * 0.9,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};
