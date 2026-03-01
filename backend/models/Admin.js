const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    default: 'admin',
    enum: ['admin']
  }
}, {
  timestamps: true
});

// Hash password before saving
adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    console.log('🔐 Hashing password for admin:', this.email);
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log('✅ Password hashed successfully');
    next();
  } catch (error) {
    console.error('💥 Password hashing error:', error);
    next(error);
  }
});

// Compare password method
adminSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    console.log('🔐 Comparing passwords...');
    console.log('📋 Stored password hash length:', this.password?.length);
    console.log('📋 Candidate password length:', candidatePassword?.length);
    
    if (!this.password) {
      console.log('❌ No stored password found');
      return false;
    }
    
    if (!candidatePassword) {
      console.log('❌ No candidate password provided');
      return false;
    }
    
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    console.log('🔍 Bcrypt comparison result:', isMatch);
    return isMatch;
  } catch (error) {
    console.error('💥 Password comparison error:', error);
    return false;
  }
};

module.exports = mongoose.model('Admin', adminSchema);
