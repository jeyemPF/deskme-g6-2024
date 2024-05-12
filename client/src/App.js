import Home from '../src/pages/Home';
import About from '../src/pages/About';
import Services from '../src/pages/Services';
import Contact from '../src/pages/Contact';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'; // Make sure to import BrowserRouter
import Authenticate from '../src/auth/Authenticate';
import Login from '../src/auth/Login';
import AuthenticateSuccess from '../src/auth/AuthenticateSuccess';
import Dashboard from '../src/user/Dashboard';
import Booking from '../src/user/Booking';
import ManageBooking from '../src/user/ManageBooking';
import ResetPassword from './auth/ResetPassword';
import NewPassword from './auth/NewPassword';
import ADashboard from './admin/ADashboard';

function App() {
  return (
  <div>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/authenticate" element={<Authenticate />} />
        <Route path="/authenticatesuccess" element={<AuthenticateSuccess />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/booking' element={<Booking />} />
        <Route path='/managebooking' element={<ManageBooking />} />
        <Route path='/resetpassword' element={<ResetPassword />} />
        <Route path='/newpassword' element={<NewPassword />} />
        <Route path='/sadmindashboard' element={<ADashboard />} />
      </Routes>
    </Router> 
  </div>
  
  );
}

export default App;
