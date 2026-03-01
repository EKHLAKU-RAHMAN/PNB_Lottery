const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Admin Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Please provide email and password' 
      });
    }

    // Check for admin
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    // Check password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    // Verify role
    if (admin.role !== 'admin') {
      return res.status(403).json({ 
        success: false,
        message: 'Access denied. Admin role required.' 
      });
    }

    // Generate token
    const token = jwt.sign(
      { 
        id: admin._id, 
        email: admin.email, 
        role: admin.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// Create default admin (for initial setup)
const createDefaultAdmin = async (req, res) => {
  try {
    const existingAdmin = await Admin.findOne({ email: 'admin@punjablottery.com' });
    
    if (existingAdmin) {
      return res.status(400).json({ 
        success: false,
        message: 'Default admin already exists' 
      });
    }

    const admin = new Admin({
      email: 'admin@punjablottery.com',
      password: 'admin123'
    });

    await admin.save();

    res.status(201).json({
      success: true,
      message: 'Default admin created successfully',
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Create admin error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

module.exports = {
  login,
  createDefaultAdmin
};
