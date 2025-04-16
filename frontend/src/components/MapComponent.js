import React from "react";
import MapView, { UrlTile, Marker, Polyline } from "react-native-maps";
import { styles } from "../styles/styles";

const taxiStations = [
  {
    name: "Bole Taxi Station",
    latitude: 9.013,
    longitude: 38.773,
    directTo: ["Bole Airport", "CMC"],
  },
  {
    name: "Piazza Taxi Station",
    latitude: 9.033,
    longitude: 38.753,
    directTo: ["Arat Kilo", "Sidist Kilo"],
  },
  {
    name: "Mexico Square Taxi",
    latitude: 9.01,
    longitude: 38.742,
    directTo: ["Meskel Square", "Lideta"],
  },
  {
    name: "Meskel Square Station",
    latitude: 9.011,
    longitude: 38.761,
    directTo: ["Mexico Square", "Bole"],
  },
  {
    name: "Sar Bet Taxi Stand",
    latitude: 9.025,
    longitude: 38.735,
    directTo: ["Lideta", "Autobis Tera"],
  },
  {
    name: "CMC Taxi Terminal",
    latitude: 9.02,
    longitude: 38.827,
    directTo: ["Bole", "Hayahulet"],
  },
  {
    name: "Megenagna Station",
    latitude: 9.021,
    longitude: 38.802,
    directTo: ["Bole", "CMC"],
  },
  {
    name: "Lideta Taxi Stop",
    latitude: 9.013,
    longitude: 38.732,
    directTo: ["Mexico Square", "Sar Bet"],
  },
  {
    name: "Kazanchis Station",
    latitude: 9.015,
    longitude: 38.767,
    directTo: ["Meskel Square", "Bole"],
  },
  {
    name: "4 Kilo Taxi Stand",
    latitude: 9.034,
    longitude: 38.763,
    directTo: ["Piazza", "Sidist Kilo"],
  },
];

const MapComponent = ({ mapRef, userLocation, routePlan }) => {
  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      initialRegion={{
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
      showsUserLocation={true}
    >
      <UrlTile
        urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        maximumZ={19}
      />
      {taxiStations.map((station, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: station.latitude,
            longitude: station.longitude,
          }}
          title={station.name}
          description={
            (routePlan?.type === "direct" &&
              routePlan?.station?.name === station.name) ||
            (routePlan?.type === "transfer" &&
              (routePlan?.startStation?.name === station.name ||
                routePlan?.endStation?.name === station.name))
              ? "Selected Station"
              : "Taxi Station"
          }
          image={{
            uri: "https://cdn-icons-png.flaticon.com/64/3448/3448312.png",
          }}
          anchor={{ x: 0.5, y: 1 }}
        />
      ))}
      {routePlan && (
        <>
          {routePlan.type === "direct" && routePlan.route && (
            <Polyline
              coordinates={routePlan.route}
              strokeColor="#007bff"
              strokeWidth={4}
            />
          )}
          {routePlan.type === "transfer" &&
            routePlan.route1 &&
            routePlan.route2 && (
              <>
                <Polyline
                  coordinates={routePlan.route1}
                  strokeColor="#007bff"
                  strokeWidth={4}
                />
                <Polyline
                  coordinates={routePlan.route2}
                  strokeColor="#ff4500"
                  strokeWidth={4}
                />
              </>
            )}
        </>
      )}
    </MapView>
  );
};

export default MapComponent;
