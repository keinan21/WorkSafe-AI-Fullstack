import React from 'react'
import { useEffect } from 'react'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import Nav from '../components/Nav'
import Hero from '../components/hero'
import ProblemSection from '../components/ProblemSection'
import CTA from '../components/CTA'
import Footer from '../components/footer'
import { Helmet } from 'react-helmet-async'

const LandingPage = () => {

  const BACKEND_URL = "https://worksafe-ai-fullstack.onrender.com";

  useEffect(() => {
    const banguninRender = async () => {
      try {
        console.log("⏰ Mengetuk pintu server Render di latar belakang...");
        
        // Kita ping ke rute paling ringan (/) atau sesuai isi Health Check Path kemarin
        await fetch(`${BACKEND_URL}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // Pasang mode no-cors jika rute '/' tidak mengembalikan header CORS, 
          // yang penting request-nya sampai dan ngebangunin server.
          mode: "cors" 
        });

        console.log("☀️ Server Render berhasil dibangunkan sejak dini!");
      } catch (error) {
        // Gak perlu tampilin error ke user karena ini cuma background service warmer
        console.log("Render masih ngulet atau ada error, tapi aman dibiarkan:", error);
      }
    };

    banguninRender();
  }, []);

  return (
    <>
    <Helmet>
        {/* Judul yang muncul di tab browser & Google */}
        <title>WorkSafe-AI | Analisis Risiko Keselamatan Kerja Berbasis AI (K3)</title>
        
        {/* Deskripsi singkat di bawah link Google */}
        <meta name="description" content="Tingkatkan standar K3 Anda dengan WorkSafe-AI. Prediksi risiko kecelakaan kerja secara instan berbasis AI untuk sektor Konstruksi, Manufaktur, dan Pertambangan." />
        
        {/* Meta Tag Open Graph (Biar kalau link disebar ke WA/LinkedIn muncul gambar & teks rapi) */}
        <meta property="og:title" content="WorkSafe-AI - Solusi K3 Pintar Berbasis AI" />
        <meta property="og:description" content="Prediksi risiko keselamatan kerja instan untuk masa depan yang lebih aman." />
        <meta property="og:image" content="https://worksafe-ai-frontend.vercel.app/hero.png" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
      </Helmet>
    <div className="min-h-screen bg-background">
        <Nav />
        <Hero />
        <ProblemSection />
        <CTA />
        <Footer />
    </div>
    </>
  )
}

export default LandingPage