import React, { useState } from 'react';
import Header from '../components/Header'
import Sidebar, { SidebarItem, SidebarProvider, Content } from '../components/Sidebar'
import { LayoutDashboard, Layers, Flag, BookCopy, Settings, LogOut, Users, FileCog, NotebookTabs } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import useFetch from '../Hooks/useFetch';
import { Skeleton } from 'antd';

const SABooking = () => {

  const { data: reservationPendingData, loading: reservationPendingLoading, error: reservationPendingError } = useFetch('http://localhost:8800/api/reservations/pending-counts');

  const isLoading = reservationPendingLoading;
  const isError = reservationPendingError;
    
    const [isOn, setIsOn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  const handleManageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const tableItems = [
    {
      reservation_id: 1,
      name: "Peter Sthanlie Rayos",
      reservation_date: "May 20, 2024",
      start_time: "4:00pm",
      end_time: "11:00pm",
      status: "Pending"
    },
    {
      reservation_id: 2,
      name: "John Carlo Diga",
      reservation_date: "May 26, 2024",
      start_time: "12:00pm",
      end_time: "9:00pm",
      status: "Pending"
    },
    {
      reservation_id: 3,
      name: "Johnmack Faeldonia",
      reservation_date: "May 31, 2024",
      start_time: "6:00am",
      end_time: "6:00pm",
      status: "Pending"
    },
    {
      reservation_id: 4,
      name: "Jayvee Brian Ibale",
      reservation_date: "June 3, 2024",
      start_time: "12:00am",
      end_time: "12:00pm",
      status: "Pending"
    },
  ];
    
  const navigate = useNavigate();

  const handleSignOutClick = () => {
    // Clear session storage
    sessionStorage.removeItem('userCredentials');
    // Navigate to login page
    navigate('/login');
  };

  const handleDashboardClick = () => {
    navigate('/superdashboard');
  };
  const handleManageBookingClick = () => {
    navigate('/supermanagebooking');
  }
  const handlePrivManageClick = () => {
    navigate('/superprivmanage');
  }
  const handleReportClick = () => {
    navigate('/superreports');
  };
  const handleAuditClick = () => {
    navigate('/superaudit');
  };

  return (
    <>
         <Header />
      <div className="flex dark:bg-neutral-900">
      <SidebarProvider>
        <Sidebar>
          <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" onClick={handleDashboardClick} />
          <SidebarItem icon={<BookCopy size={20} />} text="Booking" active />
          <SidebarItem icon={<Layers size={20} />} text="Manage Bookings" onClick={handleManageBookingClick} />
          <SidebarItem icon={<Users size={20} />} text="Manage Users" onClick={handlePrivManageClick} />
          <SidebarItem icon={<Flag size={20} />} text="Reports" onClick={handleReportClick}/>
          <hr className="my-3" />
          <SidebarItem icon={<NotebookTabs size={20} />} text="Audit Trails" onClick={handleAuditClick} />
          <SidebarItem icon={<Settings size={20} />} text="Settings" />
          <hr className="my-3" />
          <SidebarItem icon={<LogOut size={20} />} text="Sign Out" onClick={handleSignOutClick} />
        </Sidebar>
        <Content>
        <h1 className='font-bold text-xl mb-3 dark:text-neutral-50'>Bookings</h1>
          { isLoading ? ( 
            <>
            <Skeleton height={120} count={4} />
            </>
            ) : isError ? (
              <div>Error: {reservationPendingError ?.message } </div>
            ) : (
              <>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-1 lg:gap-8">
            <div className="flex flex-row items-center justify-center h-32 rounded-lg bg-gradient-to-r from-orange-50 to-orange-200 border-[1px] border-neutral-100 shadow-sm">
              <div className='flex flex-col'>
                <span className="text-xl font-semibold">Total: {reservationPendingData}</span>
                <span className="text-sm font-normal">Pending Books</span>
              </div>
              <FileCog className="w-10 h-10 ml-10" />
            </div>
          </div>
          </>
          )}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols mt-6">
              <div className="rounded-lg bg-white p-5 border-[1px] border-neutral-100 shadow-sm">
                <div className="flex justify-end items-center w-full">
                  <label className="inline-flex items-center cursor-pointer">
                    <span className='font-normal pr-3'>Auto accept :</span>
                    <input type="checkbox" className="sr-only" checked={isOn} onChange={handleToggle} />
                    <div className={`w-10 h-5 ${isOn ? 'bg-blue-600' : 'bg-gray-200'} rounded-full peer dark:bg-gray-700 shadow-md`}>
                      <div
                        className={`w-5 h-5 bg-white rounded-full shadow-md transform ${isOn ? 'translate-x-5' : 'translate-x-0'} transition-transform duration-300 ease-in-out`}
                      ></div>
                    </div>
                  </label>
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{isOn ? 'On' : 'Off'}</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full table-auto mt-2">
                    <thead className="text-gray-900 font-medium text-lg border-b text-center">
                      <tr>
                        <th className="py-3 pr-6">ID</th>
                        <th className="py-3 pr-6">Name</th>
                        <th className="py-3 pr-6">Date</th>
                        <th className="py-3 pr-6">Time-In</th>
                        <th className="py-3 pr-6">Time-Out</th>
                        <th className="py-3 pr-6">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y text-center text-sm">
                      {
                        tableItems.map((item, idx) => (
                          <tr key={idx}>
                            <td className="pr-6 py-4 whitespace-nowrap">{item.reservation_id}</td>
                            <td className="pr-6 py-4 whitespace-nowrap">{item.name}</td>
                            <td className="pr-6 py-4 whitespace-nowrap">{item.reservation_date}</td>
                            <td className="pr-6 py-4 whitespace-nowrap">{item.start_time}</td>
                            <td className="pr-6 py-4 whitespace-nowrap">{item.end_time}</td>
                            <td className="pr-6 py-4 whitespace-nowrap">
                              <span className={`px-3 py-2 rounded-full font-semibold text-xs ${item.status === "Active" ? "text-green-600 bg-green-50" : "text-blue-600 bg-blue-50"}`}>
                                {item.status}
                              </span>
                            </td>
                            <td className="whitespace-nowrap text-center">
                              <button onClick={handleManageClick} className="py-1.5 px-3 text-gray-600 text-sm hover:text-gray-500 duration-150 hover:bg-gray-50 border rounded-lg">
                                Manage
                              </button>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
                <ol className="flex justify-center gap-1 mt-5 text-xs font-medium">
                  <li>
                    <a
                      href="#"
                      className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                    >
                      <span className="sr-only">Prev Page</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="block size-8 rounded border-blue-600 bg-blue-600 text-center leading-8 text-white"
                    >
                      1
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                    >
                      <span className="sr-only">Next Page</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>
                </ol>
              </div>
            </div>
          </Content>
        </SidebarProvider>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Pending Books</h2>
            <p className="mb-6">Do you want to accept or decline this booking?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCloseModal}
                className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 transition duration-200"
              >
                Decline
              </button>
              <button
                onClick={handleCloseModal}
                className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SABooking