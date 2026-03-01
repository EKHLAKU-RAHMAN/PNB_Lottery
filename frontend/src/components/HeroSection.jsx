import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Trophy } from 'lucide-react'
import heroBg from '@/assets/images/Screenshot 2026-03-01 065304.png'

const HeroSection = () => {
  const scrollToCheckTicket = () => {
    document.getElementById('check-ticket')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative w-full min-h-[90vh] bg-cover bg-center bg-no-repeat flex items-center justify-center overflow-hidden"
           style={{
             backgroundImage: `url(${heroBg})`
           }}>
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/90 to-navy/95"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Trophy Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-8"
          >
            <div className="p-4 gold-gradient rounded-full animate-pulse-gold shadow-2xl">
              <Trophy className="h-16 w-16 text-white" />
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 text-shadow"
          >
            Win ₹30,00,000 Today!
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg sm:text-xl lg:text-2xl text-gold-light mb-12 max-w-3xl mx-auto"
          >
            Check your lottery result instantly and see if you are today's lucky winner.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToCheckTicket}
            className="gold-gradient text-white px-8 sm:px-12 py-4 sm:py-6 rounded-full text-lg sm:text-xl font-bold hover:gold-gradient-hover transition-all duration-300 shadow-2xl animate-float"
          >
            CHECK RESULT
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gold cursor-pointer"
            onClick={scrollToCheckTicket}
          >
            <ArrowDown className="h-8 w-8" />
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ 
          x: [0, 100, 0],
          y: [0, -50, 0],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-20 left-10 w-20 h-20 gold-gradient rounded-full opacity-20 blur-xl"
      />
      <motion.div
        animate={{ 
          x: [0, -100, 0],
          y: [0, 50, 0],
          rotate: [0, -180, -360]
        }}
        transition={{ duration: 25, repeat: Infinity }}
        className="absolute bottom-20 right-10 w-32 h-32 gold-gradient rounded-full opacity-20 blur-xl"
      />
    </section>
  )
}

export default HeroSection
