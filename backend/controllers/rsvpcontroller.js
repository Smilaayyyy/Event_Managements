const rsvpService = require('../services/rsvpService');

exports.createRSVP = async (req, res) => {
    try {
        const rsvpData = req.body;
        const newRSVP = await rsvpService.createRSVP(rsvpData);
        res.status(201).json(newRSVP);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Other RSVP-related methods...
