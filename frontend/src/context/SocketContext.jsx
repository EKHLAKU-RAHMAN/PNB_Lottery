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
    const socketUrl = import.meta.env.VITE_API_URL;
    if (!socketUrl) {
      console.error('VITE_API_URL environment variable is required for socket connection');
      return;
    }

    const socketInstance = io(socketUrl, {
      auth: {
        token: token
      }
    })

    socketInstance.on('connect', () => {
      setIsConnected(true)
    })

    socketInstance.on('disconnect', () => {
      setIsConnected(false)
    })

    socketInstance.on('ticketCreated', (ticket) => {
      // Handle ticket creation if needed
    })

    socketInstance.on('ticketUpdated', (ticket) => {
      // Handle ticket updates if needed
    })

    socketInstance.on('ticketDeleted', (data) => {
      // Handle ticket deletion if needed
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
