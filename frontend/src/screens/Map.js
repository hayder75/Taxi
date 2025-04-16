import React, { useState, useEffect, useRef } from "react";
import { View } from "react-native";
import MapComponent from "../components/MapComponent";
import RouteCard from "../components/RouteCard";
import { geocodeDestination } from "../utils/api";
import { findBestRoute } from "../utils/routeFinder";
import { styles } from "../styles/styles";
import * as Location from "expo-location";
import { Alert } from "react-native";

const MapScreen = ({ route }) => {
  const { destination } = route.params;
  const [userLocation, setUserLocation] = useState({
    latitude: 9.03,
    longitude: 38.74,
  });
  const [routePlan, setRoutePlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission denied",
          "Location access is needed. Using default location."
        );
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  useEffect(() => {
    const fetchRoute = async () => {
      if (!userLocation || !destination) {
        Alert.alert("Error", "Location or destination missing.");
        return;
      }

      setIsLoading(true);
      const destCoords = await geocodeDestination(
        destination + ", Addis Ababa"
      );

      if (!destCoords) {
        setIsLoading(false);
        Alert.alert("Error", "Could not find the destination. Try again.");
        return;
      }

      const plan = await findBestRoute(
        userLocation.latitude,
        userLocation.longitude,
        destCoords.latitude,
        destCoords.longitude,
        destination
      );

      if (!plan) {
        setIsLoading(false);
        Alert.alert(
          "Error",
          "No viable route found. Try a different destination."
        );
        return;
      }

      console.log("Setting routePlan with:", JSON.stringify(plan, null, 2));
      setRoutePlan(plan);

      if (mapRef.current && plan) {
        const coords =
          plan.type === "direct"
            ? plan.route
            : [...plan.route1, ...plan.route2];
        console.log(
          "Fitting map to coordinates (first 5):",
          coords.slice(0, 5)
        );
        mapRef.current.fitToCoordinates(coords, {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        });
      }

      setIsLoading(false);
    };

    fetchRoute();
  }, [userLocation, destination]);

  return (
    <View style={styles.container}>
      <MapComponent
        mapRef={mapRef}
        userLocation={userLocation}
        routePlan={routePlan}
      />
      {routePlan && (
        <RouteCard routePlan={routePlan} destination={destination} />
      )}
    </View>
  );
};

export default MapScreen;
