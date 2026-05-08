// src/routes/api.js
const express = require('express');
const router = express.Router();
const { getRiskPrediction } = require('../controllers/predictController');
const { verifyToken } = require('../middlewares/authMiddleware'); // <-- Import middleware
const { syncUser } = require('../controllers/userController');

// Pasang verifyToken di tengah-tengah sebagai penjaga
router.get('/user/sync', verifyToken, syncUser);
router.post('/predict-risk', verifyToken, getRiskPrediction);


module.exports = router;

