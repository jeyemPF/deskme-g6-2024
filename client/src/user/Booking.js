import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

function Booking() {

  return (
    <div style={{ height: '100vh', overflowY: 'hidden' }}>
      <Header />
      <div>
        <Sidebar />
      </div>
    </div>
  );
};

export default Booking;