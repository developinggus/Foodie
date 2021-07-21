// email input screen
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
import { styles as s } from "react-native-style-tachyons";

const { width, height } = Dimensions.get("window");
const cross = Math.sqrt(width * width + height * height);
var FORMAT = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default ({ navigation }) => {
  const authContext = useContext(AuthContext);
  let [email, setEmailLocal] = useState("");
  let [taken, setTaken] = useState(false);
  let [formatted, setFormatted] = useState(true);
  let [clicked, setClicked] = useState(false);

  const next = async () => {
    if (!checkEmail()) return setFormatted(false); // check if email is an email
    setClicked(true);
    try {
      const res = await authContext.checkEmail(email); // check if email exists
      if (res) {
        setTaken(true);
      } else {
        authContext.setEmail(email); // set email variable to value of email
        navigation.navigate("name"); // navigate to name input screen
      }
    } catch (err) {
      Alert.alert(
        "Error",
        err.toString(),
        [
          {
            text: "Cancel",
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    }
    setClicked(false);
  };

  const checkEmail = () => {
    return FORMAT.test(email);
  };

  const back = () => {
    navigation.goBack();
  };

  const typing = (text) => {
    setEmailLocal(text);
    setTaken(false);
    setFormatted(true);
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
          Create Email
        </Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor="grey"
          style={{ paddingVertical: "5%", ...styles.textIn }}
          autoCorrect={false}
          value={email}
          onChangeText={typing}
          keyboardType="email-address"
        />
        {!formatted && (
          <Text style={[s.mt5, { color: "red" }]}>
            Please Enter a Valid Email
          </Text>
        )}
        {taken && (
          <Text style={[s.mt5, { color: "red" }]}>
            This email already exists
          </Text>
        )}
        <TouchableOpacity
          disabled={email === ""}
          onPress={next}
          style={{ opacity: email === "" ? 0.5 : 0.8, marginTop: "5%" }}
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
