import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, Briefcase, Rocket } from 'lucide-react'

const SignUp = () => {
  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    occupation: '',
    password: '',
    confirmPassword: '',
    terms: false,
  })
  const [showPassword, setShowPassword] = React.useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Registering user:", formData)
  }

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-sidebar overflow-hidden">
      
      {/* --- SISI KIRI: BRANDING/ILUSTRASI (HIDDEN DI MOBILE) --- */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-accent border-r-4 border-foreground relative p-12 order-last lg:order-first">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        
        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary border-4 border-foreground -rotate-6 shadow-[6px_6px_0px_black]" />
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-white border-4 border-foreground rotate-12 shadow-[8px_8px_0px_black] rounded-full" />

        <div className="relative z-10 text-center max-w-lg">
          <div className="inline-block bg-foreground text-white border-3 border-foreground p-4 mb-8 rotate-[3deg] shadow-[6px_6px_0px_white]">
             <Rocket className="h-12 w-12" />
          </div>
          <h2 className="text-6xl font-black text-foreground uppercase leading-none tracking-tighter mb-6 drop-shadow-[4px_4px_0px_white]">
            Mulai <br /> Langkahmu.
          </h2>
          <p className="text-xl font-bold text-foreground leading-relaxed bg-white/50 p-4 border-2 border-foreground shadow-[4px_4px_0px_black]">
            Jangan cuma jadi penonton di era AI. <br />
            Dapatkan roadmap belajar yang personal sesuai dengan pekerjaanmu saat ini.
          </p>
        </div>
      </div>

      {/* --- SISI KANAN: FORM SIGN UP --- */}
      <div className="flex flex-col items-center justify-center p-6 md:p-10 relative">
        <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
        
        <div className="w-full max-w-md relative z-10">
          <Card className="border-3 border-foreground shadow-[8px_8px_0px_black] bg-white">
            <CardHeader className="space-y-1 pb-6 text-center lg:text-left">
              <CardTitle className="text-3xl font-black uppercase tracking-tight">Buat Akun</CardTitle>
              <CardDescription className="text-muted-foreground font-medium">
                Gratis, cepat, dan menyelamatkan karirmu.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Nama Lengkap */}
                <div className="space-y-1.5">
                  <Label htmlFor="fullName" className="font-black uppercase text-xs tracking-widest">Nama Lengkap</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      placeholder="Budi Santoso"
                      className="pl-10 border-2 border-foreground shadow-[2px_2px_0px_black]"
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="font-black uppercase text-xs tracking-widest">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="nama@email.com"
                      className="pl-10 border-2 border-foreground shadow-[2px_2px_0px_black]"
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Pekerjaan */}
                <div className="space-y-1.5">
                  <Label htmlFor="occupation" className="font-black uppercase text-xs tracking-widest">Pekerjaan Saat Ini</Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="occupation"
                      placeholder="Contoh: Admin Gudang"
                      className="pl-10 border-2 border-foreground shadow-[2px_2px_0px_black]"
                      onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="password" className="font-black uppercase text-xs tracking-widest">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        className="border-2 border-foreground shadow-[2px_2px_0px_black]"
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="confirm" className="font-black uppercase text-xs tracking-widest">Konfirmasi</Label>
                    <Input
                      id="confirm"
                      type={showPassword ? 'text' : 'password'}
                      className="border-2 border-foreground shadow-[2px_2px_0px_black]"
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-start space-x-2 pt-2">
                  <Checkbox
                    id="terms"
                    className="mt-1 border-2 border-foreground data-[state=checked]:bg-primary"
                    onCheckedChange={(checked) => setFormData({ ...formData, terms: checked })}
                  />
                  <Label htmlFor="terms" className="text-xs font-bold leading-tight cursor-pointer">
                    Saya setuju dengan <a href="#" className="underline text-primary">Syarat & Ketentuan</a> serta kebijakan privasi WorkSafe AI.
                  </Label>
                </div>

                <Button type="submit" className="w-full bg-primary text-primary-foreground border-3 border-foreground shadow-[4px_4px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all font-black uppercase py-6 mt-2" size="lg">
                  Daftar Sekarang
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <p className="mt-4 text-center text-sm font-bold">
                  Sudah punya akun? <a href="/login" className="text-primary underline font-black">Masuk</a>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default SignUp