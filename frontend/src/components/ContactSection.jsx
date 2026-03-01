import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MessageSquare, Send, MapPin } from 'lucide-react'
import axios from 'axios'

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await axios.post('/api/contact', formData)
      setSuccess(response.data.message)
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 98765 43210',
      color: 'text-blue-600'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'info@punjablottery.com',
      color: 'text-green-600'
    },
    {
      icon: MapPin,
      label: 'Address',
      value: 'Chandigarh, Punjab, India',
      color: 'text-red-600'
    }
  ]

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <div className="p-3 gold-gradient rounded-full">
              <MessageSquare className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-navy mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600">
            Have questions? We're here to help you
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 card-shadow">
              <h3 className="text-2xl font-bold text-navy mb-6">
                Send us a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent resize-none"
                    placeholder="Your message..."
                    required
                  />
                </div>

                {success && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                    {success}
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full gold-gradient text-white font-bold py-3 rounded-lg hover:gold-gradient-hover transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>{loading ? 'Sending...' : 'Send Message'}</span>
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-navy rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-4"
                    >
                      <div className={`p-3 rounded-full bg-white/10 ${info.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-300">{info.label}</p>
                        <p className="text-lg font-semibold">{info.value}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-navy mb-4">
                Business Hours
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
