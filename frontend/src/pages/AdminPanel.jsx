import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useSocket } from '../context/SocketContext'
import AdminDashboard from '../components/admin/AdminDashboard'
import TicketManagement from '../components/admin/TicketManagement'
import CreateTicket from '../components/admin/CreateTicket'
import { LogOut, Users, Ticket as TicketIcon, PlusCircle, BarChart } from 'lucide-react'

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const { user, logout } = useAuth()
  const { isConnected } = useSocket()

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart },
    { id: 'tickets', name: 'Manage Tickets', icon: TicketIcon },
    { id: 'create', name: 'Create Ticket', icon: PlusCircle },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-navy text-white shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold">Admin Panel</h1>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm text-gray-300">
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span className="text-sm">{user?.email}</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg min-h-screen">
          <nav className="p-4">
            <div className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-gold text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.name}</span>
                  </button>
                )
              })}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'dashboard' && <AdminDashboard />}
            {activeTab === 'tickets' && <TicketManagement />}
            {activeTab === 'create' && <CreateTicket />}
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default AdminPanel
