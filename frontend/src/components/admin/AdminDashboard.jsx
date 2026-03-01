import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Ticket as TicketIcon, Trophy, TrendingUp, Calendar } from 'lucide-react'
import axios from 'axios'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalTickets: 0,
    totalWinners: 0,
    totalPrizeMoney: 0,
    todayTickets: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/tickets')
      const tickets = response.data.tickets
      
      const totalTickets = tickets.length
      const totalWinners = tickets.filter(t => t.isWinner).length
      const totalPrizeMoney = tickets.filter(t => t.isWinner).reduce((sum, t) => sum + t.prizeAmount, 0)
      const todayTickets = tickets.filter(t => {
        const today = new Date()
        const ticketDate = new Date(t.createdAt)
        return ticketDate.toDateString() === today.toDateString()
      }).length

      setStats({
        totalTickets,
        totalWinners,
        totalPrizeMoney,
        todayTickets
      })
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Tickets',
      value: stats.totalTickets,
      icon: TicketIcon,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Winners',
      value: stats.totalWinners,
      icon: Trophy,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Total Prize Money',
      value: `₹${stats.totalPrizeMoney.toLocaleString()}`,
      icon: TrendingUp,
      color: 'from-gold to-gold-dark',
      bgColor: 'bg-yellow-50'
    },
    {
      title: "Today's Tickets",
      value: stats.todayTickets,
      icon: Calendar,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    }
  ]

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-navy mb-2">Dashboard</h2>
        <p className="text-gray-600">Overview of your lottery system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`${stat.bgColor} rounded-xl p-6 shadow-lg`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                {stat.title}
              </h3>
              <p className="text-2xl font-bold text-navy">
                {stat.value}
              </p>
            </motion.div>
          )
        })}
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h3 className="text-xl font-bold text-navy mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="p-2 bg-blue-100 rounded-full">
              <TicketIcon className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-navy">New ticket created</p>
              <p className="text-sm text-gray-500">2 minutes ago</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="p-2 bg-green-100 rounded-full">
              <Trophy className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-navy">Winner announced</p>
              <p className="text-sm text-gray-500">1 hour ago</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="p-2 bg-purple-100 rounded-full">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-navy">New user registration</p>
              <p className="text-sm text-gray-500">3 hours ago</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default AdminDashboard
