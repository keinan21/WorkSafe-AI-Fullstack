const supabase = require('../config/supabase');

const getAndSavePrediction = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ status: 'error', message: 'title dan description wajib diisi!' });
        }

        const userId = req.user ? req.user.uid : "anonymous_user"; 
        const AI_ENDPOINT = "https://worksafe-ai-production.up.railway.app/predict";

        // JALUR JINAK TIMEOUT: Paksa Node.js nunggu sampai 60 detik
        const abortController = new AbortController();
        const timeoutId = setTimeout(() => abortController.abort(), 60000);

        const aiResponse = await fetch(AI_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body),
            signal: abortController.signal
        });
        clearTimeout(timeoutId);

        if (!aiResponse.ok) {
            throw new Error(`Server AI Railway Error dengan status: ${aiResponse.status}`);
        }

        const aiData = await aiResponse.json();

        // Ambil data asli dari Adit tanpa diubah-ubah namanya
        const finalPred = aiData.prediction?.final || {};
        const reskill = aiData.reskilling_recommendation || {};

        // Satukan ke objek ai_details sesuai struktur murni dari AI
        const aiDetails = {
            riskCategory: finalPred.risk_label || "Medium Risk",
            automationProbability: reskill.risk_interpretation || "Analisis diproses.",
            mainReskillingGoal: reskill.main_reskilling_goal || "",
            estimatedLearningDuration: reskill.estimated_learning_duration || "3 Bulan",
            reskillingRecommendations: reskill.recommended_skills || [], // Bisa array string / objek
            toolsToLearn: reskill.tools_to_learn || [],
            learningRoadmap: reskill.learning_roadmap || {},
            miniProjectIdeas: reskill.mini_project_ideas || [],
            careerTransitionOptions: reskill.career_transition_options || []
        };

        // Simpan mentah-mentah ke Supabase
        const { data: savedData, error: dbError } = await supabase
            .from('predictions')
            .insert([
                {
                    user_id: userId,
                    job_title: title,
                    risk_score: parseFloat(finalPred.risk_percent || 0),
                    ai_details: aiDetails
                }
            ])
            .select();

        if (dbError) throw new Error(`Supabase Error: ${dbError.message}`);

        return res.status(200).json({
            status: 'success',
            data: {
                id: savedData[0].id,
                job_title: title,
                risk_score: parseFloat(finalPred.risk_percent || 0),
                created_at: savedData[0].created_at,
                ai_details: aiDetails
            }
        });

    } catch (error) {
        console.error("Error di predictController:", error);
        const isTimeout = error.name === 'AbortError' || error.message.includes('timeout');
        return res.status(500).json({
            status: 'error',
            message: isTimeout ? 'Server AI Railway lemot / timeout! Coba submit ulang.' : error.message
        });
    }
};

const getUserHistory = async (req, res) => {
    try {
        const userId = req.user.uid;
        const { data, error } = await supabase
            .from('predictions')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.status(200).json({ status: 'success', data: data });
    } catch (error) {
        console.error("Error get history:", error);
        res.status(500).json({ status: 'error', message: 'Gagal mengambil data riwayat' });
    }
};

// Tambahkan fungsi ini di predictController.js lu
// GANTI fungsi deletePrediction di predictController.js lu dengan ini:
const deletePrediction = async (req, res) => {
  try {
    const userId = req.user ? req.user.uid : null;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({ status: 'error', message: 'User tidak terautentikasi!' });
    }

    // Hapus data murni berdasarkan ID dan User ID pemiliknya
    const { error } = await supabase
      .from('predictions')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) throw error;

    // Kirim respon JSON resmi, Express gak akan ngirim HTML lagi
    return res.status(200).json({ 
      status: 'success', 
      message: 'Riwayat analisis berhasil dihapus!' 
    });

  } catch (error) {
    console.error("Error di backend deletePrediction:", error);
    return res.status(500).json({ 
      status: 'error', 
      message: 'Internal Server Error: ' + error.message 
    });
  }
};


// Pastikan di baris paling bawah file sudah di-export:
module.exports = {
  getAndSavePrediction,
  getUserHistory,
  deletePrediction // <--- Pastikan ini ada
};