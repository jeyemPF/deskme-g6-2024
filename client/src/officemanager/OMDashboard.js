import React from 'react'
import { LayoutDashboard, Layers, Flag, BookCopy, LifeBuoy, Settings, LogOut, ScrollText, MonitorCheck, MonitorX, GalleryVerticalEnd } from "lucide-react";
import Sidebar, { SidebarItem, SidebarProvider, Content } from '../components/Sidebar'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'antd';
import useFetch from '../Hooks/useFetch';
import { Skeleton } from 'antd'



const OMDashboard = () => {
  const { data: availableDeskData, loading: availableDeskLoading, error: availableDeskError } = useFetch("reservations/available-desk");
  const { data: deskCountData, loading: deskCountLoading, error: deskCountError } = useFetch("desks/count");
  const { data: deskCountReservedData, loading: deskCountReservedLoading, error: deskCountReservedError } = useFetch("desks/count-reserved");
  const { data: deskCountUnavailableData, loading: deskCountUnavailableLoading, error: deskCountUnavailableError } = useFetch("desks/count-unavailable");



  const navigate = useNavigate();

  const handleSignOutClick = () => {
    // Clear session storage
    sessionStorage.removeItem('userCredentials');
  
    // Navigate to login page
    navigate('/login');
  };

  const handleBookingClick = () => {
    navigate('/officebooking');
  }
  const handleManageBookingClick = () => {
    navigate('/officemanagebooking');
  }
  
  const handleReportClick = () => {
    navigate('/officereports');
  }

  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  const isLoading = availableDeskLoading || deskCountLoading || deskCountUnavailableLoading || deskCountReservedLoading;
  const isError = availableDeskError || deskCountError || deskCountReservedError || deskCountUnavailableError;



  return (
    <div className="h-screen dark:bg-neutral-900">
      <Header />
      <div className="flex dark:bg-neutral-900">
      <SidebarProvider>
        <Sidebar>
          <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active />
          <SidebarItem icon={<BookCopy size={20} />} text="Booking" onClick={handleBookingClick} />
          <SidebarItem icon={<Layers size={20} />} text="Manage Bookings" onClick={handleManageBookingClick} />
          <hr className='my-3' />
          <SidebarItem icon={<Flag size={20} />} text="Reports" onClick={handleReportClick} />
          <hr className="my-3" />
          <SidebarItem icon={<LogOut size={20} />} text="Sign Out" onClick={handleSignOutClick} />
        </Sidebar>
        <Content>
                <h1 className='font-bold text-xl mb-3 dark:text-neutral-50'>Dashboard</h1>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8"> 
            
                {deskCountUnavailableLoading ? (
                      <Skeleton active paragraph={{ rows: 2 }} />
                    ) : (
                  <div className="flex flex-row items-center justify-center h-32 rounded-lg bg-gradient-to-r from-green-50 to-green-200 border-[1px] border-neutral-100 shadow-sm">
              
                      <div className='flex flex-col'>
                        <span className="text-xl font-semibold">Total: {deskCountReservedData}</span>
                        <span className="text-sm font-normal">All Bookings</span>
                      </div>
                   
                    <ScrollText className="w-10 h-10 ml-10" />
                  </div>
                )}

                {availableDeskLoading  ? (
                      <Skeleton active paragraph={{ rows: 2 }} />
                    ) : (
                  <div className="flex flex-row items-center justify-center h-32 rounded-lg bg-gradient-to-r from-blue-50 to-blue-200 border-[1px] border-neutral-100 shadow-sm">
                    <div className='flex flex-col'>
                      <span className="text-xl font-semibold">Total: {availableDeskData}</span>
                      <span className="text-sm font-normal">Available Desks</span>
                    </div>
                    <MonitorCheck className="w-10 h-10 ml-10" />
                  </div>
                )}
                { deskCountUnavailableLoading ? (
                      <Skeleton active paragraph={{ rows: 2 }} />
                    ) : (
                  <div className="flex flex-row items-center justify-center h-32 rounded-lg bg-gradient-to-r from-red-50 to-red-200 border-[1px] border-neutral-100 shadow-sm">
                    <div className='flex flex-col'>
                      <span className="text-xl font-semibold">Total: {deskCountUnavailableData}</span>
                      <span className="text-sm font-normal">Unavailable Desks</span>
                    </div>
                    <MonitorX className="w-10 h-10 md:ml-10 sm:ml-5" />
                  </div>
                    )}

                    {deskCountLoading ? (
                      <Skeleton active paragraph={{ rows: 2 }} />
                    ) : (
                  <div className="flex flex-row items-center justify-center h-32 rounded-lg bg-gradient-to-r from-yellow-50 to-yellow-200 border-[1px] border-neutral-100 shadow-sm">
                    <div className='flex flex-col'>
                      <span className="text-xl font-semibold">Total: {deskCountData}</span>
                      <span className="text-sm font-normal">All Desks</span>
                    </div>
                    <GalleryVerticalEnd className="w-10 h-10 ml-10" />
                  </div>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 mt-6">
                  <div className="border-[1px] border-neutral-100 rounded-lg shadow-sm bg-white">
                  <h1 className='md:pl-5 sm:pl-2 pt-2 font-semibold'>Calendar</h1>
                    <Calendar fullscreen={false} onPanelChange={onPanelChange} />
                  </div>
                  <div className="rounded-lg bg-white border-[1px] border-neutral-100 shadow-sm lg:col-span-2">
                  <h1 className='p-6 text-lg font-medium'>Statistics | Overview</h1>
                  <article className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6">
                    <div className="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>

                      <span className="text-xs font-medium"> 83.15% </span>
                    </div>

                    <div>
                      <strong className="block text-sm font-medium text-gray-500"> Users </strong>

                      <p>
                        <span className="text-2xl font-medium text-gray-900"> 11 </span>

                        <span className="text-xs text-gray-500"> from 1 </span>
                      </p>
                    </div>
                  </article>

                  <article className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6">
                  <div className="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>

                      <span className="text-xs font-medium"> 76.38% </span>
                    </div>

                    <div>
                      <strong className="block text-sm font-medium text-gray-500"> Bookings per day </strong>

                      <p>
                        <span className="text-2xl font-medium text-gray-900"> 10 </span>

                        <span className="text-xs text-gray-500"> from 1 </span>
                      </p>
                    </div>
                  </article>
                  </div>
                </div>
        </Content>
      </SidebarProvider>
      </div>
    </div>
  )
}

export default OMDashboard