// dining type question component
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
  const [type, setType] = useState("");
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;

  //navigate to distance question screen
  const toDistanceQuestion = async () => {
    //    await questionaire.setDining(type)
    props.navigation.navigate("distance");
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
          Do you prefer dining in or taking out?
        </Text>
      </View>
      <View>
        <Picker
          selectedValue={questionaire.state.dining}
          style={{ width: width * 0.8, marginBottom: height * 0.05 }}
          onValueChange={async (itemValue, itemIndex) =>
            await questionaire.setDining(itemValue)
          }
        >
          <Picker.Item label="No Preference" value={1} />
          <Picker.Item label="Dine In" value={2} />
          <Picker.Item label="Take Out" value={3} />
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
          onPress={toDistanceQuestion}
        >
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
