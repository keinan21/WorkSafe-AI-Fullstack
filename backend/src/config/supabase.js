// src/config/supabase.js
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Gagal konek ke Supabase: URL atau KEY tidak ditemukan di file .env");
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;