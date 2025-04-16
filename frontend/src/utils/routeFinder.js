import { fetchRouteSegment } from "./api";
import { getDistance } from "./distance";

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

export const findBestRoute = async (
  userLat,
  userLon,
  destLat,
  destLon,
  destinationName
) => {
  let nearestDirect = null;
  let minDirectDistance = Infinity;
  let nearestTransfer = null;
  let minTransferScore = Infinity;

  for (const station of taxiStations) {
    const distanceToStation = getDistance(
      userLat,
      userLon,
      station.latitude,
      station.longitude
    );

    if (
      station.directTo.some((dest) =>
        destinationName.toLowerCase().includes(dest.toLowerCase())
      )
    ) {
      const route = await fetchRouteSegment(
        userLat,
        userLon,
        station.latitude,
        station.longitude
      );
      if (route.length > 0 && distanceToStation < minDirectDistance) {
        minDirectDistance = distanceToStation;
        nearestDirect = {
          station,
          distanceToStation,
          route,
          type: "direct",
        };
      }
    }
  }

  if (!nearestDirect) {
    for (const startStation of taxiStations) {
      const distanceToStart = getDistance(
        userLat,
        userLon,
        startStation.latitude,
        startStation.longitude
      );

      for (const endStation of taxiStations) {
        if (startStation.name === endStation.name) continue;

        if (
          endStation.directTo.some((dest) =>
            destinationName.toLowerCase().includes(dest.toLowerCase())
          )
        ) {
          const distanceBetweenStations = getDistance(
            startStation.latitude,
            startStation.longitude,
            endStation.latitude,
            endStation.longitude
          );
          const totalScore = distanceToStart + distanceBetweenStations * 1.5;

          if (totalScore < minTransferScore) {
            const route1 = await fetchRouteSegment(
              userLat,
              userLon,
              startStation.latitude,
              startStation.longitude
            );
            const route2 = await fetchRouteSegment(
              startStation.latitude,
              startStation.longitude,
              endStation.latitude,
              endStation.longitude
            );
            if (route1.length > 0 && route2.length > 0) {
              minTransferScore = totalScore;
              nearestTransfer = {
                startStation,
                endStation,
                distanceToStart,
                distanceBetweenStations,
                route1,
                route2,
                type: "transfer",
              };
            }
          }
        }
      }
    }
  }

  const result = nearestDirect || nearestTransfer;
  console.log("Selected route plan:", JSON.stringify(result, null, 2));
  return result || null;
};
