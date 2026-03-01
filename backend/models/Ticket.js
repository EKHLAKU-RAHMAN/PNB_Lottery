const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  ticketNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  prizeAmount: {
    type: Number,
    default: 0
  },
  resultDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'won', 'lost'],
    default: 'won'
  },
  isWinner: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Pre-save middleware to sync isWinner with status
ticketSchema.pre('save', function(next) {
  if (this.status === 'won') {
    this.isWinner = true;
  } else {
    this.isWinner = false;
  }
  next();
});

// Indexes for performance
ticketSchema.index({ ticketNumber: 1 });
ticketSchema.index({ phoneNumber: 1 });
ticketSchema.index({ resultDate: 1 });
ticketSchema.index({ status: 1 });

module.exports = mongoose.model('Ticket', ticketSchema);
