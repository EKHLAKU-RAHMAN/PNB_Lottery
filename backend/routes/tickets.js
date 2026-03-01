const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createTicket,
  getTickets,
  updateTicket,
  deleteTicket,
  checkTicket,
  getWinners
} = require('../controllers/ticketController');

// Public routes
router.get('/check', checkTicket);
router.get('/winners', getWinners);

// Protected routes (admin only)
router.post('/', auth, [
  body('customerName').notEmpty().withMessage('Customer name is required'),
  body('phoneNumber').notEmpty().withMessage('Phone number is required'),
  body('resultDate').isISO8601().withMessage('Valid result date is required')
], createTicket);

router.get('/', auth, getTickets);
router.put('/:id', auth, updateTicket);
router.delete('/:id', auth, deleteTicket);

module.exports = router;
