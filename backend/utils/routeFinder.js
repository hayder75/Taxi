const Route = require('../models/Route');
const { getDistance } = require('./distance');
const fetch = require('node-fetch'); 

const GRAPHHOPPER_API_KEY = "e0ed05af-9b5b-46cc-bd08-bfcebfd16d50";

const geocodeDestination = async (locationName) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationName)}&format=json&limit=1`
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

const fetchRouteSegment = async (startLat, startLon, endLat, endLon) => {
  try {
    const url = `https://graphhopper.com/api/1/route?point=${startLat},${startLon}&point=${endLat},${endLon}&vehicle=car&locale=en&points_encoded=false&key=${GRAPHHOPPER_API_KEY}`;
    console.log("Fetching route from:", url); // Debug log
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}: ${await response.text()}`);
    }
    const data = await response.json();
    if (data.paths && data.paths.length > 0) {
      const points = data.paths[0].points.coordinates;
      return points.map(([lon, lat]) => ({
        latitude: lat,
        longitude: lon,
      }));
    }
    throw new Error("No route found in GraphHopper response");
  } catch (error) {
    console.error("Routing error:", error.message);
    return [];
  }
};

const findBestRoute = async (start, end) => {
  // Fetch all routes from MongoDB
  const routes = await Route.find();
  if (!routes.length) {
    throw new Error("No routes available in database");
  }

  let startCoords, endCoords;

  // Geocode start and end if they are names
  if (typeof start === 'string') {
    startCoords = findCoordsInRoutes(routes, start);
    if (!startCoords) {
      startCoords = await geocodeDestination(start);
      if (!startCoords) throw new Error("Start location not found");
    }
  } else if (start.lat && start.lon) {
    startCoords = { latitude: start.lat, longitude: start.lon };
  }

  if (typeof end === 'string') {
    endCoords = findCoordsInRoutes(routes, end);
    if (!endCoords) {
      endCoords = await geocodeDestination(end);
      if (!endCoords) throw new Error("End location not found");
    }
  } else if (end.lat && end.lon) {
    endCoords = { latitude: end.lat, longitude: end.lon };
  }

  // Build graph with distances
  const graph = {};
  routes.forEach(route => {
    const distance = getDistance(
      route.fromCoordinates.lat, route.fromCoordinates.lon,
      route.toCoordinates.lat, route.toCoordinates.lon
    );
    if (!graph[route.from]) graph[route.from] = [];
    graph[route.from].push({ to: route.to, distance, routeData: route });
  });

  // BFS to find path with minimal transfers
  const queue = [[start, [start], 0]]; // [current, path, totalDistance]
  const visited = new Set();

  while (queue.length > 0) {
    const [current, path, totalDistance] = queue.shift();
    if (current === end) {
      const fullRoute = [];
      for (let i = 0; i < path.length - 1; i++) {
        const from = path[i];
        const to = path[i + 1];
        const routeSegment = routes.find(r => r.from === from && r.to === to);
        if (routeSegment) {
          const segmentCoords = await fetchRouteSegment(
            routeSegment.fromCoordinates.lat, routeSegment.fromCoordinates.lon,
            routeSegment.toCoordinates.lat, routeSegment.toCoordinates.lon
          );
          fullRoute.push(...segmentCoords);
        }
      }
      return {
        path,
        totalDistance,
        coordinates: fullRoute,
        type: path.length > 2 ? 'transfer' : 'direct',
      };
    }

    if (!visited.has(current)) {
      visited.add(current);
      const neighbors = graph[current] || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor.to)) {
          queue.push([neighbor.to, [...path, neighbor.to], totalDistance + neighbor.distance]);
        }
      }
    }
  }

  return null; // No route found
};

// Helper to find coordinates in routes
const findCoordsInRoutes = (routes, locationName) => {
  const route = routes.find(r => r.from === locationName || r.to === locationName);
  if (route) {
    return route.from === locationName ? route.fromCoordinates : route.toCoordinates;
  }
  return null;
};

module.exports = { findBestRoute, geocodeDestination, fetchRouteSegment };