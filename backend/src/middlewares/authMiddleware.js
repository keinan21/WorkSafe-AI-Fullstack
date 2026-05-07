// src/middlewares/authMiddleware.js
const admin = require('../config/firebase');

const verifyToken = async (req, res, next) => {
    // 1. Tangkap header Authorization dari request
    const authHeader = req.headers.authorization;

    // 2. Cek apakah token ada dan formatnya benar (Bearer <token>)
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            status: 'error',
            message: 'Akses ditolak. Token autentikasi tidak ditemukan.'
        });
    }

    // 3. Pisahkan kata "Bearer " untuk mengambil token aslinya saja
    const token = authHeader.split(' ')[1];

    try {
        // 4. Minta Firebase mengecek keaslian token ini
        const decodedToken = await admin.auth().verifyIdToken(token);
        
        // 5. Kalau asli, simpan data user (email, nama, dll) ke dalam request
        req.user = decodedToken;
        
        // 6. Persilakan request lanjut ke Controller
        next(); 
    } catch (error) {
        // Kalau token palsu atau kadaluarsa, tolak aksesnya
        return res.status(401).json({
            status: 'error',
            message: 'Token tidak valid atau sudah kadaluarsa.'
        });
    }
};

module.exports = { verifyToken };