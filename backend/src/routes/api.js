// src/routes/api.js
const express = require('express');
const router = express.Router();
const { getAndSavePrediction, getUserHistory, deletePrediction } = require('../controllers/predictController');
const { verifyToken } = require('../middlewares/authMiddleware'); // <-- Import middleware
const { syncUser } = require('../controllers/userController');

router.get('/user/sync', verifyToken, syncUser);
router.post('/predict-risk', verifyToken, getAndSavePrediction);
router.get('/predict/history', verifyToken, getUserHistory);
router.delete('/predict/history/:id', verifyToken, deletePrediction);


module.exports = router;

