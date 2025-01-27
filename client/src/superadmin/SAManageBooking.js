import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Layers, Users, BookCopy, Flag, Settings, LogOut, FileCog, ScrollText, NotebookTabs } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import Sidebar, { SidebarItem, SidebarProvider, Content } from '../components/Sidebar';
import Header from '../components/Header';
import useFetch from '../Hooks/useFetch';
import { Skeleton } from 'antd';
import axios from 'axios';
import { format } from 'date-fns';

const SAManageBooking = () => {

  const [reservationHistory, setReservationHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const desksPerPage = 5;
  const indexOfLastDesk = currentPage * desksPerPage;
  const indexOfFirstDesk = indexOfLastDesk - desksPerPage;
   // Filter out reservations with "APPROVED" and "PENDING" statuses
   const currentReservations = reservationHistory
   .filter(reservation => reservation.status !== "APPROVED" && reservation.status !== "PENDING")
   .slice(indexOfFirstDesk, indexOfLastDesk);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === Math.ceil(reservationHistory.length / desksPerPage);

  const nextPage = () => {
    if (!isLastPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (!isFirstPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  const totalPages = Math.ceil(reservationHistory.length / desksPerPage);

  const { data: reservationPendingData, loading: reservationPendingLoading, error: reservationPendingError } = useFetch("reservations/pending-counts");
  const { data: deskCountReservedData, loading: deskCountReservedLoading, error: deskCountReservedError } = useFetch("desks/count-reserved");

  const isLoading = reservationPendingLoading || deskCountReservedLoading;
  const isError = reservationPendingError || deskCountReservedError;

  

  useEffect(() => {
    const fetchReservationHistory = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/reservations/reservation-history`);
        setReservationHistory(response.data);
      } catch (error) {
        console.error('Error fetching reservation history:', error);
      }
    };
    fetchReservationHistory();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleManageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  const handleSignOutClick = () => {
    sessionStorage.removeItem('userCredentials');
    navigate('/login');
  };

  const handleBookingClick = () => {
    navigate('/superbooking');
  };

  const handleDashboardClick = () => {
    navigate('/superdashboard');
  };

  const handlePrivManageClick = () => {
    navigate('/superprivmanage');
  };

  const handleReportClick = () => {
    navigate('/superreports');
  };

  const handleAuditClick = () => {
    navigate('/superaudit');
  };

  const getStatusText = (backendStatus) => {
    switch (backendStatus) {
      case "COMPLETED":
        return "Done";
      case "ABORTED":
        return "Canceled";
      case "REJECTED":
        return "Expired";
      default:
        return backendStatus; // Fallback in case new statuses are added
    }
  };

  const getStatusStyle = (backendStatus) => {
    switch (backendStatus) {
      case "COMPLETED":
        return "text-green-600 bg-green-50";
      case "ABORTED":
        return "text-red-600 bg-red-50";
      case "REJECTED":
        return "text-yellow-600 bg-yellow-50";
      default:
        return "text-blue-600 bg-blue-50"; // Default style for unknown statuses
    }
  };

  return (
    <div className="h-screen dark:bg-neutral-900">
      <Header />
      <div className="flex dark:bg-neutral-900">
        <SidebarProvider>
          <Sidebar>
            <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" onClick={handleDashboardClick} />
            <SidebarItem icon={<BookCopy size={20} />} text="Booking" onClick={handleBookingClick} />
            <SidebarItem icon={<Layers size={20} />} text="Manage Bookings" active />
            <SidebarItem icon={<Users size={20} />} text="Manage Users" onClick={handlePrivManageClick} />
            <hr className="my-3" />
            <SidebarItem icon={<Flag size={20} />} text="Reports" onClick={handleReportClick} />
            <SidebarItem icon={<NotebookTabs size={20} />} text="Audit Trails" onClick={handleAuditClick} />
            <hr className="my-3" />
            <SidebarItem icon={<LogOut size={20} />} text="Sign Out" onClick={handleSignOutClick} />
          </Sidebar>
          <Content>
            <h1 className='font-bold text-xl mb-3 dark:text-neutral-50'>Manage Bookings</h1>

            {isLoading ? (
              <>
                <Skeleton height={120} count={4} />
              </>
            ) : isError ? (
              <div>Error: {reservationPendingError?.message || deskCountReservedError?.message}</div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
                  <div className="flex flex-row items-center justify-center h-32 rounded-lg bg-gradient-to-r from-green-50 to-green-200 border-[1px] border-neutral-100 shadow-sm">
                    <div className='flex flex-col'>
                      <span className="text-xl font-semibold">Total: {deskCountReservedData}</span>
                      <span className="text-sm font-normal">All Bookings</span>
                    </div>
                    <ScrollText className="w-10 h-10 ml-10" />
                  </div>
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
                <div className="flex justify-end items-center">
                  <div className="relative w-60 max-w-md">
                    <input
                      type="text"
                      className="w-full p-2 pr-10 pl-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150 ease-in-out"
                      placeholder="Search bookings"
                    />
                    <div className="absolute right-0 top-0 flex items-center h-full pr-4">
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                        />
                      </svg>
                    </div>
                  </div>
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
                      {currentReservations.map((reservation, index) => (
                        <tr key={index}>
                          <td className="pr-6 py-4 whitespace-nowrap">{reservation.desk.title}</td>
                          <td className="pr-6 py-4 whitespace-nowrap">{reservation.user.username}</td>
                          <td className="pr-6 py-4 whitespace-nowrap">{format(new Date(reservation.date), 'MMMM dd, yyyy')}</td>
                          <td className="pr-6 py-4 whitespace-nowrap">{format(new Date(reservation.startTime), 'hh:mm a')}</td>
                          <td className="pr-6 py-4 whitespace-nowrap">{format(new Date(reservation.endTime), 'hh:mm a')}</td>
                          <td className="pr-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-2 rounded-full font-semibold text-xs ${getStatusStyle(reservation.status)}`}>
                              {getStatusText(reservation.status)}
                            </span>
                          </td>
                          <td className="whitespace-nowrap text-center">
                            <button onClick={handleManageClick} className="py-1.5 px-3 text-gray-600 text-sm hover:text-gray-500 duration-150 hover:bg-gray-50 border rounded-lg">
                              Manage
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <ol className="flex justify-center gap-1 mt-5 text-xs font-medium">
                  <li>
                    <button
                      onClick={prevPage}
                      disabled={isFirstPage}
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
                    </button>
                  </li>

                  <li>
                    <span className="block size-8 rounded border-blue-600 bg-blue-600 text-center leading-8 text-white">
                      {currentPage}
                    </span>
                  </li>

                  <li>
                    <button
                      onClick={nextPage}
                      disabled={isLastPage}
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
                    </button>
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
            <h2 className="text-xl font-semibold mb-4">Manage Bookings</h2>
            <p className="mb-6">Do you want to delete or archive this booking?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCloseModal}
                className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 transition duration-200"
              >
                Delete
              </button>
              <button
                onClick={handleCloseModal}
                className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200"
              >
                Archive
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SAManageBooking;
