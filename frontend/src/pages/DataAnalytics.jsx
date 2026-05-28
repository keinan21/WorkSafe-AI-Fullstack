import React from 'react';
// Import Komponen Primitif shadcn/ui
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ShieldAlert, Layers, BarChart3, Download, ExternalLink } from 'lucide-react';
import Nav from '@/components/Nav';

export default function AnalyticsPage() {
  return (
    <>
    <Nav/>
    <div className='bg-background text-foreground grid-pattern'>
    <div className="min-h-screen max-w-7xl mx-auto text-foreground p-6 md:p-12 font-sans">
      
      {/* HEADER SECTION - SEMANTIK & ACCESSIBLE */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 border-b-4 border-foreground pb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-bold font-mono text-muted-foreground uppercase tracking-widest">[ Engine: Python 3.14 ]</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            Data Transparency & Analytics
          </h1>
          <p className="font-bold text-muted-foreground max-w-2xl text-base mt-2">
            Sistem monitoring risiko lowongan kerja dan anomali pasar. Data diperbarui secara real-time dari pipeline anak Data Science.
          </p>
        </div>

      </div>
      {/* MAIN CONTAINER FOR STREAMLIT IFRAME */}
      <main className="border-4 border-foreground bg-card text-card-foreground bk-shadow-lg relative mb-12">
        {/* Top Bar ala Window OS Jadul (A11y: Di-hide dari Screen Reader karena dekoratif) */}
        <div className="bg-foreground text-background font-black px-4 py-3 flex justify-between items-center border-b-4 border-foreground" aria-hidden="true">
          <div className="flex items-center gap-2">
            <span className="uppercase tracking-wider text-xs font-mono">⚡ APP.PY VISUALIZATION FRAME</span>
          </div>
          <div className="flex gap-2">
            <div className="w-3 h-3 border-2 border-background bg-primary" />
            <div className="w-3 h-3 border-2 border-background bg-accent" />
            <div className="w-3 h-3 border-2 border-background bg-secondary" />
          </div>
        </div>

        {/* Wrapper Iframe */}
        <div className="p-4 bg-muted/30">
          <iframe
            src="https://worksafe-ai-fullstack-gvvppsnumypvqsywtotdht.streamlit.app/?embed=true&embed_options=show_toolbar,light_theme,show_colored_line,show_padding,disable_scrolling"
            title="Streamlit Security Analytics Dashboard"
            className="w-full h-[680px] border-3 border-foreground bg-background"
            allowFullScreen
          />
        </div>
      </main>
    </div>
    </div>
    </>
  );
}