// price question screen
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

export default (props) => {
  const questionaire = useContext(ProfileQuestionaireContext);
  const [price, setPrice] = useState("");
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;

  // navigate to food types question screen
  const toFoodQuestion = async () => {
    // await questionaire.setPrice(price)
    props.navigation.navigate("food");
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
          How much do you typically spend when you eat out?
        </Text>
      </View>
      <View>
        <Picker
          selectedValue={questionaire.state.price}
          style={{ width: width * 0.8, marginBottom: height * 0.05 }}
          onValueChange={async (itemValue, itemIndex) =>
            await questionaire.setPrice(itemValue)
          }
        >
          <Picker.Item label="No Preference" value="none" />
          <Picker.Item label="$" value="$" />
          <Picker.Item label="$$" value="$$" />
          <Picker.Item label="$$$" value="$$$" />
          <Picker.Item label="$$$$" value="$$$$" />
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
          onPress={toFoodQuestion}
        >
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
