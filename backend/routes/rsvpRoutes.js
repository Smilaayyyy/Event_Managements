const express = require('express');
const { createRSVP } = require('../controllers/rsvpcontroller');
const router = express.Router();

router.post('/', createRSVP);

router.post('/:eventId/rsvp', eventController.rsvpToEvent); // RSVP route
router.post('/:eventId/remove-attendee', eventController.removeAttendee); // Remove attendee route
router.get('/:eventId/attendees', eventController.getAttendees); //
module.exports = router;
