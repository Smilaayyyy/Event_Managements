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
        const eventId = req.params.eventId;
        const event = await Event.findOne({ where: { event_id: eventId } });
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.updateEvent = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const [updated] = await Event.update(req.body, { where: { event_id: eventId } });
        if (!updated) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json({ message: 'Event updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const deleted = await Event.destroy({ where: { event_id: eventId } });
        if (!deleted) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.addAttendee = async (req, res) => {
    try {
      const { eventId } = req.params;
      const { userId } = req.body;
  
      const event = await Event.findByPk(eventId);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const newAttendee = await Attendee.create({ event_id: eventId, user_id: userId });
      res.status(201).json(newAttendee);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
  