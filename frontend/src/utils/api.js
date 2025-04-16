import { Alert } from "react-native";

const GRAPHHOPPER_API_KEY = "e0ed05af-9b5b-46cc-bd08-bfcebfd16d50";

export const geocodeDestination = async (dest) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        dest
      )}&format=json&limit=1`
    );
    const data = await response.json();
    if (data.length > 0) {
      return {
        latitude: parseFloat(data[0].lat),
        longitude: parseFloat(data[0].lon),
      };
    }
    throw new Error("No results found");
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
};

export const fetchRouteSegment = async (startLat, startLon, endLat, endLon) => {
  try {
    const url = `https://graphhopper.com/api/1/route?point=${startLat},${startLon}&point=${endLat},${endLon}&vehicle=car&locale=en&points_encoded=false&key=${GRAPHHOPPER_API_KEY}`;
    console.log("Fetching route from:", url);
    const response = await fetch(url);
    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log(
      "API response (paths length):",
      data.paths ? data.paths.length : "No paths"
    );

    if (data.paths && data.paths.length > 0) {
      const points = data.paths[0].points.coordinates;
      const route = points.map(([lon, lat]) => ({
        latitude: lat,
        longitude: lon,
      }));
      console.log("Route coordinates (first 5):", route.slice(0, 5));
      return route;
    }
    throw new Error("No route found in GraphHopper response");
  } catch (error) {
    console.error("Routing error:", error.message);
    Alert.alert("Routing Error", `Failed to fetch route: ${error.message}`);
    return [];
  }
};
