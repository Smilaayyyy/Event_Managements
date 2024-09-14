import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function Notification() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on('notification', notification => {
      setNotifications(prev => [...prev, notification]);
    });

    return () => {
      socket.off('notification');
    };
  }, []);

  return (
    <div>
      <h2></h2>
      <ul>
        {notifications.map((notif, index) => (
          <li key={index}>{notif.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default Notification;
