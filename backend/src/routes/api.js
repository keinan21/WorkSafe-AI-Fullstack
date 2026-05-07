// src/routes/api.js
const express = require('express');
const router = express.Router();
const { getRiskPrediction } = require('../controllers/predictController');
const { verifyToken } = require('../middlewares/authMiddleware'); // <-- Import middleware

// Pasang verifyToken di tengah-tengah sebagai penjaga
router.post('/predict-risk', verifyToken, getRiskPrediction);

module.exports = router;