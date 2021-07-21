import React, { useState, useContext, useEffect, Component } from "react";
import { View, StyleSheet, Touchable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PlacesContext, PlacesProvider } from "../context/Places";

export default (props) => {
  const placesContext = useContext(PlacesContext);
  const [likePressed, setLikePressed] = useState(false);
  const [dislikePressed, setDisLikePressed] = useState(false);

  // when thumbs up is pressed send like to database
  const sendLike = () => {
    placesContext.sendLike(props.placeId);
    setLikePressed(true);
  };
  // when thumbs down is pressed send dislike to database
  const sendDislike = () => {
    placesContext.sendDislike(props.placeId);
    setDisLikePressed(true);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
      }}
    >
      <TouchableOpacity onPress={() => sendLike()} disabled={dislikePressed}>
        <FontAwesome name="thumbs-o-up" size={28} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => sendDislike()} disabled={likePressed}>
        <FontAwesome name="thumbs-o-down" size={28} color="black" />
      </TouchableOpacity>
    </View>
  );
};
