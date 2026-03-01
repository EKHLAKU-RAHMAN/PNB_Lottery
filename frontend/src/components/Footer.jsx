import React from 'react'
import { motion } from 'framer-motion'
import { Ticket, Mail, Phone, MapPin, Shield, FileText } from 'lucide-react'

const Footer = () => {
  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const footerLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Winners', href: '#winners' },
    { name: 'Prize Structure', href: '#prize' },
    { name: 'Check Ticket', href: '#check-ticket' },
    { name: 'Contact', href: '#contact' }
  ]

  const legalLinks = [
    { name: 'Privacy Policy', icon: Shield },
    { name: 'Terms & Conditions', icon: FileText }
  ]

  return (
    <footer className="bg-navy text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-2 mb-4">
                <Ticket className="h-8 w-8 text-gold" />
                <span className="text-xl font-bold">
                  Punjab Lottery Result
                </span>
              </div>
              <p className="text-gray-300 mb-4">
                Your trusted platform for checking lottery results instantly. 
                We provide real-time updates and secure ticket verification.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center hover:bg-gold/30 transition-colors cursor-pointer">
                  <Mail className="h-5 w-5 text-gold" />
                </div>
                <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center hover:bg-gold/30 transition-colors cursor-pointer">
                  <Phone className="h-5 w-5 text-gold" />
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-4 text-gold">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-300 hover:text-gold transition-colors text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-4 text-gold">
                Contact Info
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gold" />
                  <span className="text-gray-300">+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gold" />
                  <span className="text-gray-300">info@punjablottery.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gold" />
                  <span className="text-gray-300">Chandigarh, Punjab</span>
                </div>
              </div>
            </motion.div>

            {/* Legal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-4 text-gold">
                Legal
              </h3>
              <ul className="space-y-2">
                {legalLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <li key={link.name}>
                      <button className="flex items-center space-x-2 text-gray-300 hover:text-gold transition-colors">
                        <Icon className="h-4 w-4" />
                        <span>{link.name}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-400 text-sm">
                © 2024 Punjab Lottery Result. All rights reserved.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex items-center space-x-2 text-gray-400 text-sm"
            >
              <span>Powered by</span>
              <span className="text-gold font-semibold">
                Punjab Lottery Systems
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
