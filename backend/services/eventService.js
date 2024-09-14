const Event = require('../models/Event'); // Ensure this path is correct

// Create a new event
exports.createEvent = async (eventData) => {
    return Event.create(eventData);
};

// Get all events
exports.getAllEvents = async () => {
    return Event.findAll();
};

// Get a single event by ID
exports.getEventById = async (eventId) => {
    return Event.findByPk(eventId);
};

// Update an event by ID
exports.updateEvent = async (eventId, updateData) => {
    const event = await Event.findByPk(eventId);
    if (event) {
        return event.update(updateData);
    } else {
        throw new Error('Event not found');
    }
};

// Delete an event by ID
exports.deleteEvent = async (eventId) => {
    const event = await Event.findByPk(eventId);
    if (event) {
        return event.destroy();
    } else {
        throw new Error('Event not found');
    }
};
