import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Users, Star } from 'lucide-react'
import axios from 'axios'
import { useSocket } from '../context/SocketContext'

const WinnersSection = () => {
  const [winners, setWinners] = useState([])
  const [loading, setLoading] = useState(true)
  const { socket } = useSocket()

  const fetchWinners = async () => {
    try {
      const response = await axios.get('/api/tickets/winners')
      setWinners(response.data.winners)
    } catch (error) {
      console.error('Failed to fetch winners:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWinners()
  }, [])

  useEffect(() => {
    if (socket) {
      socket.on('ticketUpdated', (ticket) => {
        if (ticket.isWinner) {
          fetchWinners()
        }
      })

      socket.on('ticketCreated', (ticket) => {
        if (ticket.isWinner) {
          fetchWinners()
        }
      })

      return () => {
        socket.off('ticketUpdated')
        socket.off('ticketCreated')
      }
    }
  }, [socket])

  const defaultWinners = [
    {
      _id: '1',
      customerName: 'Rajesh Kumar',
      ticketNumber: 'PNB-ABC123',
      prizeAmount: 5000000,
      resultDate: new Date()
    },
    {
      _id: '2', 
      customerName: 'Priya Sharma',
      ticketNumber: 'PNB-XYZ789',
      prizeAmount: 2500000,
      resultDate: new Date()
    },
    {
      _id: '3',
      customerName: 'Amit Singh',
      ticketNumber: 'PNB-DEF456',
      prizeAmount: 1200000,
      resultDate: new Date()
    },
    {
      _id: '4',
      customerName: 'Sunita Devi',
      ticketNumber: 'PNB-GHI789',
      prizeAmount: 800000,
      resultDate: new Date()
    }
  ]

  const displayWinners = winners.length > 0 ? winners : defaultWinners

  return (
    <section id="winners" className="py-20 bg-white">
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
              <Trophy className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-navy mb-4">
            Recent Winners
          </h2>
          <p className="text-xl text-gray-600">
            Meet the lucky winners who changed their lives
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayWinners.map((winner, index) => (
              <motion.div
                key={winner._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg card-shadow p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Winner Avatar */}
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center mb-4">
                    <Users className="h-10 w-10 text-white" />
                  </div>

                  {/* Winner Badge */}
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-3">
                    <Star className="h-4 w-4 mr-1" />
                    Winner
                  </div>

                  {/* Name */}
                  <h3 className="text-lg font-semibold text-navy mb-1">
                    {winner.customerName}
                  </h3>

                  {/* Ticket Number */}
                  <p className="text-sm text-gray-500 mb-2">
                    {winner.ticketNumber}
                  </p>

                  {/* Prize Amount */}
                  <div className="text-2xl font-bold text-gold mb-2">
                    ₹{winner.prizeAmount.toLocaleString()}
                  </div>

                  {/* Date */}
                  <p className="text-xs text-gray-400">
                    {new Date(winner.resultDate).toLocaleDateString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {winners.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">
              No winners yet. Check back soon!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default WinnersSection
