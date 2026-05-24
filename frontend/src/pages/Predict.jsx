import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Sparkles, ArrowRight, ArrowLeft, Loader2, CheckCircle2, Briefcase, Building, FileText } from 'lucide-react'
import Nav from '../components/Nav'
import { useNavigate } from 'react-router'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'

// --- DATA 20 PERTANYAAN BARU ---
const surveyData = [
  {
    category: "Teknis & Fisik",
    questions: [
      { id: 'q1', text: "Seberapa sering Anda memperbaiki atau merawat mesin dalam pekerjaan sehari-hari?" },
      { id: 'q2', text: "Seberapa sering Anda mengoperasikan mesin produksi atau mengendarai kendaraan operasional?" },
      { id: 'q3', text: "Seberapa sering Anda melakukan aktivitas mengangkat atau memindahkan objek/barang fisik?" },
      { id: 'q4', text: "Apabila terjadi kendala teknis (error), seberapa tinggi kemampuan Anda dalam menganalisis dan menemukan akar masalahnya (troubleshooting)?" },
      { id: 'q5', text: "Seberapa sering aktivitas pekerjaan Anda membutuhkan pengerahan tenaga fisik yang besar?" }
    ]
  },
  {
    category: "Kognitif & Analitis",
    questions: [
      { id: 'q6', text: "Seberapa sering Anda dituntut untuk berpikir secara mendalam sebelum mengambil suatu tindakan atau keputusan?" },
      { id: 'q7', text: "Seberapa sering Anda menghadapi permasalahan rumit yang membutuhkan solusi kreatif dan inovatif?" },
      { id: 'q8', text: "Seberapa sering Anda melakukan pengolahan atau analisis data dalam pekerjaan?" },
      { id: 'q9', text: "Seberapa sering Anda harus mengambil keputusan penting yang berdampak pada pekerjaan atau organisasi?" },
      { id: 'q10', text: "Seberapa tinggi kemampuan Anda dalam menyerap dan mempelajari hal-hal baru secara mandiri?" }
    ]
  },
  {
    category: "Komunikasi & Teknis Kerja",
    questions: [
      { id: 'q11', text: "Seberapa sering Anda melakukan komunikasi lisan atau presentasi di depan banyak orang?" },
      { id: 'q12', text: "Seberapa sering Anda menyusun laporan tertulis, dokumen resmi, atau korespondensi kerja?" },
      { id: 'q13', text: "Seberapa sering Anda melakukan persuasi, meyakinkan pihak lain, atau melakukan negosiasi?" },
      { id: 'q14', text: "Seberapa besar porsi aktivitas pekerjaan harian Anda yang mengandalkan penggunaan komputer?" },
      { id: 'q15', text: "Seberapa sering Anda membuat perencanaan kerja serta menentukan skala prioritas tugas harian?" }
    ]
  },
  {
    category: "Manajemen & Interaksi Sosial",
    questions: [
      { id: 'q16', text: "Seberapa sering Anda melakukan koordinasi, kolaborasi, dan kerja sama di dalam tim?" },
      { id: 'q17', text: "Seberapa sering rekan kerja atau pihak lain meminta saran dan konsultasi profesional dari Anda?" },
      { id: 'q18', text: "Seberapa baik kemampuan Anda dalam manajemen waktu agar seluruh target pekerjaan selesai tepat waktu?" },
      { id: 'q19', text: "Seberapa sering Anda melakukan pemantauan (monitoring) terhadap jalannya proses kerja atau kondisi lingkungan sekitar?" },
      { id: 'q20', text: "Seberapa sering Anda memperbarui pengetahuan dan meningkatkan kompetensi yang relevan dengan bidang pekerjaan?" }
    ]
  }
];


