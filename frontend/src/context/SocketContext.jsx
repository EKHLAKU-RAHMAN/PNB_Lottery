import React, { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { useAuth } from './AuthContext'

const SocketContext = createContext()

export const useSocket = () => {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider')
  }
  return context
}

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const { token } = useAuth()

  useEffect(() => {
    const socketInstance = io(import.meta.env.VITE_API_URL || 'http://localhost:5000', {
      auth: {
        token: token
      }
    })

    socketInstance.on('connect', () => {
      console.log('Connected to server')
      setIsConnected(true)
    })

    socketInstance.on('disconnect', () => {
      console.log('Disconnected from server')
      setIsConnected(false)
    })

    socketInstance.on('ticketCreated', (ticket) => {
      console.log('New ticket created:', ticket)
    })

    socketInstance.on('ticketUpdated', (ticket) => {
      console.log('Ticket updated:', ticket)
    })

    socketInstance.on('ticketDeleted', (data) => {
      console.log('Ticket deleted:', data)
    })

    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect()
    }
  }, [token])

  const value = {
    socket,
    isConnected
  }

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  )
}
