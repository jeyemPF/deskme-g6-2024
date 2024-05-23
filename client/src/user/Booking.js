import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar, { SidebarItem, SidebarProvider, Content } from '../components/Sidebar';
import { LayoutDashboard, Layers, BookCopy, LifeBuoy, Settings, LogOut, FileCog } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Booking = () => {

  const navigate = useNavigate();

  const handleSignOutClick = () => {
    navigate('/login');
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };
  const handleManageBookingClick = () => {
    navigate('/managebooking');
  }

  return (
    <>
      <Header />
      <div className="flex dark:bg-neutral-900">
        <SidebarProvider>
          <Sidebar>
            <SidebarItem icon={<LayoutDashboard size={20} onClick={handleDashboardClick} />} text="Dashboard" />
            <SidebarItem icon={<BookCopy size={20} />} text="Booking" active />
            <SidebarItem icon={<Layers size={20} onClick={handleManageBookingClick} />} text="Manage Bookings" />
            <hr className="my-3" />
            <SidebarItem icon={<Settings size={20} />} text="Settings" />
            <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
            <hr className="my-3" />
            <SidebarItem icon={<LogOut size={20} onClick={handleSignOutClick} />} text="Sign Out" />
          </Sidebar>
          <Content>
            <h1 className='font-bold text-xl mb-3 dark:text-neutral-50'>Bookings</h1>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-1 lg:gap-8">
              <div className="flex flex-row items-center justify-center h-32 rounded-lg bg-gradient-to-r from-orange-50 to-orange-200 border-[1px] border-neutral-100 shadow-sm">
                <div className='flex flex-col'>
                  <span className="text-xl font-semibold">Total: 0</span>
                  <span className="text-sm font-normal">Pending Books</span>
                </div>
                <FileCog className="w-10 h-10 ml-10" />
              </div>
            </div>
          </Content>
        </SidebarProvider>
      </div>
    </>
  );
};

export default Booking;
