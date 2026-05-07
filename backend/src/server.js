require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware wajib
app.use(cors()); // Biar frontend Yusuf bisa akses API ini
app.use(express.json()); // Biar bisa baca request body format JSON

// Route dasar untuk ngetes server
app.get('/', (req, res) => {
    res.json({ 
        status: 'success',
        message: 'WorkSafe AI Backend API is running!' 
    });
});

// Jalankan Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});