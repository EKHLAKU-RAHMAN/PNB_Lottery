import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import CheckTicketSection from '../components/CheckTicketSection'
import WinnersSection from '../components/WinnersSection'
import PrizeStructureSection from '../components/PrizeStructureSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={scrolled} />
      <HeroSection />
      <CheckTicketSection />
      <WinnersSection />
      <PrizeStructureSection />
      <ContactSection />
      <Footer />
    </div>
  )
}

export default LandingPage
