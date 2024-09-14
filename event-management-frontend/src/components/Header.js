import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Header() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleSendReminders = async () => {
    try {
      const eventIds = events.map(event => event.event_id);
      await axios.post('http://localhost:5000/api/events/reminders', { eventIds });
      alert('Reminders sent successfully for all events.');
    } catch (error) {
      console.error('Error sending reminders:', error);
    }
  };

  return (
    <header>
      <h1>Event Management</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <button onClick={handleSendReminders}>Send Reminders for All Events</button>
      </nav>
    </header>
  );
}

export default Header;
