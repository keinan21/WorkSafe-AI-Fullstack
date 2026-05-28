import React from 'react'
import { MathCurveLoader } from '@/components/ui/mathcurveloader'

const Loader = () => {
  return (
    // min-w-screen diganti jadi w-screen
    <div className='min-h-screen w-screen flex items-center justify-center bg-primary grid-pattern'>
        <div className='flex flex-col items-center gap-6 border-4 border-foreground bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 rounded-lg max-w-sm text-center mx-4'>
            
            <MathCurveLoader 
              curve="lissajous" 
              size="xl" 
              className='-rotate-90'
            />
            
            {/* Teks di-style neubrutalism dan dikasih efek pulse */}
            <p className='text-lg sm:text-xl font-black uppercase font-mono tracking-tight animate-pulse'>
              Menganalisis Data...
            </p>
            
        </div>
    </div>
  )
}

export default Loader