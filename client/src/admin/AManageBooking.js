import React, { useState } from 'react';
import { LayoutDashboard, Layers, Flag, BookCopy, LifeBuoy, Settings, LogOut, FileCog, ScrollText } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import Sidebar, { SidebarItem, SidebarProvider, Content } from '../components/Sidebar';
import Header from '../components/Header';
import useFetch from '../Hooks/useFetch';

const AManageBooking = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleManageClick = () => {
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  const handleSignOutClick = () => {
    // Clear session storage
    sessionStorage.removeItem('userCredentials');
    localStorage.removeItem("userCredentials");
    localStorage.clear("userCredentials");
    sessionStorage.clear("userCredentials");



    // Navigate to login page
    navigate('/login');
  };

<<<<<<< HEAD
=======


>>>>>>> 57989d9c00565d66f242b7bc2c161b82ff954e69
  const handleBookingClick = () => {
    navigate('/adminbooking');
  };

  const handleDashboardClick = () => {
    navigate('/admindashboard');
  };

  const handleReportClick = () => {
    navigate('/adminreports');
  };

  const tableItems = [
    {
      reservation_id: 1,
      name: "Jireh Belen",
      reservation_date: "May 14, 2024",
      start_time: "1:00am",
      end_time: "1:00pm",
      status: "Done"
    },
    {
      reservation_id: 2,
      name: "Algen Rey Ubang",
      reservation_date: "May 22, 2024",
      start_time: "12:00pm",
      end_time: "9:00pm",
      status: "Cancelled"
    },
    {
      reservation_id: 3,
      name: "Mhayumie",
      reservation_date: "May 30, 2024",
      start_time: "11:00am",
      end_time: "6:00pm",
      status: "Cancelled"
    },
    {
      reservation_id: 4,
      name: "Lebron James",
      reservation_date: "June 1, 2024",
      start_time: "2:00am",
      end_time: "2:00pm",
      status: "Done"
    },
  ];

  const { data: reservationPendingData, loading: reservationPendingLoading, error: reservationPendingError } = useFetch('http://localhost:8800/api/reservations/pending-counts');
  const { data: reservationTotalData, loading: reservationTotalLoading, error: reservationTotalError } = useFetch('http://localhost:8800/api/reservations/count-reservation');

  const isLoading = reservationPendingLoading || reservationTotalLoading;
  const isError = reservationPendingError || reservationTotalError;

  return (
    <div className="h-screen dark:bg-neutral-900">
      <Header />
      <div className="flex dark:bg-neutral-900">
        <SidebarProvider>
          <Sidebar>
            <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" onClick={handleDashboardClick} />
            <SidebarItem icon={<BookCopy size={20} />} text="Booking" onClick={handleBookingClick} />
            <SidebarItem icon={<Layers size={20} />} text="Manage Bookings" active />
            <SidebarItem icon={<Flag size={20} />} text="Reports" onClick={handleReportClick} />
            <hr className="my-3" />
            <SidebarItem icon={<Settings size={20} />} text="Settings" />
            <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
            <hr className="my-3" />
            <SidebarItem icon={<LogOut size={20} />} text="Sign Out" onClick={handleSignOutClick} />
          </Sidebar>
          <Content>
            <h1 className='font-bold text-xl mb-3 dark:text-neutral-50'>Manage Bookings</h1>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
              <div className="flex flex-row items-center justify-center h-32 rounded-lg bg-gradient-to-r from-green-50 to-green-200 border-[1px] border-neutral-100 shadow-sm">
                <div className='flex flex-col'>
                  <span className="text-xl font-semibold">Total: {reservationTotalData}</span>
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
<<<<<<< HEAD
      )}
    </>
  );
};
=======
        )}
    </div>
  )
}
>>>>>>> 57989d9c00565d66f242b7bc2c161b82ff954e69

export default AManageBooking;