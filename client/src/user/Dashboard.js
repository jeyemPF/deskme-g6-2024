import Sidebar, { SidebarItem, SidebarProvider, Content } from '../components/Sidebar';
import { LayoutDashboard, Calendar, Flag, LifeBuoy, Settings, LogOut } from "lucide-react";
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate(); 

  const handleSignOutClick = () => {
    navigate('/login');
  }

  const handleManageBooking = () => {
    navigate('/managebooking')
  }

  return (
    <div className="dark:bg-neutral-900" style={{ height: '100vh', overflowY: 'hidden' }}>
      <Header />
      <SidebarProvider>
        <Sidebar>
          <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active />
          <SidebarItem icon={<Calendar size={20} onClick={handleManageBooking} />} text="Booking" />
          <SidebarItem icon={<Flag size={20} />} text="Reporting" />
          <hr className="my-3" />
          <SidebarItem icon={<Settings size={20} />} text="Settings" />
          <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
          <hr className="my-3" />
          <SidebarItem icon={<LogOut size={20} onClick={handleSignOutClick} />} text="Sign Out"/>
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
