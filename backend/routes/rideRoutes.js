const express = require('express');
const router = express.Router();
const { getRoute } = require('../controllers/rideController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/route', protect, getRoute);

module.exports = router;