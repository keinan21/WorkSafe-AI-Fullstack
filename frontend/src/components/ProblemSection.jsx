import React from 'react'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AlertTriangle, Briefcase, Zap } from 'lucide-react'

const ProblemSection = () => {
  return (
    <section className="py-20 bg-sidebar flex items-center justify-center border-b-3 border-foreground px-5 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="max-w-3xl mb-12">
          <Badge 
            className="mb-6 bg-white text-black border-2 border-foreground shadow-[2px_2px_0px_hsl(var(--foreground))] font-bold"
          >
            FAKTA HARI INI
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-6">
            AI Makin Pintar, Nasib Pekerjaan Kita Gimana?
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Mulai dari urusan admin, jaga kasir, sampai pabrik, pelan-pelan mulai digantikan teknologi. Sayangnya, banyak dari kita yang belum sadar dan bingung harus siap-siap mulai dari mana. WorkSafe AI hadir buat bantu kamu menjawab kebingungan itu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <Card className="bg-primary/10 text-primary-foreground border-3 border-foreground shadow-[5px_5px_0px_hsl(var(--foreground))] transform transition-transform hover:-translate-y-1">
            <CardHeader>
              <div className={`w-14 h-14 flex items-center justify-center border-3 bg-primary mb-4 shadow-[3px_3px_0px_hsl(var(--shadow-color))]`}>
                <AlertTriangle className="h-8 w-8 mb-2" />
              </div>
              <CardTitle className="text-2xl font-black uppercase tracking-wide">
                23 Juta+ Terancam
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium text-primary-foreground/70 leading-relaxed">
                Menurut proyeksi terbaru, lebih dari 23 juta pekerja di Indonesia berisiko tergusur oleh otomatisasi pada tahun 2030. Ini bukan cuma fiksi ilmiah, ini realitas.
              </p>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className="bg-secondary/10 text-secondary-foreground border-3 border-foreground shadow-[5px_5px_0px_hsl(var(--foreground))] transform transition-transform hover:-translate-y-1">
            <CardHeader>
              <div className={`w-14 h-14 flex items-center justify-center border-3 bg-secondary mb-4 shadow-[3px_3px_0px_hsl(var(--shadow-color))]`}>
                <Briefcase className="h-8 w-8 mb-2" />
              </div>
              
              <CardTitle className="text-2xl font-black uppercase tracking-wide">
                Sektor Paling Rawan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium text-secondary-foreground/70 leading-relaxed">
                Pekerjaan berulang seperti administrasi kantoran, layanan kasir, dan operator manufaktur ada di garis depan. Kalau kamu di sektor ini, jangan lengah!
              </p>
            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card className="bg-accent/10 text-accent-foreground border-3 border-foreground shadow-[5px_5px_0px_hsl(var(--foreground))] transform transition-transform hover:-translate-y-1">
            <CardHeader>
              <div className={`w-14 h-14 flex items-center justify-center border-3 bg-accent mb-4 shadow-[3px_3px_0px_hsl(var(--shadow-color))]`}>
                <Zap className="h-8 w-8 mb-2" />
              </div>
              
              <CardTitle className="text-2xl font-black uppercase tracking-wide">
                Solusi: Upgrade Skill
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium text-accent-foreground/70 leading-relaxed">
                Mesin bisa menggantikan rutinitas, tapi bukan kreativitas. Satu-satunya jalan keluar adalah pelajari keahlian baru yang relevan, dan kami bantu petakan caranya.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default ProblemSection