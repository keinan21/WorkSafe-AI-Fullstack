import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Sparkles, Briefcase, FileText, Building, ArrowRight, Loader2 } from 'lucide-react'
import Nav from '../components/Nav'
const Predict = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobDescription: '',
    industry: '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulasi jeda waktu mikir AI (ganti dengan axios.post ke backend lu nanti)
    setTimeout(() => {
      console.log("Data siap dianalisis:", formData)
      setLoading(false)
      alert("Simulasi sukses! (Cek console). Nanti di sini arahin ke halaman Result.")
    }, 2000)
  }

  return (
    <>
    <Nav/>
    <div className="min-h-screen w-full bg-sidebar flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
      
      {/* Floating Elements (Opsional, buat pemanis aja) */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary border-4 border-foreground rotate-12 shadow-[8px_8px_0px_black] opacity-50 hidden md:block" />
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-accent border-4 border-foreground rounded-full -rotate-12 shadow-[8px_8px_0px_black] opacity-50 hidden md:block" />

      {/* Main Container - Lebar dibuat lebih max buat area "Prompt" */}
      <div className="w-full max-w-2xl relative z-10">
        
        <div className="text-center mb-8">
          <div className="inline-block bg-white border-3 border-foreground p-3 mb-4 rotate-[-2deg] shadow-[4px_4px_0px_black]">
             <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-foreground drop-shadow-[2px_2px_0px_white]">
            Analisis Peranmu
          </h1>
          <p className="text-lg font-bold text-muted-foreground mt-2 max-w-md mx-auto">
            Ceritakan apa yang kamu kerjakan, dan biarkan AI kami menghitung risiko otomasinya.
          </p>
        </div>

        <Card className="border-3 border-foreground shadow-[10px_10px_0px_black] bg-white overflow-hidden">
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. Job Title */}
                <div className="space-y-2">
                  <Label htmlFor="jobTitle" className="font-black uppercase text-xs tracking-widest text-foreground">
                    Posisi / Jabatan
                  </Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="jobTitle"
                      placeholder="Cth: Admin Gudang"
                      className="pl-11 h-12 text-base border-2 border-foreground shadow-[3px_3px_0px_black] focus-visible:ring-0 focus-visible:translate-x-[2px] focus-visible:translate-y-[2px] focus-visible:shadow-none transition-all font-medium"
                      value={formData.jobTitle}
                      onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* 2. Industry (Optional) */}
                <div className="space-y-2">
                  <Label htmlFor="industry" className="font-black uppercase text-xs tracking-widest text-foreground">
                    Industri <span className="text-muted-foreground font-normal">(Opsional)</span>
                  </Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <select
                      id="industry"
                      className="w-full pl-11 pr-4 h-12 text-base bg-white border-2 border-foreground shadow-[3px_3px_0px_black] focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none transition-all font-medium appearance-none cursor-pointer"
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    >
                      <option value="" disabled>Pilih Sektor Industri</option>
                      <option value="Teknologi">Teknologi & IT</option>
                      <option value="Keuangan">Keuangan & Perbankan</option>
                      <option value="Kesehatan">Kesehatan</option>
                      <option value="Manufaktur">Manufaktur & Logistik</option>
                      <option value="Pendidikan">Pendidikan</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 3. Job Description (The "Prompt" Area) */}
              <div className="space-y-2">
                <Label htmlFor="jobDescription" className="font-black uppercase text-xs tracking-widest text-foreground">
                  Deskripsi Tugas Sehari-hari
                </Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-4 h-5 w-5 text-muted-foreground" />
                  <textarea
                    id="jobDescription"
                    placeholder="Ceritakan rutinitasmu... (Contoh: Saya merekap data penjualan dari WhatsApp ke Excel, lalu membuat laporan mingguan untuk manajer...)"
                    className="w-full pl-11 pr-4 py-3 min-h-[160px] text-base bg-white border-2 border-foreground shadow-[4px_4px_0px_black] focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none transition-all font-medium resize-y"
                    value={formData.jobDescription}
                    onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
                    required
                  />
                </div>
                <p className="text-xs font-bold text-muted-foreground text-right mt-1">
                  *Semakin detail, hasil prediksi AI semakin akurat.
                </p>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-primary text-primary-foreground border-3 border-foreground shadow-[6px_6px_0px_black] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all font-black uppercase py-8 text-xl group relative overflow-hidden" 
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    Menganalisis...
                  </>
                ) : (
                  <>
                    Mulai Prediksi AI
                    <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
                {/* Efek kilap pas dihover ala gemini tapi brutal */}
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
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