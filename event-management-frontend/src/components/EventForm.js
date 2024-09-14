import { useState } from 'react';
import axios from 'axios';

function EventForm() {
  const [event, setEvent] = useState({
    event_name: '',
    description: '',
    date: ''
  });

  const handleChange = e => setEvent({ ...event, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/events', event)
      .then(response => {
        alert('Event created successfully!');
      })
      .catch(error => {
        console.error('Error creating event:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="event_name" value={event.event_name} onChange={handleChange} placeholder="Event Name" required />
      <textarea name="description" value={event.description} onChange={handleChange} placeholder="Description" required></textarea>
      <input type="datetime-local" name="date" value={event.date} onChange={handleChange} required />
      <button type="submit">Create Event</button>
    </form>
  );
}

export default EventForm;
