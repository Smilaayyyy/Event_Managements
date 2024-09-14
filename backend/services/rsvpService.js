const RSVP = require('../models/RSVP');

exports.createRSVP = async (rsvpData) => {
    return RSVP.create(rsvpData);
};

// Other RSVP-related methods...
