import EventList from '../components/EventList';
import Header from '../components/Header';
import Notification from '../components/Notification';

function Home() {
  return (
    <div>
      <Header />
      <Notification />
      <EventList />
    </div>
  );
}

export default Home;