import React from 'react'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import Nav from '../components/Nav'
import Hero from '../components/hero'
import ProblemSection from '../components/ProblemSection'
import CTA from '../components/CTA'
import Footer from '../components/footer'

const LandingPage = () => {
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