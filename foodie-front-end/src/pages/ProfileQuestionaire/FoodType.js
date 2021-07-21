// food types question screen

import React, { useContext, useState } from "react";
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
import MultiSelect from "react-native-multiple-select";
import { ProfileQuestionaireContext } from "../../context";

export default (props) => {
  const questionaire = useContext(ProfileQuestionaireContext);
  const [selectedItems, setSelectedItems] = useState([]);
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;

  // food type options
  const items = [
    {
      id: "chinese",
      name: "Chinese",
    },
    {
      id: "italian",
      name: "Italian",
    },
    {
      id: "american",
      name: "American",
    },
    {
      id: "indian",
      name: "Indian",
    },
    {
      id: "mexican",
      name: "Mexican",
    },
    {
      id: "japanese",
      name: "Japanese",
    },
    {
      id: "french",
      name: "French",
    },
    {
      id: "vietnamese",
      name: "Vietnamese",
    },
    {
      id: "greek",
      name: "Greek",
    },
  ];

  // adds selected item to food types list
  const onSelectedItemsChange = (selected) => {
    questionaire.setFoodTypes(selected);
  };
  const get_font_size = (size) => {
    return size / PixelRatio.getFontScale();
  };

  // navigate to dining type question screen
  const toDining = async () => {
    console.log(selectedItems);
    // await questionaire.setFoodTypes(setSelectedItems)
    props.navigation.navigate("dining");
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={{ marginTop: "15%" }}>
        <Text style={{ fontSize: get_font_size(17) }}>
          Which cuisines are your go to?
        </Text>
      </View>
      <MultiSelect
        hideTags
        items={items}
        uniqueKey="id"
        onSelectedItemsChange={onSelectedItemsChange}
        selectedItems={questionaire.state.foodTypes}
        selectText="Pick Items"
        searchInputPlaceholderText="Search Items..."
        onChangeInput={(text) => console.log(text)}
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        displayKey="name"
        searchInputStyle={{ color: "#CCC" }}
        submitButtonColor="#CCC"
        submitButtonText="Close"
        searchInputStyle={{ padding: "5%" }}
        styleMainWrapper={{ width: width, padding: "5%" }}
        styleDropdownMenuSubsection={{ padding: "10%" }}
        styleListContainer={{ padding: "5%" }}
        styleTextDropdown={{ paddingLeft: "10%" }}
      />

      <View style={{ flex: 2 }}>
        <TouchableOpacity
          style={{
            borderColor: "black",
            height: width * 0.08,
            width: width * 0.3,
            borderWidth: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={toDining}
        >
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
