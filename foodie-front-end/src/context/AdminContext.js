import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";

const AdminContext = React.createContext();

const AdminProvider = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [comments, setComments] = useState([]);
  const [token, setToken] = useState("");

  const getComments = async (id) => {
    console.log(id);
    var res;
    try {
      res = await axios.get(
        "http://192.168.1.201:3000/api/findCommentsForRestaurant",
        {
          params: {
            restaurant: id,
          },
        }
      );
    } catch (error) {
      console.log(`Failed get comments: ${error}`);
      throw "Failed to get from back-end server1";
    }
    console.log(res.data);
    setComments(res.data.data);
    return res.data;
  };

  const getRestaurants = async () => {
    try {
      const res = await axios.get(
        `http://192.168.1.201:3000/api/findRestaurant`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(res.data.data);
      setRestaurants(res.data.data);
    } catch (error) {
      throw "Failed to get restaurants";
    }
  };

  const deleteComment = async (id) => {
    var res;
    try {
      res = await axios.get("http://192.168.1.201:3000/api/deleteComment", {
        params: {
          id: id,
        },
      });
      var filtered = comments.filter(function (value, index, arr) {
        return value._id != id;
      });
      setComments(filtered);
    } catch (error) {
      console.log(`Failed get comments: ${error}`);
      throw "Failed to delete comment";
    }
  };

  const state = {
    state: {
      restaurants,
      comments,
    },
    setComments,
    setRestaurants,
    getComments,
    getRestaurants,
    deleteComment,
  };

  return (
    <AdminContext.Provider value={state}>
      {props.children}
    </AdminContext.Provider>
  );
};

export { AdminContext, AdminProvider };
