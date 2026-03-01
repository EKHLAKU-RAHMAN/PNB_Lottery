const Ticket = require('../models/Ticket');

// Generate unique ticket number
const generateTicketNumber = () => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `PNB-${timestamp}-${random}`.toUpperCase();
};

// Create new ticket
const createTicket = async (req, res) => {
  try {
    const { ticketNumber, customerName, phoneNumber, prizeAmount, resultDate, status } = req.body;

    // Validate input
    if (!ticketNumber || !customerName || !phoneNumber || !resultDate) {
      return res.status(400).json({ 
        success: false,
        message: 'Please provide all required fields: ticketNumber, customerName, phoneNumber, resultDate' 
      });
    }

    // Check if ticket number already exists
    const existingTicket = await Ticket.findOne({ ticketNumber: ticketNumber.toUpperCase() });
    if (existingTicket) {
      return res.status(400).json({ 
        success: false,
        message: 'Ticket number already exists. Please use a unique ticket number.' 
      });
    }

    // Default status to 'won' if not provided
    const ticketStatus = status || 'won';

    const ticket = new Ticket({
      ticketNumber: ticketNumber.toUpperCase(),
      customerName,
      phoneNumber,
      prizeAmount: prizeAmount || 0,
      resultDate: new Date(resultDate),
      status: ticketStatus
    });

    await ticket.save();

    // Emit socket event for real-time update
    req.app.get('io')?.emit('ticketCreated', ticket);

    res.status(201).json({
      success: true,
      message: 'Ticket created successfully',
      ticket
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// Get all tickets with pagination and filtering
const getTickets = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const { status, date, search } = req.query;
    
    // Build filter
    const filter = {};
    if (status) filter.status = status;
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      filter.resultDate = { $gte: startDate, $lt: endDate };
    }
    if (search) {
      filter.$or = [
        { ticketNumber: { $regex: search, $options: 'i' } },
        { customerName: { $regex: search, $options: 'i' } },
        { phoneNumber: { $regex: search, $options: 'i' } }
      ];
    }

    const tickets = await Ticket.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Ticket.countDocuments(filter);

    res.json({
      success: true,
      tickets,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update ticket
const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Sync isWinner with status
    if (updates.status === 'won') {
      updates.isWinner = true;
    } else {
      updates.isWinner = false;
    }

    const ticket = await Ticket.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Emit socket event for real-time update
    req.app.get('io')?.emit('ticketUpdated', ticket);

    res.json({
      success: true,
      message: 'Ticket updated successfully',
      ticket
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete ticket
const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await Ticket.findByIdAndDelete(id);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Emit socket event for real-time update
    req.app.get('io')?.emit('ticketDeleted', { id: ticket._id });

    res.json({
      success: true,
      message: 'Ticket deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Check ticket result
const checkTicket = async (req, res) => {
  try {
    const { ticketNumber, phoneNumber } = req.query;

    if (!ticketNumber) {
      return res.status(400).json({ message: 'Ticket number and phone number are required' });
    }

    const ticket = await Ticket.findOne({
      ticketNumber: ticketNumber.toUpperCase(),
    });

    if (!ticket) {
      return res.status(404).json({ 
        success: false,
        message: 'Ticket not found' 
      });
    }

    res.json({
      success: true,
      ticket: {
        ticketNumber: ticket.ticketNumber,
        customerName: ticket.customerName,
        phoneNumber: ticket.status === 'won' ? ticket.phoneNumber : undefined,
        status: ticket.status,
        prizeAmount: ticket.prizeAmount,
        resultDate: ticket.resultDate,
        isWinner: ticket.isWinner
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get recent winners
const getWinners = async (req, res) => {
  try {
    const winners = await Ticket.find({
      isWinner: true,
      status: 'won'
    })
    .sort({ updatedAt: -1 })
    .limit(12);

    res.json({
      success: true,
      winners
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createTicket,
  getTickets,
  updateTicket,
  deleteTicket,
  checkTicket,
  getWinners
};
