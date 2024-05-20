import React from 'react'
import Header from '../components/Header'
import Sidebar, { SidebarItem, SidebarProvider, Content } from '../components/Sidebar'
import { LayoutDashboard, Layers, Flag, BookCopy, LifeBuoy, Settings, LogOut, Users, MonitorCheck, ScrollText, MonitorX, GalleryVerticalEnd } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const SADashboard = () => {

    const navigate = useNavigate();

  const handleSignOutClick = () => {
    navigate('/login');
  }
  const handleBookingClick = () => {
    navigate('/superbooking');
  }

  return (
    <>
     <Header />
      <div className="flex dark:bg-neutral-900">
      <SidebarProvider>
        <Sidebar>
          <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active />
          <SidebarItem icon={<BookCopy size={20} onClick={handleBookingClick}/>} text="Booking" />
          <SidebarItem icon={<Layers size={20} />} text="Manage Bookings" />
          <SidebarItem icon={<Users size={20} />} text="Manage Admins" />
          <hr className="my-3" />
          <SidebarItem icon={<Settings size={20} />} text="Settings" />
          <SidebarItem icon={<LifeBuoy size={20} />} text="Help"/>
          <hr className="my-3" />
          <SidebarItem icon={<LogOut size={20} onClick={handleSignOutClick} />} text="Sign Out"/>
        </Sidebar>
        <Content>
            <h1 className='font-bold text-xl mb-3 dark:text-neutral-50'>Dashboard</h1>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8"> 
                  <div className="flex flex-row items-center justify-center h-32 rounded-lg bg-gradient-to-r from-green-50 to-green-200 border-[1px] border-neutral-100 shadow-sm">
                    <div className='flex flex-col'>
                      <span className="text-xl font-semibold">Total: 4</span>
                      <span className="text-sm font-normal">All Bookings</span>
                    </div>
                    <ScrollText className="w-10 h-10 ml-10" />
                  </div>
                  <div className="flex flex-row items-center justify-center h-32 rounded-lg bg-gradient-to-r from-blue-50 to-blue-200 border-[1px] border-neutral-100 shadow-sm">
                    <div className='flex flex-col'>
                      <span className="text-xl font-semibold">Total: 7</span>
                      <span className="text-sm font-normal">Available Desks</span>
                    </div>
                    <MonitorCheck className="w-10 h-10 ml-10" />
                  </div>
                  <div className="flex flex-row items-center justify-center h-32 rounded-lg bg-gradient-to-r from-red-50 to-red-200 border-[1px] border-neutral-100 shadow-sm">
                    <div className='flex flex-col'>
                      <span className="text-xl font-semibold">Total: 3</span>
                      <span className="text-sm font-normal">Unavailable Desks</span>
                    </div>
                    <MonitorX className="w-10 h-10 md:ml-10 sm:ml-5" />
                  </div>
                  <div className="flex flex-row items-center justify-center h-32 rounded-lg bg-gradient-to-r from-yellow-50 to-yellow-200 border-[1px] border-neutral-100 shadow-sm">
                    <div className='flex flex-col'>
                      <span className="text-xl font-semibold">Total: 10</span>
                      <span className="text-sm font-normal">All Desks</span>
                    </div>
                    <GalleryVerticalEnd className="w-10 h-10 ml-10" />
                  </div>
                </div>
        </Content>
      </SidebarProvider>
    </div>
    </>
  )
}

export default SADashboard