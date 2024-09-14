import axios from 'axios';
import React, { useEffect, useState } from 'react';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/events') // Make sure this URL matches your backend configuration
            .then(response => {
                setEvents(response.data);
            })
            .catch(err => {
                console.error('Error fetching events:', err.message); // Log error message for debugging
                setError('Error fetching events: ' + err.message);
            });
    }, []);

    return (
        <div>
            {error && <p>{error}</p>}
            <ul>
                {events.map(event => (
                    <li key={event.id}>{event.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default EventList;
