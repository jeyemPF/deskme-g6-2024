import Sidebar, { SidebarItem, SidebarProvider, Content } from '../components/Sidebar';
import { LayoutDashboard, Calendar, Flag, LifeBuoy, Settings, LogOut } from "lucide-react";
import Header from '../components/Header';
import { useNavigate, useLocation } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOutClick = () => {
    navigate('/login');
  }

  const handleBooking = () => {
    navigate('/booking');
  }

  const handleDashboard = () => {
    navigate('/dashboard');
  }

  const isActive = (path) => {
    return location.pathname === path;
  }

  return (
    <div className="dark:bg-neutral-900" style={{ height: '100vh', overflowY: 'hidden' }}>
      <Header />
      <SidebarProvider>
        <Sidebar>
          <SidebarItem icon={<LayoutDashboard size={20} onClick={handleDashboard} />} text="Dashboard" active={isActive('/dashboard')} />
          <SidebarItem icon={<Calendar size={20} onClick={handleBooking} />} text="Booking" active={isActive('/booking')} />
          <SidebarItem icon={<Flag size={20} />} text="Reporting" active={isActive('/reporting')} />
          <hr className="my-3" />
          <SidebarItem icon={<Settings size={20} />} text="Settings" active={isActive('/settings')} />
          <SidebarItem icon={<LifeBuoy size={20} />} text="Help" active={isActive('/help')} />
          <hr className="my-3" />
          <SidebarItem icon={<LogOut size={20} onClick={handleSignOutClick} />} text="Sign Out" />
        </Sidebar>
        <div>
          <main className="container h-screen 2xl:pl-12 sm:pl-24 pt-5 dark:bg-neutral-900 dark:text-white">
            <p className="font-light text-sm">Dashboard / User</p>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Dashboard;
