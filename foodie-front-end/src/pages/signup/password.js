// password input screen
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
  StatusBar,
} from "react-native";
import { Icon } from "../../components";
import { AuthContext } from "../../context";
import { styles as s } from "react-native-style-tachyons";
const { width, height } = Dimensions.get("window");
const cross = Math.sqrt(width * width + height * height);

export default (props) => {
  const authContext = useContext(AuthContext);
  const { password, confirmPassword } = authContext.state;
  let [clicked, setClicked] = useState(false);
  const [error, setError] = useState(null);

  // creates account in database
  const createAccount = async () => {
    if (!passwordCheck()) return; // checks if passwords match
    setClicked(true);
    try {
      const res = await authContext.signUp();
      Alert.alert(
        "Success",
        "Account Created Successfully",
        [{ text: "Close", style: "default" }],
        { cancelable: false }
      );
      props.navigation.navigate("sign in");
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

  // checks if password is valid and matches
  const passwordCheck = () => {
    if (password.length < 6) {
      setError("your passwords must be at least 6 characters"); // sets error to be displayed
      return false;
    }
    if (password !== confirmPassword) {
      // check if passwords mathch
      setError("your passwords do not match");
      return false;
    }
    setError(null);
    return true;
  };

  const back = () => {
    props.navigation.goBack();
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
          Password
        </Text>
        <TextInput
          placeholder="Password"
          placeholderTextColor="grey"
          style={{ paddingVertical: "5%", marginTop: "5%", ...styles.textIn }}
          value={password}
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={(text) => authContext.setPassword(text)}
        />

        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="grey"
          style={{ paddingVertical: "5%", marginTop: "8%", ...styles.textIn }}
          value={confirmPassword}
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={(text) => authContext.setConfirmPassword(text)}
        />
        {error && <Text style={[s.mt1, { color: "red" }]}>{error}</Text>}

        <TouchableOpacity
          disabled={password === ""}
          onPress={createAccount}
          style={{ opacity: password === "" ? 0.5 : 0.8, marginTop: "5%" }}
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
                Create Account
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
  errorMessage: {
    fontSize: 16,
    color: "red",
  },
});
