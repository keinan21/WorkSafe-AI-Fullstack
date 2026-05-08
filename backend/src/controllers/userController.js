// src/controllers/userController.js
const supabase = require('../config/supabase');

const syncUser = async (req, res) => {
    // req.user didapat dari token Firebase yang sudah lolos dari Satpam (middleware)
    const { uid, email, name, picture } = req.user;

    try {
        // 1. Cek apakah user sudah ada di database Supabase
        let { data: profile, error: fetchError } = await supabase
            .from('profiles')
            .select('*')
            .eq('firebase_uid', uid)
            .single();

        // 2. Kalau belum ada (user baru), masukkan ke database
        if (!profile) {
            const { data: newProfile, error: insertError } = await supabase
                .from('profiles')
                .insert([
                    { 
                        firebase_uid: uid, 
                        email: email, 
                        full_name: name || '', 
                        avatar_url: picture || '',
                        role: 'worker' 
                    }
                ])
                .select()
                .single();

            if (insertError) throw insertError;
            profile = newProfile;
            console.log(`User baru terdaftar: ${email}`);
        } else {
            console.log(`User lama login: ${email}`);
        }

        // 3. Kembalikan data profil ke frontend
        res.json({
            status: 'success',
            message: 'User berhasil disinkronisasi',
            data: profile
        });

    } catch (error) {
        console.error("Error sync user:", error);
        res.status(500).json({
            status: 'error',
            message: 'Terjadi kesalahan saat sinkronisasi data user'
        });
    }
};

module.exports = { syncUser };