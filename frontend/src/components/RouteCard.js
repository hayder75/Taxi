import React from "react";
import { View, Text } from "react-native";
import { styles } from "../styles/styles";

const RouteCard = ({ routePlan, destination }) => {
  return (
    <View style={styles.routeCard}>
      <Text style={styles.routeTitle}>
        {routePlan.type === "direct" ? "Direct Route" : "Transfer Route"}
      </Text>
      {routePlan.type === "direct" ? (
        <>
          <Text style={styles.routeText}>
            Go to: {routePlan.station.name} (
            {routePlan.distanceToStation.toFixed(2)} km)
          </Text>
          <Text style={styles.routeSubText}>
            Direct taxi available to {destination}
          </Text>
        </>
      ) : (
        <>
          <Text style={styles.routeText}>
            1. Go to: {routePlan.startStation.name} (
            {routePlan.distanceToStart.toFixed(2)} km)
          </Text>
          <Text style={styles.routeText}>
            2. Transfer to: {routePlan.endStation.name} (
            {routePlan.distanceBetweenStations.toFixed(2)} km)
          </Text>
          <Text style={styles.routeSubText}>
            Then take taxi to {destination}
          </Text>
        </>
      )}
    </View>
  );
};

export default RouteCard;
