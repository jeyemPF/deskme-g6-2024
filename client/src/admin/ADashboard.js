import React from 'react'
import { LayoutDashboard, Layers, Flag, Calendar, LifeBuoy, Settings, LogOut } from "lucide-react";
import Sidebar, { SidebarItem, SidebarProvider, Content } from '../components/Sidebar'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom';

const ADashboard = () => {

  const navigate = useNavigate();

  const handleSignOutClick = () => {
    navigate('/login');
  }

  return (
    <>
      <Header />
      <div className="flex">
      <SidebarProvider>
        <Sidebar>
          <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active />
          <SidebarItem icon={<Calendar size={20} />} text="Booking" />
          <SidebarItem icon={<Layers size={20} />} text="Manage Bookings" />
          <SidebarItem icon={<Flag size={20} />} text="Reporting" />
          <hr className="my-3" />
          <SidebarItem icon={<Settings size={20} />} text="Settings" />
          <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
          <hr className="my-3" />
          <SidebarItem icon={<LogOut size={20} onClick={handleSignOutClick} />} text="Sign Out"/>
        </Sidebar>
        <Content>
                <h1>Your main content here</h1>
                <p>This is the content area that will be pushed when the sidebar is expanded.</p>
        </Content>
      </SidebarProvider>
      </div>
    </>
  )
}

export default ADashboard