import React from 'react'
import {Badge} from '@/components/ui/badge'
import {Button} from '@/components/ui/button'
import {Sparkles, ArrowRight, Star} from 'lucide-react'
import {BurstShape, Star5Shape, LightningShape, HeartShape} from '@/components/ui/shapes'
import {Input} from '@/components/ui/input'
import { Link } from 'react-router'


const Hero = () => {
  return (
    <section className="relative overflow-hidden border-b-3 border-foreground bg-accent/20">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        {/* Colorful background blocks */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-primary/30 border-r-3 border-b-3 border-foreground hidden lg:block" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-secondary/30 border-l-3 border-t-3 border-foreground hidden lg:block" />
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="accent" className="mb-6 shadow-[3px_3px_0px_hsl(var(--shadow-color))] font-bold">
              <Sparkles className="h-3 w-3 mr-1" />
              Pertama di Indonesia
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight mb-6">
              Apakah Kerjaanmu Bakal{' '}
              <span className="bg-primary text-primary-foreground px-3 py-1 border-3 border-foreground inline-block transform -rotate-2">
                Diganti AI?
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto font-medium">
              Lebih dari 23 juta pekerjaan terancam otomatisasi. Cek skor risiko profesimu sekarang dan temukan <strong>skill baru</strong> biar kamu tetap tak tergantikan!
            </p>
            
            <div className="flex w-full items-center justify-center gap-2 p-2">
                <Input type="text" placeholder="Apa Pekerjaanmu?" />
                <Button><Link to="/predict">Cek Risiko</Link></Button>
            </div>
          </div>

          {/* Decorative shapes - more vibrant */}
          <BurstShape size={100} className="absolute top-10 left-10 text-accent hidden lg:block animate-[brutal-wiggle_3s_ease-in-out_infinite]" />
          <Star5Shape size={80} className="absolute bottom-20 right-20 text-secondary hidden lg:block" />
          <LightningShape size={70} className="absolute top-1/2 right-10 text-warning hidden lg:block" />
          <HeartShape size={50} className="absolute bottom-10 left-1/4 text-primary hidden lg:block" />
        </div>
      </section>
  )
}

export default Hero