const Predict = () => {
  const navigate = useNavigate()
  const [loadingAuth, setLoadingAuth] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    jobTitle: '',
    industry: '',
    jobDescription: '',
  })
  const [answers, setAnswers] = useState({}) 

  // URL Backend Lu
  const BACKEND_URL = "http://localhost:5001";

  // ==========================================
  // TAHAP 1: CEK AUTH & SINKRONISASI USER TO SUPABASE
  // ==========================================
  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (!user) {
          navigate("/login");
        } else {

          setLoadingAuth(false);

          try {
            const token = await user.getIdToken();
            
            fetch(`${BACKEND_URL}/user/sync`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })
            .then(res => res.json())
            .then(result => {
              if (result.status === 'success') {
                console.log("Background sync sukses:", result.data);
              }
            })
            .catch(err => {
              console.warn("Background sync gagal (Supabase mungkin offline), tapi user aman:", err.message);
            });

          } catch (err) {
            console.error("Gagal mengambil token Firebase:", err);
          }
        }
      });
      return () => unsubscribe();
  }, [navigate]);

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const nextStep = () => {
    if (currentStep === 0) {
      if (!formData.jobTitle || !formData.jobDescription) {
        alert("Isi Posisi dan Deskripsi Tugas dulu ya biar AI-nya punya konteks!");
        return;
      }
    }
    if (currentStep < surveyData.length) {
      window.scrollTo({ top: 0, behavior: 'smooth' }); 
      setCurrentStep(prev => prev + 1);
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setCurrentStep(prev => prev - 1);
    }
  }

  // ==========================================
  // TAHAP 2: KIRIM DATA PREDIKSI KE BACKEND
  // ==========================================
  const handleSubmit = async () => {
    setLoading(true)
    
    // Validasi 20 soal harus terisi
    const totalAnswered = Object.keys(answers).length;
    if (totalAnswered < 20) {
      alert(`Bro, baru ${totalAnswered} dari 20 pertanyaan yang diisi. Lengkapin dulu yak!`);
      setLoading(false);
      return;
    }

    try {
      // 1. Ambil Token Firebase User yang sedang login
      const token = await auth.currentUser.getIdToken();

      // 2. Bungkus data sesuai kebutuhan controller Adit + kuesioner kita
      const payload = {
        jobTitle: formData.jobTitle,
        jobDescription: formData.jobDescription,
        industry: formData.industry,
        surveyAnswers: answers // Kita selipkan di sini biar aman
      };

      // 3. Tembak API Predict Risk
      const response = await fetch(`${BACKEND_URL}/api/predict-risk`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // <--- Kirim token lagi ke Satpam
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.status === 'success') {
        console.log("Hasil Prediksi AI Adit:", result.data);
        
        // UBAH JADI SEPERTI INI:
        navigate('/hasil', { 
          state: { 
            prediction: result.data, 
            industry: formData.industry 
          } 
        });
      } else {
        alert("Gagal memproses prediksi: " + result.message);
      }

    } catch (error) {
      console.error("Error pas kirim data prediksi:", error);
      alert("Waduh, koneksi ke server putus atau error!");
    } finally {
      setLoadingAuth(false);
      setLoading(false);
    }
  }

  if (loadingAuth) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-sidebar gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="font-black uppercase tracking-widest text-sm">Mengecek Akses & Sinkronisasi...</p>
      </div>
    );
  }

  return (
    <>
      <Nav/>
      <div className="min-h-screen w-full bg-sidebar flex items-center justify-center p-4 py-12 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
        
        <div className="w-full max-w-3xl relative z-10">
          
          <div className="text-center mb-8">
            <div className="inline-block bg-white border-3 border-foreground p-3 mb-4 rotate-[-2deg] shadow-[4px_4px_0px_black]">
               <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-foreground drop-shadow-[2px_2px_0px_white]">
              Analisis Peranmu
            </h1>
            <p className="text-lg font-bold text-muted-foreground mt-2">
              {currentStep === 0 
                ? "Langkah Awal: Profil Pekerjaan" 
                : `Tahap ${currentStep} dari 4: `}
              {currentStep > 0 && <span className="text-primary border-b-4 border-primary pb-1">{surveyData[currentStep - 1].category}</span>}
            </p>
          </div>

          <Card className="border-3 border-foreground shadow-[10px_10px_0px_black] bg-white overflow-hidden">
            <CardContent className="p-6 md:p-8 space-y-8">
              
              {/* --- STEP 0: INFORMASI DASAR --- */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle" className="font-black uppercase text-xs tracking-widest">Posisi / Jabatan</Label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="jobTitle"
                          placeholder="Cth: Admin Gudang"
                          className="pl-11 h-12 text-base border-2 border-foreground shadow-[3px_3px_0px_black] font-medium"
                          value={formData.jobTitle}
                          onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="industry" className="font-black uppercase text-xs tracking-widest">Industri (Opsional)</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <select
                          id="industry"
                          className="w-full pl-11 pr-4 h-12 text-base bg-white border-2 border-foreground shadow-[3px_3px_0px_black] font-medium appearance-none cursor-pointer"
                          value={formData.industry}
                          onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        >
                          <option value="" disabled>Pilih Sektor Industri</option>
                          <option value="Teknologi">Teknologi & IT</option>
                          <option value="Keuangan">Keuangan & Perbankan</option>
                          <option value="Manufaktur">Manufaktur & Logistik</option>
                          <option value="Lainnya">Lainnya</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="jobDescription" className="font-black uppercase text-xs tracking-widest">Deskripsi Tugas Sehari-hari</Label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-4 h-5 w-5 text-muted-foreground" />
                      <textarea
                        id="jobDescription"
                        placeholder="Ceritakan rutinitasmu..."
                        className="w-full pl-11 pr-4 py-3 min-h-[160px] text-base bg-white border-2 border-foreground shadow-[4px_4px_0px_black] font-medium resize-y"
                        value={formData.jobDescription}
                        onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* --- STEP 1-4: KUESIONER 20 SOAL --- */}
              {currentStep > 0 && (
                <div className="space-y-8">
                  {surveyData[currentStep - 1].questions.map((q, index) => (
                    <div key={q.id} className="space-y-3 bg-muted/30 p-4 border-2 border-foreground shadow-[3px_3px_0px_black]">
                      <label className="font-black text-sm md:text-base leading-tight block">
                        {q.id.replace('q', '')}. {q.text}
                      </label>
                      <div className="flex justify-between gap-2 md:gap-4 mt-2">
                        {[1, 2, 3, 4, 5].map((val) => (
                          <button
                            key={val}
                            onClick={() => handleAnswer(q.id, val)}
                            className={`flex-1 h-12 md:h-14 font-black text-lg border-2 border-foreground transition-all 
                              ${answers[q.id] === val 
                                ? 'bg-primary text-primary-foreground shadow-none translate-y-[3px] translate-x-[3px]' 
                                : 'bg-white hover:bg-accent shadow-[3px_3px_0px_black] hover:translate-x-[1px] hover:translate-y-[1px]'
                              }`}
                          >
                            {val}
                          </button>
                        ))}
                      </div>
                      <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase px-1 text-center">
                        <span className="w-1/3 text-left">1 (Jarang / Tidak Dikuasai)</span>
                        <span className="w-1/3 text-right">5 (Selalu / Sangat Ahli)</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* --- NAVIGASI BAWAH --- */}
              <div className="flex gap-4 pt-4 border-t-4 border-foreground border-dashed">
                {currentStep > 0 && (
                  <Button 
                    type="button" 
                    onClick={prevStep}
                    className="w-1/3 bg-white text-foreground border-3 border-foreground shadow-[4px_4px_0px_black] font-black uppercase h-14 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                  >
                    <ArrowLeft className="mr-2 h-5 w-5" /> Kembali
                  </Button>
                )}
                
                {currentStep < surveyData.length ? (
                  <Button 
                    type="button" 
                    onClick={nextStep}
                    className="flex-1 bg-accent text-foreground border-3 border-foreground shadow-[4px_4px_0px_black] font-black uppercase h-14 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                  >
                    Selanjutnya <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                ) : (
                  <Button 
                    type="button" 
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 bg-primary text-primary-foreground border-3 border-foreground shadow-[4px_4px_0px_black] font-black uppercase h-14 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                  >
                    {loading ? <Loader2 className="animate-spin h-6 w-6" /> : <><CheckCircle2 className="mr-2 h-5 w-5" /> Selesai & Prediksi</>}
                  </Button>
                )}
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

export default Predict