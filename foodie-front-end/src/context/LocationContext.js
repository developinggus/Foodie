import axios from 'axios';
import React, { useState } from 'react';
import * as Location from "expo-location"

const getLonLatURL = "http://ip-api.com/json/";
const getMyIpURL = "http://ipv4bot.whatismyipaddress.com"

const LocationContext = React.createContext()

const LocationProvider = function(props) {
    const [latitude, setLatitude] = useState(undefined);
    const [longitude, setLongitude] = useState(undefined);

    async function getLocation(is_refresh) {
        if (!is_refresh && latitude != undefined && longitude != undefined)
            return;
    
        let status = await Location.requestPermissionsAsync();
        if (status != 'granted')
            return getLocationByIP()

        let location = await Location.getCurrentPositionAsync({});
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);

        console.log(location.coords);
        return
    }

    async function getLocationByIP() {
        var ip;
        try {
            ip = await axios({
                method: "get",
                url: getMyIpURL
            });
        } catch(error) {
            console.log(`Failed to get IP: ${error}`);
            throw("Failed to get IP");
        }
        ip = ip.data;
    
        // requests location with the client's ip address
        var locationData;
        try {
            locationData = await axios({
                method: "get",
                url: `${getLonLatURL}/${ip}`
            });
        } catch(error) {
            console.log(`Failed to get location: ${error}`);
            throw("Failed to get location");
        }
        locationData = locationData.data;
    
        if (locationData.status == "success") {
            setLatitude(locationData.lat);
            setLongitude(locationData.lon);
            return;
        } else {
            throw(locationData.message);
        }
    }

    const state = {
        state: {
            latitude,
            longitude
        },
        getLocation
    }
    
    return <LocationContext.Provider value={state}>{props.children}</LocationContext.Provider>;
}

export { LocationContext, LocationProvider }