// src/controllers/userController.js
const supabase = require('../config/supabase');

const syncUser = async (req, res) => {
    // req.user didapat dari Satpam (authMiddleware) yang kita buat sebelumnya
    const { uid, email, name, picture } = req.user;

    try {
        // 1. Cek apakah user sudah ada di table profiles
        let { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('firebase_uid', uid)
            .single();

        // 2. Jika belum ada, buat profile baru (Auto-Register)
        if (!profile) {
            const { data: newProfile, error: insertError } = await supabase
                .from('profiles')
                .insert([
                    { 
                        firebase_uid: uid, 
                        email: email, 
                        full_name: name, 
                        avatar_url: picture,
                        role: 'worker' 
                    }
                ])
                .select()
                .single();

            if (insertError) throw insertError;
            profile = newProfile;
        }

        res.json({
            status: 'success',
            message: 'User synced successfully',
            data: profile
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

module.exports = { syncUser };