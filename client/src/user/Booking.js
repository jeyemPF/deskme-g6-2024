import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Deskmap from '../components/Deskmap';

function Booking() {

  return (
    <div style={{ height: '100vh', overflowY: 'hidden' }}>
      <Header />
      <div>
        <Sidebar />
      </div>
      <div className='text-center'>
        <Deskmap/>
      </div>
    </div>
  );
};

export default Booking;