// src/pages/Login.jsx
import React, { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/lib/firebase';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router'

const Login = () => {
  const [result, setResult] = useState(null);

  const handleLoginAndTestAPI = async () => {
    try {
      // 1. Munculkan popup Login Google
      const result = await signInWithPopup(auth, provider);
      
      // 2. Dapatkan Karcis VIP (Token) dari Google
      const token = await result.user.getIdToken();
      console.log("Token berhasil didapat:", token);

      // 3. Siapkan data yang mau dikirim ke Backend
      const payload = {
        jobTitle: "Admin Data Entry",
        jobDescription: "Memasukkan data ke excel setiap hari",
        industry: "Perkantoran"
      };

      // 4. TEMBAK API BACKEND
      const response = await axios.post('http://localhost:5001/api/predict-risk', payload, {
        headers: {
          Authorization: `Bearer ${token}` // <--- Token Firebase dikirim ke sini
        }
      });

      console.log("Hasil dari Backend:", response.data);
      setResult(response.data);

    } catch (error) {
      console.error("Gagal login atau hit API:", error);
      alert("Error: " + error.message);
    }
  };
  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-sidebar overflow-hidden">
      
      <div className="hidden lg:flex flex-col items-center justify-center bg-primary border-r-4 border-foreground relative p-12">
        {/* Background Pattern */}
        <div className="absolute inset-0 grid-pattern opacity-20" />
        
        {/* Floating Shapes ala Neo-Brutalism */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-secondary border-4 border-foreground rotate-12 shadow-[8px_8px_0px_black]" />
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-accent border-4 border-foreground -rotate-12 rounded-full shadow-[8px_8px_0px_black]" />

        <div className="relative z-10 text-center max-w-lg">
          <div className="inline-block bg-white border-3 border-foreground p-4 mb-8 rotate-[-2deg] shadow-[6px_6px_0px_black]">
             <Sparkles className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-6xl font-black text-background uppercase leading-none tracking-tighter mb-6 drop-shadow-[4px_4px_0px_black]">
            Amankan <br /> Masa Depanmu.
          </h2>
          <p className="text-xl font-bold text-primary-foreground/90 leading-relaxed bg-foreground/10 p-4 border-l-4 border-foreground">
            Bergabunglah dengan ribuan pekerja profesional lainnya yang sudah mulai beradaptasi dengan teknologi AI. 
            Jangan biarkan karirmu tertinggal.
          </p>
        </div>
      </div>

            <div className="flex flex-col items-center justify-center p-6 md:p-12 relative">
        {/* Dekorasi Background Halus */}
        <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
        
        <div className="w-full max-w-md relative z-10">
          {/* Logo / Brand Singkat */}
          <div className="flex items-center gap-2 mb-8 lg:hidden justify-center">
            <div className="bg-primary p-2 border-2 border-foreground shadow-[2px_2px_0px_black]">
              <ShieldCheck className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-black text-xl uppercase tracking-tighter">WorkSafe AI</span>
          </div>

          <Card className="border-3 border-foreground shadow-[8px_8px_0px_black] bg-white">
            <CardHeader className="space-y-2 pb-6">
              <CardTitle className="text-3xl font-black uppercase tracking-tight">Selamat Datang</CardTitle>
              <CardDescription className="text-muted-foreground font-medium text-base">
                Masuk untuk cek keamanan karirmu hari ini.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Input Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-black uppercase text-xs tracking-widest">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="nama@email.com"
                      className="pl-10 border-2 border-foreground shadow-[2px_2px_0px_black] focus-visible:ring-0 focus-visible:translate-x-[1px] focus-visible:translate-y-[1px] focus-visible:shadow-none transition-all"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Input Password */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password" className="font-black uppercase text-xs tracking-widest">Password</Label>
                    <a href="#" className="text-xs font-bold underline hover:text-primary">Lupa Password?</a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="pl-10 pr-10 border-2 border-foreground shadow-[2px_2px_0px_black] focus-visible:ring-0 focus-visible:translate-x-[1px] focus-visible:translate-y-[1px] focus-visible:shadow-none transition-all"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    className="border-2 border-foreground data-[state=checked]:bg-primary"
                    checked={formData.remember}
                    onCheckedChange={(checked) => setFormData({ ...formData, remember: checked })}
                  />
                  <Label htmlFor="remember" className="text-sm font-bold cursor-pointer">
                    Ingat saya di perangkat ini
                  </Label>
                </div>

                <Button type="submit" className="w-full bg-primary text-primary-foreground border-3 border-foreground shadow-[4px_4px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all font-black uppercase py-6 text-lg" size="lg">
                  Masuk Sekarang
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                {/* Social Login */}
                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-2 border-muted" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-3 font-black text-muted-foreground">Atau Masuk Dengan</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" type="button" className="border-2 border-foreground shadow-[3px_3px_0px_black] font-bold hover:bg-accent">
                    Google
                  </Button>
                  <Button variant="outline" type="button" className="border-2 border-foreground shadow-[3px_3px_0px_black] font-bold hover:bg-accent">
                    GitHub
                  </Button>
                </div>
              </form>

              <p className="mt-8 text-center text-sm font-bold">
                Belum punya akun? <a href="/signup" className="text-primary underline">Daftar Gratis</a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

    </div>
  )
}

export default Login