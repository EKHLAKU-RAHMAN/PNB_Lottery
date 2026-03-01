import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Ticket, Phone, CheckCircle, XCircle, Clock } from 'lucide-react'
import { apiClient } from '../utils/api'

const CheckTicketSection = () => {
  const [ticketNumber, setTicketNumber] = useState('')
  // const [phoneNumber, setPhoneNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleCheck = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await apiClient.get('/api/tickets/check', {
        params: { ticketNumber }
      })

      setResult(response.data)
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to check ticket')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="check-ticket" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-navy mb-4">
            Check Your Ticket Result
          </h2>
          <p className="text-xl text-gray-600">
            Enter your ticket details to instantly check if you're a winner
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-8 card-shadow">
            <form onSubmit={handleCheck} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Ticket className="inline h-4 w-4 mr-2" />
                  Ticket Number
                </label>
                <input
                  type="text"
                  value={ticketNumber}
                  onChange={(e) => setTicketNumber(e.target.value.toUpperCase())}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent text-lg"
                  placeholder="Enter your ticket number"
                  required
                />
              </div>

              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="inline h-4 w-4 mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent text-lg"
                  placeholder="Enter your phone number"
                  required
                />
              </div> */}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full gold-gradient text-white font-bold py-4 rounded-lg hover:gold-gradient-hover transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                <Search className="h-5 w-5" />
                <span>{loading ? 'Checking...' : 'CHECK NOW'}</span>
              </motion.button>
            </form>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
              >
                {error}
              </motion.div>
            )}

            {/* Result Display */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8"
              >
                {result.ticket.status === 'won' ? (
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4"
                    >
                      <CheckCircle className="h-8 w-8 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-green-800 mb-2">
                      Congratulations! You Won ₹{result.ticket.prizeAmount.toLocaleString()}
                    </h3>
                    <div className="space-y-2">
                      <p className="text-green-600 font-medium">
                        Winner: {result.ticket.customerName}
                      </p>
                      {result.ticket.phoneNumber && (
                        <p className="text-green-600">
                          Phone: {result.ticket.phoneNumber}
                        </p>
                      )}
                      <p className="text-green-600">
                        Ticket: {result.ticket.ticketNumber}
                      </p>
                    </div>
                  </div>
                ) : result.ticket.status === 'active' ? (
                  <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500 rounded-full mb-4"
                    >
                      <Clock className="h-8 w-8 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-yellow-800 mb-2">
                      Result Pending
                    </h3>
                    <p className="text-yellow-600">
                      Ticket: {result.ticket.ticketNumber}
                    </p>
                  </div>
                ) : (
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="inline-flex items-center justify-center w-16 h-16 bg-red-500 rounded-full mb-4"
                    >
                      <XCircle className="h-8 w-8 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-red-800 mb-2">
                      Sorry, Better Luck Next Time
                    </h3>
                    <p className="text-red-600">
                      Ticket: {result.ticket.ticketNumber}
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CheckTicketSection
