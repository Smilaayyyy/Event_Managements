import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [rsvpStatus, setRsvpStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch event details when the component is mounted
  useEffect(() => {
    axios.get(`http://localhost:5000/api/events/${id}`)
      .then(response => {
        setEvent(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching event details:', error);
        setLoading(false);
      });
  }, [id]);

  // Handle RSVP submission
  const handleRsvp = (status) => {
    axios.post(`/api/events/${id}/rsvp`, { status })
      .then(response => {
        alert('RSVP successful!');
        setRsvpStatus(status);
      })
      .catch(error => {
        console.error('Error submitting RSVP:', error);
      });
  };

  if (loading) return <p>Loading...</p>;

  if (!event) return <p>Event not found!</p>;

  return (
    <div>
      <h2>{event.event_name}</h2>
      <p>{event.description}</p>
      <p>Date: {new Date(event.date).toLocaleString()}</p>

      <div>
        <h3>RSVP Status</h3>
        <p>{rsvpStatus || "You haven't RSVP'd yet"}</p>
        <button onClick={() => handleRsvp('attending')}>RSVP Attending</button>
        <button onClick={() => handleRsvp('not_attending')}>RSVP Not Attending</button>
      </div>
    </div>
  );
}

export default EventDetail;
