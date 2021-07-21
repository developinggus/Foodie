// component to show list of comments for given restaurant
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

const { width, height } = Dimensions.get("window");

export default ({ route }) => {
  const adminContext = useContext(AdminContext);
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;
  const { name, id } = route.params;

  // load comments for given restaurant when component renders
  useEffect(() => {
    (async () => {
      adminContext.getComments(id);
    })();
  }, []);

  function get_font_size(size) {
    return size / PixelRatio.getFontScale();
  }

  return (
    <View style={{ alignItems: "center", flex: 1, width: width }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: height * 0.05,
          marginBottom: height * 0.05,
        }}
      >
        <Text style={{ fontSize: get_font_size(24) }}> {name} </Text>
      </View>
      <View style={{ height: height * 0.8 }}>
        <ScrollView
          style={{ height: height }}
          showsVerticalScrollIndicator={false}
          marginBottom={"5%"}
        >
          {adminContext.state.comments.map((item, index) => {
            return (
              <View key={index} style={{ alignItems: "center" }}>
                <View
                  style={{
                    borderColor: "grey",
                    borderWidth: 1,
                    padding: "4%",
                    margin: "5%",
                    width: width * 0.9,
                    // justifyContent:'center',
                    // alignItems:'center'
                  }}
                >
                  <Text>User: {item.poster}</Text>
                  <Text>Comment: {item.content}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => adminContext.deleteComment(item._id)}
                >
                  <View
                    style={{
                      backgroundColor: "red",
                      padding: "5%",
                      alignItems: "center",
                    }}
                  >
                    <Text>Delete</Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};
