  import React, { useState, useEffect } from 'react';
  import Header from '../components/Header'
  import Sidebar, { SidebarItem, SidebarProvider, Content } from '../components/Sidebar'
  import { LayoutDashboard, Layers, Flag, BookCopy, Settings, LogOut, Users, FileCog, NotebookTabs } from "lucide-react";
  import { useNavigate } from 'react-router-dom';
  import useFetch from '../Hooks/useFetch';
  import { Skeleton, message } from 'antd';
  import { format } from 'date-fns';
  import axios from 'axios';



  const SABooking = () => {

    const [reservationHistory, setReservationHistory] = useState([]); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOn, setIsOn] = useState(() => localStorage.getItem('isOn') === 'true'); // Set initial state from localStorage
    const [currentPage, setCurrentPage] = useState(1);
    const [reservation, setReservation] = useState([]);

    const desksPerPage = 8;
    const indexOfLastDesk = currentPage * desksPerPage;
    const indexOfFirstDesk = indexOfLastDesk - desksPerPage;
    const currentReservations = reservationHistory.slice(indexOfFirstDesk, indexOfLastDesk);

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === Math.ceil(reservation.length / desksPerPage);

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

    const totalPages = Math.ceil(reservation.length / desksPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }




    // 




    const navigate = useNavigate();


    const { data: reservationPendingData, loading: reservationPendingLoading, error: reservationPendingError } = useFetch("reservations/pending-counts");

    const isLoading = reservationPendingLoading;
    const isError = reservationPendingError;


    

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


    const handleToggle = async () => {
      try {
        // Make the API request
        const response = await axios.put(
          `${process.env.REACT_APP_API_URL}/api/switchs/switch-approve`,
          {},
          {}
        );

        // Log the response for debugging
        console.log('Response:', response.data);

        // Toggle the state if the request is successful
        const newValue = !isOn;
        setIsOn(newValue);
        localStorage.setItem('isOn', newValue.toString()); // Update localStorage with new value

        // Show success notification
        message.success('You have successfully approved/disapproved all reservation.');

      } catch (error) {
        console.error('Error toggling reservation emails:', error);
        // Show error notification
        message.error('Failed to toggle booking approval. Please try again later.');
      }
    };

    useEffect(() => {
      const storedValue = localStorage.getItem('isOn') === 'true';
      if (storedValue !== isOn) {
        setIsOn(storedValue);
      }
    }, [isOn]);



    const handleManageClick = () => {
      setIsModalOpen(true);
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
    
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
      <div className="h-screen dark:bg-neutral-900">
          <Header />
        <div className="flex dark:bg-neutral-900">
        <SidebarProvider>
          <Sidebar>
            <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" onClick={handleDashboardClick} />
            <SidebarItem icon={<BookCopy size={20} />} text="Booking" active />
            <SidebarItem icon={<Layers size={20} />} text="Manage Bookings" onClick={handleManageBookingClick} />
            <SidebarItem icon={<Users size={20} />} text="Manage Users" onClick={handlePrivManageClick} />
            <hr className="my-3" />
            <SidebarItem icon={<Flag size={20} />} text="Reports" onClick={handleReportClick}/>
            <SidebarItem icon={<NotebookTabs size={20} />} text="Audit Trails" onClick={handleAuditClick} />
            <hr className="my-3" />
            <SidebarItem icon={<LogOut size={20} />} text="Sign Out" onClick={handleSignOutClick} />
          </Sidebar>
          <Content>
          <h1 className='font-bold text-xl mb-3 dark:text-neutral-50'>Reservation</h1>
            { isLoading ? ( 
              <>
              <Skeleton height={120} count={4} />
              </>
              ) : isError ? (
                <div>Error: {reservationPendingError ?.message } </div>
              ) : (
                <>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-1 lg:gap-8">
            <div className="flex flex-row items-center justify-center h-32 rounded-lg bg-gradient-to-r from-orange-50 to-orange-200 border-[1px] border-neutral-100 dark:border-neutral-700 shadow-sm dark:bg-gradient-to-r dark:from-orange-900 dark:to-orange-700">
  <div className='flex flex-col'>
    <span className="text-xl font-semibold dark:text-neutral-50">Total: {reservationPendingData}</span>
    <span className="text-sm font-normal dark:text-neutral-300">Pending Books</span>
  </div>
  <FileCog className="w-10 h-10 ml-10" />
</div>

            </div>
            </>
            )}
              <div className="grid grid-cols-1 gap-4 lg:grid-cols mt-6 ">
                <div className="rounded-lg  dark:bg-neutral-800 p-5 border-[1px] border-neutral-100 shadow-sm mt-6 lg:col-span-2 dark:border-neutral-700">
                  <div className="flex justify-end items-center w-full">
                    <label className="inline-flex items-center cursor-pointer">
                      <span className='font-normal pr-3 dark:text-gray-300 '>Auto accept :</span>
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
                          <th className="py-3 pr-6 dark:text-neutral-200">Desk</th>
                          <th className="py-3 pr-6 dark:text-neutral-200">Name</th>
                          <th className="py-3 pr-6 dark:text-neutral-200">Date</th>
                          <th className="py-3 pr-6 dark:text-neutral-200">Time-In</th>
                          <th className="py-3 pr-6 dark:text-neutral-200">Time-Out</th>
                          <th className="py-3 pr-6 dark:text-neutral-200 ">Status</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 divide-y text-center text-sm">
                      {currentReservations.map((reservation, index) => (
                          <tr key={index}>
                            <td className="pr-6 py-4 whitespace-nowrap dark:text-neutral-200 ">{reservation.desk.title}</td>
                            <td className="pr-6 py-4 whitespace-nowrap dark:text-neutral-200 ">{reservation.user.username}</td>
                            <td className="pr-6 py-4 whitespace-nowrap dark:text-neutral-200">{format(new Date(reservation.date), 'MMMM dd, yyyy')}</td>
                            <td className="pr-6 py-4 whitespace-nowrap dark:text-neutral-200">{format(new Date(reservation.startTime), 'hh:mm a')}</td>
                            <td className="pr-6 py-4 whitespace-nowrap dark:text-neutral-200">{format(new Date(reservation.endTime), 'hh:mm a')}</td>
                            <td className="pr-6 py-4 whitespace-nowrap dark:text-neutral-200">
                            <span className={`px-3 py-2 rounded-full font-semibold text-xs ${
                              reservation.status === "APPROVED" ? "text-purple-600 bg-purple-50 dark:text-purple-200 dark:bg-purple-600" :
                              reservation.status === "REJECTED" ? "text-red-600 bg-red-50 dark:text-red-200 dark:bg-red-600" :
                              reservation.status === "PENDING" ? "text-yellow-600 bg-yellow-50 dark:text-yellow-200 dark:bg-yellow-600" :
                              reservation.status === "ABORTED" ? "text-orange-600 bg-orange-50 dark:text-orange-200 dark:bg-orange-600" :
                              reservation.status === "STARTED" ? "text-blue-600 bg-blue-50 dark:text-blue-200 dark:bg-blue-600" :
                              reservation.status === "COMPLETED" ? "text-green-600 bg-green-50 dark:text-green-200 dark:bg-green-600" :
                              ""
                          }`}>
                            {reservation.status}
                          </span>


                            </td>
                            <td className="whitespace-nowrap text-center">
                              <button onClick={handleManageClick} className="py-1.5 px-3 text-gray-600 text-sm hover:text-gray-500 duration-150 dark:text-neutral-200 hover:bg-gray-50 border rounded-lg dark:border-neutral-700 ">
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

  export default SABooking