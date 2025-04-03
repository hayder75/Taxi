const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  fromCoordinates: {
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
  },
  toCoordinates: {
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
  },
}, { timestamps: true });

module.exports = mongoose.model('Route', routeSchema);