// src/routes/api.js

const express = require('express');
const router = express.Router();
const { getRiskPrediction } = require('../controllers/predictController');

// Endpoint untuk frontend mengirim data pekerjaan dan mendapat skor risiko
router.post('/predict-risk', getRiskPrediction);

module.exports = router;