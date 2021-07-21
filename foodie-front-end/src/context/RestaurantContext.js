import React, { useState } from "react";
import axios from "axios";

const RestaurantContext = React.createContext();

const RestaurantProvider = (props) => {
  const [error, setError] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [name, setName] = useState("");

  const findRestaurant = async () => {
    var res;
    try {
      res = await axios.get("http://192.168.1.201:3000/api/findRestaurant", {
        params: {},
      });
    } catch (error) {
      console.log(`Failed get restaurants: ${error}`);
      throw "Failed to get restaurants from back-end server";
    }
    console.log(res.data);
    setRestaurants(res.data);
    return res.data;
  };

  const state = {
    state: {
      name,
      restaurants,
    },
    setName,
    setRestaurants,
    findRestaurant,
  };
  return (
    <RestaurantContext.Provider value={state}>
      {props.children}
    </RestaurantContext.Provider>
  );
};
export { RestaurantContext, RestaurantProvider };
