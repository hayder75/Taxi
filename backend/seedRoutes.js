const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Route = require('./models/Route'); // Adjust path as needed

// Connect to MongoDB
mongoose.connect('mongodb+srv://hayderaman01:hayder123@cluster0.ffmlrjx.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');

  // Load existing paths.json (if you still have it)
  let routesData = [];
  try {
    const jsonData = fs.readFileSync(path.join(__dirname, 'paths.json'), 'utf8');
    routesData = JSON.parse(jsonData);
  } catch (error) {
    console.warn('No paths.json found or error reading it, proceeding with hardcoded data');
  }

  // Hardcoded taxiStations from frontend
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

  // Generate routes from taxiStations
  const newRoutes = [];
  taxiStations.forEach(station => {
    station.directTo.forEach(destination => {
      newRoutes.push({
        from: station.name,
        to: destination,
        fromCoordinates: { lat: station.latitude, lon: station.longitude },
        toCoordinates: { lat: station.latitude, lon: station.longitude }, // Use same for now; update if you have exact dest coords
      });
    });
  });

  // Combine existing and new routes, removing duplicates
  const allRoutes = [...routesData, ...newRoutes].filter((route, index, self) =>
    index === self.findIndex((r) => r.from === route.from && r.to === route.to)
  );

  // Clear existing routes
  Route.deleteMany({})
    .then(() => {
      // Insert new routes
      return Route.insertMany(allRoutes);
    })
    .then(() => {
      console.log('Routes seeded successfully');
      mongoose.connection.close();
    })
    .catch(error => {
      console.error('Error seeding routes:', error);
      mongoose.connection.close();
    });
}).catch(error => {
  console.error('MongoDB connection error:', error);
});