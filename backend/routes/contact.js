const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.post('/', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('message').notEmpty().withMessage('Message is required')
], contactController);

module.exports = router;
