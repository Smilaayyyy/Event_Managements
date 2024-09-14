import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventDetail = ({ match }) => {
    const [event, setEvent] = useState(null);
    const [attendees, setAttendees] = useState([]);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const { id } = match.params;

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/events/${id}`);
                setEvent(response.data);
            } catch (error) {
                console.error('Error fetching event:', error);
                setError('Failed to fetch event details.');
            }
        };

        const fetchAttendees = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/events/${id}/attendees`);
                setAttendees(response.data);
            } catch (error) {
                console.error('Error fetching attendees:', error);
                setError('Failed to fetch attendees.');
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users`);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Failed to fetch users.');
            }
        };

        fetchEvent();
        fetchAttendees();
        fetchUsers();
    }, [id]);

    const handleRSVPAll = async () => {
        try {
            await axios.post(`http://localhost:5000/api/events/${id}/attendees`, { userId: users.map(user => user.user_id) });
            fetchAttendees();
        } catch (error) {
            console.error('Error RSVPing to all:', error);
            setError('Failed to RSVP to all attendees.');
        }
    };

    const handleRSVP = async (userId) => {
        try {
            await axios.post(`http://localhost:5000/api/events/${id}/attendees`, { userId });
            fetchAttendees();
        } catch (error) {
            console.error('Error RSVPing:', error);
            setError('Failed to RSVP.');
        }
    };

    const handleDelete = async (attendeeId) => {
        try {
            await axios.delete(`http://localhost:5000/api/events/${id}/attendees/${attendeeId}`);
            fetchAttendees();
        } catch (error) {
            console.error('Error deleting attendee:', error);
            setError('Failed to delete attendee.');
        }
    };

    const handleReminder = async () => {
        try {
            await axios.post(`http://localhost:5000/api/events/${id}/reminders`);
            alert('Reminders sent to all attendees.');
        } catch (error) {
            console.error('Error sending reminders:', error);
            setError('Failed to send reminders.');
        }
    };

    return (
        <div>
            {error && <p>{error}</p>}
            {event && (
                <>
                    <h2>{event.title}</h2>
                    <p>{event.description}</p>
                    <p>{event.date}</p>
                    <button onClick={handleRSVPAll}>RSVP to All</button>
                    <button onClick={handleReminder}>Send Reminder</button>
                </>
            )}
            <h3>Attendees</h3>
            <ul>
                {attendees.map(attendee => (
                    <li key={attendee.id}>
                        {attendee.User.name}
                        <button onClick={() => handleDelete(attendee.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h3>Users</h3>
            <ul>
                {users.map(user => (
                    <li key={user.user_id}>
                        {user.name}
                        <button onClick={() => handleRSVP(user.user_id)}>RSVP</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventDetail;
