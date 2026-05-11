import React, { useState, useEffect } from 'react' // <--- Tambah useEffect di sini
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Sparkles, Briefcase, FileText, Building, ArrowRight, Loader2 } from 'lucide-react'
import Nav from '../components/Nav'
import { useNavigate } from 'react-router'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase' // <--- Pastikan import auth ini ADA

const Predict = () => {
  const navigate = useNavigate()

  // 1. TAMBAHIN STATE INI (Tadi ini gak ada di kode lu)
  const [loadingAuth, setLoadingAuth] = useState(true)
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobDescription: '',
    industry: '',
  })
  const [loading, setLoading] = useState(false)

  // 2. CEK STATUS LOGIN
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Kalau gak ada user, tendang ke login
        navigate("/login");
      } else {
        // Kalau ada, baru buka akses halamannya
        setLoadingAuth(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    setTimeout(() => {
      console.log("Data siap dianalisis:", formData)
      setLoading(false)
      alert("Simulasi sukses!");
    }, 2000)
  }

  // 3. LOADING SCREEN (Biar user gak liat form sedetik pas refresh)
  if (loadingAuth) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-sidebar gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="font-black uppercase tracking-widest text-sm">Mengecek Akses...</p>
      </div>
    );
  }

  return (
    <>
      <Nav/>
      <div className="min-h-screen w-full bg-sidebar flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
        
        {/* Konten Form Lu */}
        <div className="w-full max-w-2xl relative z-10">
          <div className="text-center mb-8">
            <div className="inline-block bg-white border-3 border-foreground p-3 mb-4 rotate-[-2deg] shadow-[4px_4px_0px_black]">
               <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-foreground drop-shadow-[2px_2px_0px_white]">
              Analisis Peranmu
            </h1>
          </div>

          <Card className="border-3 border-foreground shadow-[10px_10px_0px_black] bg-white overflow-hidden">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="font-black uppercase text-xs">Posisi</Label>
                    <Input
                      placeholder="Cth: Admin"
                      className="border-2 border-foreground shadow-[3px_3px_0px_black]"
                      value={formData.jobTitle}
                      onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-black uppercase text-xs">Industri</Label>
                    <select
                      className="w-full h-10 border-2 border-foreground shadow-[3px_3px_0px_black] px-3 bg-white"
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    >
                      <option value="">Pilih...</option>
                      <option value="IT">Teknologi</option>
                      <option value="Finance">Keuangan</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="font-black uppercase text-xs">Deskripsi Tugas</Label>
                  <textarea
                    placeholder="Apa yang kamu kerjakan?"
                    className="w-full min-h-[150px] border-2 border-foreground shadow-[4px_4px_0px_black] p-3"
                    value={formData.jobDescription}
                    onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
                    required
                  />
                </div>

                <Button type="submit" disabled={loading} className="w-full bg-primary border-3 border-foreground shadow-[6px_6px_0px_black] font-black h-16">
                  {loading ? <Loader2 className="animate-spin" /> : "MULAI PREDIKSI"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

export default Predict