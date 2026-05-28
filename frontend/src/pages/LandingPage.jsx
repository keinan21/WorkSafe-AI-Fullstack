import React from 'react'
import { useEffect } from 'react'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import Nav from '../components/Nav'
import Hero from '../components/hero'
import ProblemSection from '../components/ProblemSection'
import CTA from '../components/CTA'
import Footer from '../components/footer'

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
    <div className="min-h-screen bg-background">
        <Nav />
        <Hero />
        <ProblemSection />
        <CTA />
        <Footer />
    </div>
  )
}

export default LandingPage