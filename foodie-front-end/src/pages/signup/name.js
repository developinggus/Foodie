// screen for name input
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { AuthContext } from "../../context";
import LinearGradient from "react-native-linear-gradient";
import { styles as s } from "react-native-style-tachyons";
const { width, height } = Dimensions.get("window");
const cross = Math.sqrt(width * width + height * height);

export default ({ navigation }) => {
  const authContext = useContext(AuthContext);
  let [name, setName] = useState("");
  let [taken, setTaken] = useState(false);
  let [clicked, setClicked] = useState(false);

  const next = () => {
    setClicked(true);
    authContext.setName(name); // set name variable to value of name
    navigation.navigate("birthday"); // navigate to birthdate screen
  };

  // go to previous screen
  const back = () => {
    navigation.goBack();
  };
  const typing = (text) => {
    setName(text); // store what user types in name variable
    setTaken(false);
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
        <Text style={{ fontSize: width * 0.06, marginTop: "10%" }}>Name</Text>
        <TextInput
          placeholder="Name"
          placeholderTextColor="grey"
          style={{ paddingVertical: "5%", ...styles.textIn }}
          autoCorrect={false}
          value={name}
          onChangeText={typing}
        />
        <TouchableOpacity
          disabled={name === ""}
          onPress={next}
          style={{ opacity: name === "" ? 0.5 : 0.8, marginTop: "5%" }}
        >
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
    fontSize: width * 0.04,
  },
});
