// src/App.js
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Authenticate from './auth/Authenticate';
import Login from './auth/Login';
import AuthenticateSuccess from './auth/AuthenticateSuccess';
import Dashboard from './user/Dashboard';
import Booking from './user/Booking';
import ManageBooking from './user/ManageBooking';
import ResetPassword from './auth/ResetPassword';
import NewPassword from './auth/NewPassword';
import ADashboard from './admin/ADashboard';
import ABooking from './admin/ABooking';
import AManageBooking from './admin/AManageBooking';
import AManage from './admin/AManage';
import SADashboard from './superadmin/SADashboard';
import SABooking from './superadmin/SABooking';
import SAManageBooking from './superadmin/SAManageBooking';
import SAPManage from './superadmin/SAPManage';
import SAReports from './superadmin/SAReports';
import SAAuditReport from './superadmin/SAAuditReport';
import OMDashboard from './officemanager/OMDashboard';
import OMBooking from './officemanager/OMBooking';
import OMReports from './officemanager/OMReports';
import OMManageBooking from './officemanager/OMManageBooking';
import MyBooking from './user/ManageBooking';
import Error from './components/Error';
import Help from './user/Help';
import Manual from './components/Manual';
import ProtectedRoute from './auth/ProtectedRoute';

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
          <Route path='/resetpassword' element={<ResetPassword />} />
          <Route path='/newpassword/:token/:id' element={<NewPassword />} />

          {/* Protected Routes for User  */}
          <Route 
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <Dashboard />
              </ProtectedRoute>
            }
            />

          <Route 
            path="/booking"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <Booking />
              </ProtectedRoute>
            }
            />

          <Route 
            path="/mybooking"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <MyBooking />
              </ProtectedRoute>
            }
            />

          <Route 
            path="/help" 
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <Help />
              </ProtectedRoute>
            } />

            


          {/* Protected Routes for Admin */}
          <Route 
            path="/admindashboard" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <ADashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/adminbooking" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <ABooking />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/adminmanagebooking" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AManageBooking />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/adminmanage" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AManage />
              </ProtectedRoute>
            } 
          />

          {/* Protected Routes for Super Admin */}
          <Route 
            path="/superdashboard" 
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <SADashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/superbooking" 
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <SABooking />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/supermanagebooking" 
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <SAManageBooking />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/superprivmanage" 
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <SAPManage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/superreports" 
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <SAReports />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/superaudit" 
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <SAAuditReport />
              </ProtectedRoute>
            } 
          />

          {/* Protected Routes for Office Manager */}
          <Route 
            path="/officedashboard" 
            element={
              <ProtectedRoute allowedRoles={['officemanager']}>
                <OMDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/officebooking" 
            element={
              <ProtectedRoute allowedRoles={['officemanager']}>
                <OMBooking />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/officemanagebooking" 
            element={
              <ProtectedRoute allowedRoles={['officemanager']}>
                <OMManageBooking />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/officereports" 
            element={
              <ProtectedRoute allowedRoles={['officemanager']}>
                <OMReports />
              </ProtectedRoute>
            } 
          />


          <Route path="*" element={<Error />} />

          <Route path="/error" element={<Error />} />
          <Route path="/manual" element={<Manual />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
