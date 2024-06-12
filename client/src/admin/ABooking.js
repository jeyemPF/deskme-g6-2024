import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar, { SidebarItem, SidebarProvider, Content } from '../components/Sidebar';
import { LayoutDashboard, Layers, Flag, BookCopy, LifeBuoy, Settings, LogOut, FileCog } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import useFetch from '../Hooks/useFetch';
import { Skeleton } from "antd";  
import axios from 'axios';
import { format } from 'date-fns';

const ITEMS_PER_PAGE = 10;

const ABooking = () => {
  const [reservationHistory, setReservationHistory] = useState([]);
  const [isOn, setIsOn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: reservationPendingData, loading: reservationPendingLoading, error: reservationPendingError } = useFetch('http://localhost:8800/api/reservations/pending-counts');

  const isLoading = reservationPendingLoading;
  const isError = reservationPendingError;

  useEffect(() => {
    const fetchReservationHistory = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/reservations/reservation-history');
        const sortedData = response.data.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort data by date in descending order
        setReservationHistory(sortedData);
      } catch (error) {
        console.error('Error fetching reservation history:', error);
      }
    };
    fetchReservationHistory();
  }, []);

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  const handleManageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  const handleSignOutClick = () => {
    sessionStorage.removeItem('userCredentials');
    localStorage.removeItem("userCredentials");
    localStorage.clear("userCredentials");
    sessionStorage.clear("userCredentials");

    navigate('/login');
  };

  const handleDashboardClick = () => {
    navigate('/admindashboard');
  };
  const handleManageBookingClick = () => {
    navigate('/adminmanagebooking');
  }
  const handleReportClick = () => {
    navigate('/adminreports');
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedReservations = reservationHistory.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(reservationHistory.length / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="h-screen dark:bg-neutral-900">
      <Header />
      <div className="flex dark:bg-neutral-900">
        <SidebarProvider>
          <Sidebar>
            <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" onClick={handleDashboardClick} />
            <SidebarItem icon={<BookCopy size={20} />} text="Booking" active />
            <SidebarItem icon={<Layers size={20} />} text="Manage Bookings" onClick={handleManageBookingClick} />
            <SidebarItem icon={<Flag size={20} />} text="Reports" onClick={handleReportClick} />
            <hr className="my-3" />
            <SidebarItem icon={<Settings size={20} />} text="Settings" />
            <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
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
              <div>Error: {reservationPendingError?.message}</div>
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
                        <th className="py-3 pr-6">Desk</th>
                        <th className="py-3 pr-6">Name</th>
                        <th className="py-3 pr-6">Date</th>
                        <th className="py-3 pr-6">Time-In</th>
                        <th className="py-3 pr-6">Time-Out</th>
                        <th className="py-3 pr-6">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y text-center text-sm">
                    {
                      paginatedReservations.map((reservation, index) => (
                        <tr key={index}>
                          <td className="pr-6 py-4 whitespace-nowrap">{reservation.desk.title}</td> {/* Desk title */}
                          <td className="pr-6 py-4 whitespace-nowrap">{reservation.user.username}</td>
                          <td className="pr-6 py-4 whitespace-nowrap">{format(new Date(reservation.date), 'MMMM dd, yyyy')}</td> {/* Format date */}
                          <td className="pr-6 py-4 whitespace-nowrap">{format(new Date(reservation.startTime), 'hh:mm a')}</td> {/* Format start time */}
                          <td className="pr-6 py-4 whitespace-nowrap">{format(new Date(reservation.endTime), 'hh:mm a')}</td> {/* Format end time */}
                          <td className="pr-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-2 rounded-full font-semibold text-xs ${reservation.status === "Active" ? "text-green-600 bg-green-50" : "text-blue-600 bg-blue-50"}`}>
                              {reservation.status}
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
                <div className="flex justify-center mt-5">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="px-3 py-1 mx-1 border rounded-lg hover:bg-gray-200"
                  >
                    Prev
                  </button>
                  {[...Array(totalPages).keys()].map((number) => (
                    <button
                      key={number}
                      onClick={() => setCurrentPage(number + 1)}
                      className={`px-3 py-1 mx-1 border rounded-lg hover:bg-gray-200 ${currentPage === number + 1 ? 'bg-blue-500 text-white' : ''}`}
                    >
                      {number + 1}
                    </button>
                  ))}
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 mx-1 border rounded-lg hover:bg-gray-200"
                  >
                    Next
                  </button>
                </div>
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
    </div>
  );
};

export default ABooking;
