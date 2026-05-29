import React, { useState, useEffect } from 'react';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { auth, provider } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react'
import { useNavigate } from 'react-router'
import Loader from '@/components/Loader';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const BACKEND_URL = "https://worksafe-ai-fullstack.onrender.com";

  // Fungsi sinkronisasi ke backend Render
  const syncUserToBackend = async (token) => {
    try {
      console.log("🔗 Mencoba sinkronisasi user ke backend Render...");
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); 

      const syncResponse = await fetch(`${BACKEND_URL}/api/user/sync`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      const syncResult = await syncResponse.json();
      if (syncResponse.ok && syncResult.status === 'success') {
        console.log("✅ User berhasil disinkronisasi ke Supabase");
      }
    } catch (syncError) {
      console.error("❌ Gagal sync:", syncError.message);
    }
  };

  // Radar otomatis untuk mendeteksi status login aktif
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoading(true);
        try {
          const token = await user.getIdToken();
          await syncUserToBackend(token);
          console.log("🚀 Mengalihkan ke halaman prediksi...");
          navigate("/predict");
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // LOGIKA UTAMA TOMBOL LOGIN (LOLOS BLOKIRAN HP)
  const handleGoogleLogin = async () => {
    try {
      // 🚨 CRITICAL: Jangan set loading dulu di sini! 
      // signInWithPopup HARUS berada di baris paling pertama agar browser HP tahu ini murni klik dari user.
      const res = await signInWithPopup(auth, provider);
      
      // Baru setelah pop-up Google terbuka/sukses, kita nyalakan layar loading
      setLoading(true);
      const token = await res.user.getIdToken();
      console.log("🔥 Token Firebase sukses didapat:", token);
        
      await syncUserToBackend(token);
      navigate("/predict");

    } catch (error) {
      console.error("❌ Gagal login Google:", error);
      // Jika user sengaja menutup pop-up, jangan tampilkan alert error mengganggu
      if (error.code !== 'auth/popup-closed-by-user') {
        alert("Error Login: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader text="Menyiapkan Sesi Anda..." />;
  }

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
                Masuk dengan Google
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