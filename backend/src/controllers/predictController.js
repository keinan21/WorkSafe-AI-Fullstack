// src/controllers/predictController.js

const getRiskPrediction = (req, res) => {
    // Nantinya, data req.body ini yang akan kita kirim ke Flask AI
    const { jobTitle, jobDescription, industry } = req.body;

    // Validasi sederhana
    if (!jobTitle || !jobDescription) {
        return res.status(400).json({
            status: 'error',
            message: 'jobTitle dan jobDescription wajib diisi!'
        });
    }

    // --- MOCK DATA (Data Bohongan) ---
    // Mensimulasikan delay server AI memproses data selama 1.5 detik
    setTimeout(() => {
        res.json({
            status: 'success',
            data: {
                jobTitle: jobTitle,
                riskScore: 78.5, // Contoh skor AI (Persentase)
                riskCategory: 'High Risk', // B2C (Pekerja) akan melihat ini
                automationProbability: 'Tugas-tugas administratif rutin dalam deskripsi pekerjaan ini memiliki probabilitas otomasi tinggi berdasarkan model kami.',
                reskillingRecommendations: [
                    {
                        skill: 'Data Analysis dengan Python/Pandas',
                        relevanceScore: 92,
                        timeToLearn: '3-6 bulan'
                    },
                    {
                        skill: 'Manajemen CRM & Otomasi',
                        relevanceScore: 85,
                        timeToLearn: '1-3 bulan'
                    }
                ]
            }
        });
    }, 1500); 
};

module.exports = {
    getRiskPrediction
};