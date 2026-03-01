import React from 'react'
import { motion } from 'framer-motion'
import { Crown, Medal, Award, Gift, Star, Trophy } from 'lucide-react'

const PrizeStructureSection = () => {
  const prizes = [
    {
      rank: 1,
      name: '1st Prize',
      amount: '₹50,00,000',
      icon: Crown,
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      rank: 2,
      name: '2nd Prize', 
      amount: '₹25,00,000',
      icon: Trophy,
      color: 'from-gray-300 to-gray-500'
    },
    {
      rank: 3,
      name: '3rd Prize',
      amount: '₹12,00,000',
      icon: Medal,
      color: 'from-orange-400 to-orange-600'
    },
    {
      rank: 4,
      name: '4th Prize',
      amount: '₹8,00,000',
      icon: Award,
      color: 'from-blue-400 to-blue-600'
    },
    {
      rank: 5,
      name: '5th Prize',
      amount: '₹5,00,000',
      icon: Gift,
      color: 'from-green-400 to-green-600'
    },
    {
      rank: 6,
      name: 'Consolation',
      amount: '₹50,000 - ₹5,00,000',
      icon: Star,
      color: 'from-purple-400 to-purple-600'
    }
  ]

  return (
    <section id="prize" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-navy mb-4">
            Prize Structure
          </h2>
          <p className="text-xl text-gray-600">
            Amazing prizes waiting for our lucky winners
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {prizes.map((prize, index) => {
            const Icon = prize.icon
            return (
              <motion.div
                key={prize.rank}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }}
                className="bg-white rounded-2xl shadow-xl p-8 text-center card-shadow border border-gray-100"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${prize.color} mb-6`}
                >
                  <Icon className="h-10 w-10 text-white" />
                </motion.div>

                {/* Rank Badge */}
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-navy text-white text-sm font-bold mb-4">
                  {prize.rank}
                </div>

                {/* Prize Name */}
                <h3 className="text-xl font-bold text-navy mb-2">
                  {prize.name}
                </h3>

                {/* Prize Amount */}
                <div className="text-3xl font-bold text-gold mb-4">
                  {prize.amount}
                </div>

                {/* Decorative Line */}
                <div className="w-16 h-1 gold-gradient mx-auto rounded-full"></div>
              </motion.div>
            )
          })}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-navy rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              How to Win?
            </h3>
            <p className="text-lg text-gold-light max-w-3xl mx-auto">
              Purchase your ticket, check the results on draw day, and if your ticket number matches 
              the winning numbers, you could be one of our lucky winners! All prizes are guaranteed 
              and paid out immediately.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default PrizeStructureSection
