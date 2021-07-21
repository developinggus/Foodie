// screen for username input
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
  let [username, setUserNameLocal] = useState("");
  let [taken, setTaken] = useState(false);
  let [clicked, setClicked] = useState(false);

  const next = async () => {
    setClicked(true);
    try {
      const res = await authContext.checkUserName(username); // check if userName is taken
      console.log(res);
      if (res) {
        setTaken(true); // if true, lets user know username is taken
      } else {
        authContext.setUserName(username); // set username variable to value of username
        navigation.navigate("email"); // navigate to email screen
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
  const back = () => {
    navigation.goBack();
  };
  const typing = (text) => {
    setUserNameLocal(text);
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
        <Text style={{ fontSize: width * 0.06, marginTop: "10%" }}>
          Create Username
        </Text>
        <TextInput
          placeholder="Username"
          placeholderTextColor="grey"
          style={{ paddingVertical: "5%", ...styles.textIn }}
          autoCorrect={false}
          value={username}
          onChangeText={typing}
        />
        {taken && ( // if taken variable becomes true displays error message
          <Text style={[s.mt5, { color: "red" }]}>
            This username already exists
          </Text>
        )}
        <TouchableOpacity
          disabled={username === ""}
          onPress={next}
          style={{ opacity: username === "" ? 0.5 : 0.8, marginTop: "5%" }}
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
