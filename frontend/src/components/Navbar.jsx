import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Ticket } from 'lucide-react'

const Navbar = ({ scrolled }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Winners', href: '#winners' },
    { name: 'Prize Structure', href: '#prize' },
    { name: 'Check Ticket', href: '#check-ticket' },
    { name: 'Contact', href: '#contact' }
  ]

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-navy shadow-lg py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <Ticket className="h-8 w-8 text-gold" />
            <span className={`text-2xl font-bold ${
              scrolled ? 'text-white' : 'text-navy'
            }`}>
              Punjab Lottery Result
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`font-medium transition-colors hover:text-gold ${
                  scrolled ? 'text-white' : 'text-navy'
                }`}
              >
                {item.name}
              </button>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('#check-ticket')}
              className="gold-gradient text-white px-6 py-2 rounded-full font-semibold hover:gold-gradient-hover transition-all duration-300"
            >
              BOOK TICKET
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={`h-6 w-6 ${scrolled ? 'text-white' : 'text-navy'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${scrolled ? 'text-white' : 'text-navy'}`} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 bg-white rounded-lg shadow-xl p-4"
          >
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left py-2 text-navy hover:text-gold font-medium"
              >
                {item.name}
              </button>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('#check-ticket')}
              className="w-full mt-4 gold-gradient text-white px-6 py-2 rounded-full font-semibold hover:gold-gradient-hover transition-all duration-300"
            >
              BOOK TICKET
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

export default Navbar
