import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const ProfileQuestionaireContext = React.createContext();

const ProfileProvider = (props) => {
  const [foodTypes, setFoodTypes] = useState([]);
  const [price, setPrice] = useState("none");
  const [distance, setDistance] = useState(1);
  const [dining, setDining] = useState(1);

  const submit = async () => {
    const body = { foodTypes, price, distance, dining };
    try {
      const res = await axios.post(
        "http://192.168.1.201:3000/api/addProfileInfo",
        {
          foodTypes,
          price,
          distance,
          dining,
        },
        { headers: { email: await AsyncStorage.getItem("email") } }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
    console.log(body);
  };

  const state = {
    state: {
      foodTypes,
      price,
      distance,
      dining,
    },
    setFoodTypes,
    setPrice,
    submit,
    setDistance,
    setDining,
  };

  return (
    <ProfileQuestionaireContext.Provider value={state}>
      {props.children}
    </ProfileQuestionaireContext.Provider>
  );
};

export { ProfileQuestionaireContext, ProfileProvider };
