import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, X, Calendar, User, Phone, Ticket } from 'lucide-react'
import axios from 'axios'

const CreateTicket = () => {
  const [formData, setFormData] = useState({
    ticketNumber: '',
    customerName: '',
    phoneNumber: '',
    prizeAmount: 0,
    resultDate: new Date().toISOString().split('T')[0],
    status: 'won'
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value, type } = e.target
    
    // Handle numeric inputs properly
    if (type === 'number') {
      setFormData({
        ...formData,
        [name]: value === '' ? 0 : Number(value)
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await axios.post('/api/tickets', formData)
      setSuccess('Ticket created successfully!')
      setFormData({
        ticketNumber: '',
        customerName: '',
        phoneNumber: '',
        prizeAmount: 0,
        resultDate: new Date().toISOString().split('T')[0],
        status: 'won'
      })
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create ticket')
    } finally {
      setLoading(false)
    }
  }

  const formFields = [
    {
      name: 'ticketNumber',
      label: 'Ticket Number',
      type: 'text',
      icon: Ticket,
      placeholder: 'Enter ticket number (e.g., PNB-12345)',
      required: true
    },
    {
      name: 'customerName',
      label: 'Customer Name',
      type: 'text',
      icon: User,
      placeholder: 'Enter customer name',
      required: true
    },
    {
      name: 'phoneNumber',
      label: 'Phone Number',
      type: 'tel',
      icon: Phone,
      placeholder: 'Enter phone number',
      required: true
    },
    {
      name: 'prizeAmount',
      label: 'Prize Amount',
      type: 'number',
      placeholder: 'Enter prize amount',
      required: false
    },
    {
      name: 'resultDate',
      label: 'Result Date',
      type: 'date',
      icon: Calendar,
      required: true
    }
  ]

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-navy mb-2">Create New Ticket</h2>
        <p className="text-gray-600">Add a new lottery ticket to the system</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg p-8 max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {formFields.map((field, index) => {
            const Icon = field.icon
            return (
              <motion.div
                key={field.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {Icon && <Icon className="inline h-4 w-4 mr-2" />}
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={field.type === 'number' ? formData[field.name] || '' : formData[field.name]}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  placeholder={field.placeholder}
                  required={field.required}
                />
              </motion.div>
            )
          })}

          {/* Status Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
            >
              <option value="active">Active</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
            </select>
          </motion.div>

          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg"
            >
              {success}
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="flex space-x-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="flex-1 gold-gradient text-white font-bold py-3 rounded-lg hover:gold-gradient-hover transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              <Save className="h-5 w-5" />
              <span>{loading ? 'Creating...' : 'Create Ticket'}</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => setFormData({
                customerName: '',
                phoneNumber: '',
                prizeAmount: 0,
                resultDate: new Date().toISOString().split('T')[0],
                status: 'active'
              })}
              className="flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <X className="h-5 w-5" />
              <span>Clear</span>
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  )
}

export default CreateTicket
