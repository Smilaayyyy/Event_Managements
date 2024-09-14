const eventService = require('../services/eventService'); // Ensure this path is correct

exports.createEvent = async (req, res) => {
    try {
        const eventData = req.body;
        const newEvent = await eventService.createEvent(eventData);
        res.status(201).json(newEvent);
    } catch (error) {
        console.error('Error creating event:', error); // Log the error for debugging
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getAllEvents = async (req, res) => {
    try {
        const events = await eventService.getAllEvents();
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error); // Log the error for debugging
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getEventById = async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await eventService.getEventById(eventId);
        if (event) {
            res.json(event);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        console.error('Error fetching event:', error); // Log the error for debugging
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.updateEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const updateData = req.body;
        const updatedEvent = await eventService.updateEvent(eventId, updateData);
        res.json(updatedEvent);
    } catch (error) {
        console.error('Error updating event:', error); // Log the error for debugging
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        await eventService.deleteEvent(eventId);
        res.status(204).send(); // No content
    } catch (error) {
        console.error('Error deleting event:', error); // Log the error for debugging
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
