const { createClient } = require('@supabase/supabase-js');
const ws = require('ws'); // <--- 1. Kita sisipkan ini di atas
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY; // <--- Tetap pakai KEY sesuai aslinya

if (!supabaseUrl || !supabaseKey) {
    console.error("Gagal konek: Supabase URL atau Key tidak ditemukan di .env!");
}

// 2. Inisialisasi koneksi ke Supabase + Kasih obat WebSocket
const supabase = createClient(supabaseUrl, supabaseKey, {
    realtime: {
        transport: ws // <--- Ini pelindung biar laptop lu gak crash
    }
});

module.exports = supabase;