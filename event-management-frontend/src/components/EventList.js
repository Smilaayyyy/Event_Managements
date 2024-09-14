// src/components/EventList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EventForm from './EventForm';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [searchId, setSearchId] = useState('');

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/events');
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/events/${searchId}`);
            setEvents([response.data]);
        } catch (error) {
            console.error('Error searching event:', error);
        }
    };

    const handleDelete = async (eventId) => {
        try {
            await axios.delete(`http://localhost:5000/api/events/${eventId}`);
            fetchEvents(); // Refresh the list of events
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    return (
        <div>
            <h2>Event List</h2>
            <input 
                type="text" 
                placeholder="Search by ID" 
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            <EventForm />
            <ul>
                {events.map(event => (
                    <li key={event.event_id}>
                        <Link to={`/events/${event.event_id}`}>{event.event_name}</Link>
                        <button onClick={() => handleDelete(event.event_id)}>Delete</button>
                        {/* Add a link or button to update the event */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventList;
