//distance question component
import React, { useState, useContext } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  StyleSheet,
  PixelRatio,
  Text,
  View,
  Dimensions,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { ProfileQuestionaireContext } from "../../context";

const { width, height } = Dimensions.get("window");

export default (props) => {
  const questionaire = useContext(ProfileQuestionaireContext);
  const [distance, setDistance] = useState("");
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;

  // submits responses to questionaire
  const submit = async () => {
    try {
      await questionaire.submit();
      props.navigation.navigate("main");
    } catch (error) {
      Alert.alert(
        "Error",
        error,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    }
  };

  const get_font_size = (size) => {
    return size / PixelRatio.getFontScale();
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        paddingTop: "15%",
        backgroundColor: "white",
      }}
    >
      <View>
        <Text style={{ fontSize: get_font_size(17) }}>
          How far are you willing to typically travel?
        </Text>
      </View>
      <View>
        <Picker
          selectedValue={questionaire.state.distance}
          style={{ width: width * 0.8, marginBottom: height * 0.05 }}
          onValueChange={async (itemValue, itemIndex) =>
            await questionaire.setDistance(itemValue)
          }
        >
          <Picker.Item label="No Preference" value={0} />
          <Picker.Item label="3 km" value={3} />
          <Picker.Item label="10 km" value={10} />
          <Picker.Item label="25 km" value={25} />
          <Picker.Item label="50 km" value={50} />
        </Picker>
      </View>
      <View>
        <TouchableOpacity
          style={{
            borderColor: "black",
            height: width * 0.08,
            width: width * 0.3,
            borderWidth: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={submit}
        >
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
