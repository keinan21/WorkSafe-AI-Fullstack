import React, { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react'
import { useNavigate } from 'react-router'
import Loader from '@/components/Loader';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // URL URL Backend Lu (Sesuaikan menjadi `${BACKEND_URL}/api/user/sync` jika Adit pakai prefix /api)
  const BACKEND_URL = "https://worksafe-ai-fullstack.onrender.com/";

  // LOGIKA LOGIN GOOGLE + SINKRONISASI BACKEND
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      // 1. Login ke Firebase PopUp
      const res = await signInWithPopup(auth, provider);
      const token = await res.user.getIdToken();
      console.log("Token Firebase sukses didapat:", token);
        
      // 2. Langsung tembak route sync user milik Adit
      // 2. Langsung tembak route sync user milik Adit
      try {
        // Tambahkan /api/ di URL-nya (sesuaikan jika di backend Adit berbeda)
        const syncResponse = await fetch(`${BACKEND_URL}/api/user/sync`, {
          method: 'GET', // 
          headers: {
            'Content-Type': 'application/json', // Tambahkan ini standar API
            'Authorization': `Bearer ${token}` 
          }
        });
        
        const syncResult = await syncResponse.json();
        if (syncResponse.ok && syncResult.status === 'success') {
          console.log("User berhasil disinkronisasi ke Supabase:", syncResult.data);
        } else {
          console.warn("Backend merespon tapi gagal sync:", syncResult.message);
        }
      } catch (syncError) {
        console.error("Koneksi backend/Supabase bermasalah, skips sync sementara:", syncError);
      }

      // 3. Alihkan ke halaman kuisioner
      navigate("/predict");

    } catch (error) {
      console.error("Gagal login Google:", error);
      alert("Error Login: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-sidebar overflow-hidden">
      
      {/* --- SISI KIRI: BRANDING --- */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-primary border-r-4 border-foreground relative p-12">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-20 right-20 w-32 h-32 bg-secondary border-4 border-foreground rotate-12 shadow-[8px_8px_0px_black]" />
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-accent border-4 border-foreground -rotate-12 rounded-full shadow-[8px_8px_0px_black]" />

        <div className="relative z-10 text-center max-w-lg">
          <div className="inline-block bg-white border-3 border-foreground p-4 mb-8 rotate-[-2deg] shadow-[6px_6px_0px_black]">
             <Sparkles className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-6xl font-black text-white uppercase leading-none tracking-tighter mb-6 drop-shadow-[4px_4px_0px_black]">
            Amankan <br /> Masa Depanmu.
          </h2>
          <p className="text-xl font-bold text-white/90 leading-relaxed bg-foreground/10 p-4 border-l-4 border-foreground text-left">
            Bergabunglah dengan ribuan pekerja profesional lainnya yang mulai beradaptasi dengan AI.
          </p>
        </div>
      </div>

      if (loading) return <Loader />;

      {/* --- SISI KANAN: FORM --- */}
      <div className="flex flex-col items-center justify-center p-6 md:p-12 relative">
        <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
        
        <div className="w-full max-w-md relative z-10">
          <div className="flex items-center gap-2 mb-8 lg:hidden justify-center">
            <div className="bg-primary p-2 border-2 border-foreground shadow-[2px_2px_0px_black]">
              <ShieldCheck className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-black text-xl uppercase tracking-tighter">WorkSafe AI</span>
          </div>

          <Card className="border-3 border-foreground shadow-[8px_8px_0px_black] bg-white">
            <CardHeader className="space-y-2 pb-6 text-left">
              <CardTitle className="text-3xl font-black uppercase tracking-tight">Masuk</CardTitle>
              <CardDescription className="text-muted-foreground font-medium text-base">
                Mimpi yang besar dimulai dari langkah pertama. 
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full h-12 border-2 border-foreground font-bold shadow-[3px_3px_0px_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none bg-white text-foreground" 
                onClick={handleGoogleLogin} 
                disabled={loading}
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Google_Favicon_2025.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original" alt="Google" className='w-5 h-5 mr-2' />
                {loading ? 'Menghubungkan...' : 'Masuk dengan Google'}
              </Button>
              
              <Button 
                onClick={() => navigate("/")} 
                className="w-full h-12 bg-accent text-foreground border-2 border-foreground font-bold shadow-[3px_3px_0px_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none flex items-center justify-center gap-2"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                Kembali ke Beranda
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;