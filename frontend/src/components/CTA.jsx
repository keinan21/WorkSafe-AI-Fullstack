import React from 'react'
import { Button } from '@/components/ui/button'
import {Link} from 'react-router'
const CTA = () => {
  return (
    <section className="py-20 bg-primary/10 flex items-center justify-center border-b-3 border-foreground px-5 relative overflow-hidden">
      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-6">
            Siap Menghadapi Masa Depan?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
            Bergabunglah dengan ribuan pekerja lainnya yang sudah memulai perjalanan adaptasi digital bersama WorkSafe AI.
          </p>
          <Button className="border-r-1">
            <Link to="/predict">Mulai Sekarang</Link>
          </Button>
          <Button variant="outline" className="border-l-1">
            <Link to="/analytics">Transparansi Data</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default CTA