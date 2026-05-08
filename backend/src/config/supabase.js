// src/config/supabase.js
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Gagal konek: Supabase URL atau Key tidak ditemukan di .env!");
}

// Inisialisasi koneksi ke Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;