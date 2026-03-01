const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Admin Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('🔍 Login attempt:', { email, passwordLength: password?.length });

    // Validate input
    if (!email || !password) {
      console.log('❌ Missing email or password');
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Check for admin
    const admin = await Admin.findOne({ email });
    console.log('👤 Admin lookup result:', admin ? 'Found' : 'Not found');
    
    if (!admin) {
      console.log('❌ No admin found with email:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('📋 Admin details:', {
      id: admin._id,
      email: admin.email,
      role: admin.role,
      hasPassword: !!admin.password,
      passwordLength: admin.password?.length
    });

    // Check password
    console.log('🔐 Comparing password...');
    const isMatch = await admin.comparePassword(password);
    console.log('🔍 Password match result:', isMatch);
    
    if (!isMatch) {
      console.log('❌ Password mismatch for email:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Verify role
    console.log('🛡️ Checking role:', admin.role);
    if (admin.role !== 'admin') {
      console.log('❌ Invalid role:', admin.role);
      return res.status(403).json({ message: 'Access denied. Admin role required.' });
    }

    // Generate token
    console.log('🎟️ Generating JWT token...');
    const token = jwt.sign(
      { 
        id: admin._id, 
        email: admin.email, 
        role: admin.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('✅ Login successful for:', email);

    res.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('💥 Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create default admin (for initial setup)
const createDefaultAdmin = async (req, res) => {
  try {
    console.log('🔧 Creating default admin...');
    
    const existingAdmin = await Admin.findOne({ email: 'admin@punjablottery.com' });
    
    if (existingAdmin) {
      console.log('ℹ️ Default admin already exists');
      return res.status(400).json({ message: 'Default admin already exists' });
    }

    console.log('👤 Creating new admin account...');
    const admin = new Admin({
      email: 'admin@punjablottery.com',
      password: 'admin123'
    });

    await admin.save();

    console.log('✅ Default admin created successfully');
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
    console.error('💥 Create admin error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  login,
  createDefaultAdmin
};
