const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const auth = require('../middleware/auth');
const { login, createDefaultAdmin } = require('../controllers/adminController');

// Login route
router.post('/login', [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], login);

// Create default admin (for initial setup)
router.post('/create-default', createDefaultAdmin);

// Protected routes
router.get('/profile', auth, (req, res) => {
  res.json({
    success: true,
    admin: req.admin
  });
});

module.exports = router;
