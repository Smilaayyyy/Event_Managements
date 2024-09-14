const express = require('express');
const router = express.Router();
const eventcontroller = require('../controllers/eventcontroller');


router.post('/', eventcontroller.createEvent);


router.get('/', eventcontroller.getAllEvents);

router.get('/:eventId', eventcontroller.getEventById);

router.put('/:eventId', eventcontroller.updateEvent);

router.delete('/:eventId', eventcontroller.deleteEvent);
router.post('/:eventId/attendees', eventcontroller.addAttendee); // Add attendee route
router.get('/:eventId/attendees', eventcontroller.getAttendees); 

module.exports = router;
