// birthdate input screen

import React, { useContext, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Icon } from "../../components";
import { AuthContext } from "../../context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles as s } from "react-native-style-tachyons";
const { width, height } = Dimensions.get("window");
const cross = Math.sqrt(width * width + height * height);

export default ({ navigation }) => {
  const authContext = useContext(AuthContext);
  let [date, setDate] = useState(new Date());
  let [clicked, setClicked] = useState(false);

  // navigate to password screen and set date in date variable
  const next = () => {
    setClicked(true);
    authContext.setDate(date.toLocaleDateString());
    navigation.navigate("password");
  };

  // go to prevuous screen
  const back = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" animated={true} />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={back}
          style={{ position: "absolute", left: "3%" }}
        >
          <Text>Back</Text>
        </TouchableOpacity>
        <View style={{ paddingVertical: "5%" }}>
          <Text style={{ fontSize: width * 0.05 }}>Sign up</Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: "10%" }}>
        <Text style={{ fontSize: width * 0.06, marginTop: "10%" }}>
          Birthday
        </Text>

        <View style={{ paddingVertical: "5%", ...styles.textIn }}>
          <DateTimePicker
            testID="Birthday"
            value={date}
            textColor="black"
            onChange={(event, selected) => setDate(selected)}
          />
        </View>

        <TouchableOpacity onPress={next} style={{ marginTop: "5%" }}>
          <View
            style={{
              padding: "5%",
              alignItems: "center",
              backgroundColor: "red",
              borderRadius: width * 0.008,
            }}
          >
            {!clicked ? (
              <Text style={{ fontSize: width * 0.04, color: "white" }}>
                Next
              </Text>
            ) : (
              <ActivityIndicator color="white" />
            )}
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textIn: {
    width: "100%",
    borderBottomWidth: 0.3,
    borderBottomColor: "black",
    color: "black",
  },
});
