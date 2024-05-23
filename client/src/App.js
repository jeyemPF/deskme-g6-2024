import Home from '../src/pages/Home';
import About from '../src/pages/About';
import Services from '../src/pages/Services';
import Contact from '../src/pages/Contact';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Authenticate from '../src/auth/Authenticate';
import Login from '../src/auth/Login';
import AuthenticateSuccess from '../src/auth/AuthenticateSuccess';
import Dashboard from '../src/user/Dashboard';
import Booking from '../src/user/Booking';
import ManageBooking from '../src/user/ManageBooking';
import ResetPassword from './auth/ResetPassword';
import NewPassword from './auth/NewPassword';
import ADashboard from './admin/ADashboard';
import ABooking from './admin/ABooking';
import AManageBooking from './admin/AManageBooking';
import AReports from './admin/AReports';
import SADashboard from './superadmin/SADashboard';
import SABooking from './superadmin/SABooking';
import SAManageBooking from './superadmin/SAManageBooking';
import SAPManage from './superadmin/SAPManage';
import SAReports from './superadmin/SAReports';
import SAAuditReport from './superadmin/SAAuditReport';
import OMDashboard from './officemanager/OMDashboard';

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
        <Route path='/admindashboard' element={<ADashboard />} />
        <Route path='/adminbooking' element={<ABooking />} />
        <Route path='/adminmanagebooking' element={<AManageBooking />} />
        <Route path='/adminreports' element={<AReports />} />
        <Route path='/superdashboard' element={<SADashboard />} />
        <Route path='/superbooking' element={<SABooking />} />
        <Route path='/supermanagebooking' element={<SAManageBooking />} />
        <Route path='/superprivmanage' element={<SAPManage />} />
        <Route path='/superreports' element={<SAReports />} />
        <Route path='/superaudit' element={<SAAuditReport />} />
        <Route path='/officedashboard' element={<OMDashboard />} />
      </Routes>
    </Router> 
  </div>
  
  );
}

export default App;
