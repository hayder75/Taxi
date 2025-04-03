const { findBestRoute } = require('../utils/routeFinder');

const getRoute = async (req, res) => {
  try {
    const { start, end } = req.query;
    if (!start || !end) {
      return res.status(400).json({ error: 'Start and end points are required' });
    }

    // Find the best route using database
    const bestRoute = await findBestRoute(start, end);

    if (!bestRoute) {
      return res.status(404).json({ error: 'No route found between these points' });
    }

    // Format response
    const response = {
      start,
      end,
      route: bestRoute.path,
      totalDistance: bestRoute.totalDistance,
      coordinates: bestRoute.coordinates, // For drawing on map
      type: bestRoute.type,
      transfers: bestRoute.type === 'transfer' ? bestRoute.path.length - 2 : 0,
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getRoute };