require('dotenv').config();
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api'); // <-- Tambahkan baris ini

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRoutes); // <-- Tambahkan baris ini. Semua endpoint di api.js akan diawali dengan /api

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