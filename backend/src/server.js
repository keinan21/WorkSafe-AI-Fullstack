require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Mengizinkan request dari frontend
app.use(express.json()); // Agar bisa menerima request body berupa JSON

// Route Dasar (Untuk tes apakah server jalan)
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to WorkSafe AI Backend API!' });
});

// Jalankan Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});