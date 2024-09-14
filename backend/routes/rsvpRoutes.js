const express = require('express');
const { createRSVP } = require('../controllers/rsvpcontroller');
const router = express.Router();

router.post('/', createRSVP);

// Other RSVP routes...

module.exports = router;
