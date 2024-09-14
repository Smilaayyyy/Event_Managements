// src/pages/UserProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [rsvps, setRsvps] = useState([]);

  useEffect(() => {
    fetchUser();
    fetchRsvps();
  }, [userId]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const fetchRsvps = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${userId}/rsvps`);
      setRsvps(response.data);
    } catch (error) {
      console.error('Error fetching user RSVPs:', error);
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      {user && (
        <div>
          <h3>{user.username}</h3>
          <p>Email: {user.email}</p>
        </div>
      )}
      <h3>RSVP Status</h3>
      <ul>
        {rsvps.map(rsvp => (
          <li key={rsvp.event_id}>
            Event ID: {rsvp.event_id} - Status: {rsvp.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;
