const contactController = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Send confirmation to user

    // For now, just log the contact
    console.log('Contact form submission:', { name, email, message });

    res.json({
      success: true,
      message: 'Thank you for contacting us. We will get back to you soon.'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = contactController;
