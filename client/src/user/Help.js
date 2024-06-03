import React from 'react';
import { LayoutDashboard, Layers, Flag, BookCopy, LifeBuoy, Settings, LogOut, ScrollText } from "lucide-react";
import Sidebar, { SidebarItem, SidebarProvider, Content } from '../components/Sidebar';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import Manual from '../components/Manual';

const Help = () => {
  const navigate = useNavigate();

  const handleSignOutClick = () => {
    // Clear session storage
    sessionStorage.removeItem('userCredentials');
    // Navigate to login page
    navigate('/login');
  };

  const handleBookingClick = () => {
    navigate('/booking');
  };

  const handleManageBookingClick = () => {
    navigate('/managebooking');
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  const tableItems = [
    {
      desk_id: 1,
      name: "Desk 1A",
      status: "Available",
      officeEquipment: "Chair, Laptop, Mhayumie",
      area: "Left Wing"
    },
    {
      desk_id: 2,
      name: "Desk 1B",
      status: "Available",
      officeEquipment: "Sofa, Computer",
      area: "Right Wing"
    },
    {
      desk_id: 3,
      name: "Desk 1C",
      status: "Available",
      officeEquipment: "Sofa",
      area: "Center"
    },
  ];

  return (
    <>
      <Header />
      <div className="flex dark:bg-neutral-900">
        <SidebarProvider>
          <Sidebar>
            <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" onClick={handleDashboardClick} />
            <SidebarItem icon={<BookCopy size={20} />} text="Booking" onClick={handleBookingClick} />
            <SidebarItem icon={<Layers size={20} />} text="Manage Bookings" onClick={handleManageBookingClick} />
            <hr className="my-3" />
            <SidebarItem icon={<Settings size={20} />} text="Settings" />
            <SidebarItem icon={<LifeBuoy size={20}  />} text="Help"  active  />
            <hr className="my-3" />
            <SidebarItem icon={<LogOut size={20} />} text="Sign Out" onClick={handleSignOutClick} />
          </Sidebar>
          <Content>
              <Manual />
          </Content>
        </SidebarProvider>
      </div>
    </>
  );
};

export default Help;
