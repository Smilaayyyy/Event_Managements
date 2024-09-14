import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventDetail = ({ match }) => {
  const [event, setEvent] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const [users, setUsers] = useState([]);
  const [rsvpUsers, setRsvpUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventId = match.params.id;

        // Fetch event details
        const eventResponse = await axios.get(`http://localhost:5000/api/events/${eventId}`);
        setEvent(eventResponse.data);

        // Fetch attendees
        const attendeesResponse = await axios.get(`http://localhost:5000/api/events/${eventId}/attendees`);
        setAttendees(attendeesResponse.data);

        // Fetch users
        const usersResponse = await axios.get('http://localhost:5000/api/users');
        setUsers(usersResponse.data);
      } catch (error) {
        setError('Error fetching data.');
        console.error(error);
      }
    };

    fetchData();
  }, [match.params.id]);

  const handleRsvp = async (confirm) => {
    try {
      await axios.post(`http://localhost:5000/api/events/${match.params.id}/rsvp`, {
        userIds: rsvpUsers,
        confirm,
      });
      alert('RSVP processed successfully.');
    } catch (error) {
      console.error('Error processing RSVP:', error);
    }
  };

  return (
    <div>
      <h1>Event Details</h1>
      {event && (
        <>
          <h2>{event.event_name}</h2>
          <p>{event.description}</p>
          <p>{new Date(event.date).toLocaleString()}</p>
        </>
      )}
      <h3>Attendees:</h3>
      <ul>
        {attendees.map(att => (
          <li key={att.user_id}>{att.user_name}</li>
        ))}
      </ul>
      <h3>Available Users:</h3>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name}
            <button onClick={() => setRsvpUsers([...rsvpUsers, user.id])}>RSVP</button>
          </li>
        ))}
      </ul>
      <button onClick={() => handleRsvp(true)}>RSVP to Selected Users</button>
      <button onClick={() => handleRsvp(false)}>Decline Selected Users</button>
    </div>
  );
};

export default EventDetail;
