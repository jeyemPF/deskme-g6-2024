import React, { useEffect, useState } from 'react';
import { LayoutDashboard, Layers, Flag, BookCopy, LifeBuoy, LogOut, ScrollText } from "lucide-react";
import Sidebar, { SidebarItem, SidebarProvider, Content } from '../components/Sidebar';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'antd';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [availableDesks, setAvailableDesks] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [desksPerPage] = useState(5);
  const [totalBookings, setTotalBookings] = useState(0); 
  const [searchQuery, setSearchQuery] = useState(""); 

  useEffect(() => {
    const fetchAvailableDesks = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/desks/get-desk-available/');
        setAvailableDesks(response.data);
        
      } catch (err) {
        setError(err.message);
        
      }
    };

    const fetchTotalBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
      
        // Debugging logs
        console.log('Token:', token);
        console.log('UserId:', userId);
      
        // Check if token and userId are present
        if (!token || !userId) {
          console.error('User is not authenticated');
          return;
        }
    
        const response = await axios.get(`http://localhost:8800/api/reservations/self-count-reservations/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });
    
        setTotalBookings(response.data.totalCount);
        
      } catch (err) {
        setError(err.message);
      }
    };
    

    fetchAvailableDesks();
    fetchTotalBookings();
  }, []);

  const handleSignOutClick = () => {
    sessionStorage.removeItem('userCredentials');
    sessionStorage.removeItem('userCredentials');
    localStorage.removeItem("userCredentials");
    localStorage.clear("userCredentials");
    sessionStorage.clear("userCredentials");
    navigate('/login');
  };

  const handleBookingClick = () => {
    navigate('/booking');
  };

  const handleMyBookingClick = () => {
    navigate('/mybooking');
  };

  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  const indexOfLastDesk = currentPage * desksPerPage;
  const indexOfFirstDesk = indexOfLastDesk - desksPerPage;
  
  // Filter desks based on search query
  const filteredDesks = availableDesks.filter(desk => 
    desk.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const currentDesks = filteredDesks.slice(indexOfFirstDesk, indexOfLastDesk);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === Math.ceil(filteredDesks.length / desksPerPage);

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

  const totalPages = Math.ceil(filteredDesks.length / desksPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <Header />
      <div className="flex dark:bg-neutral-900">
        <SidebarProvider>
          <Sidebar>
            <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active />
            <SidebarItem icon={<BookCopy size={20} />} text="Booking" onClick={handleBookingClick} />
            <SidebarItem icon={<Layers size={20} />} text="My Bookings" onClick={handleMyBookingClick} />
            <hr className="my-3" />
            <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
            <hr className="my-3" />
            <SidebarItem icon={<LogOut size={20} />} text="Sign Out" onClick={handleSignOutClick} />
          </Sidebar>
          <Content>
            <h1 className='font-bold text-xl mb-3 dark:text-neutral-50'>Dashboard</h1>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-1 lg:gap-8">
              <div className="flex flex-row items-center justify-center h-32 rounded-lg bg-gradient-to-r from-green-50 to-green-200 border-[1px] border-neutral-100 shadow-sm">
                <div className='flex flex-col'>
                  <span className="text-xl font-semibold">Total: {totalBookings}</span> {/* Display total bookings count */}
                  <span className="text-sm font-normal">Your Bookings</span>
                </div>
                <ScrollText className="w-10 h-10 ml-10" />

              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 mt-6">
              <div className="border-[1px] border-neutral-100 rounded-lg shadow-sm bg-white">
                <h1 className='md:pl-5 sm:pl-2 pt-2 font-semibold'>Calendar</h1>
                <Calendar fullscreen={false} onPanelChange={onPanelChange} />
              </div>
              <div className="rounded-lg bg-white border-[1px] border-neutral-100 shadow-sm lg:col-span-2 p-5">
                <div className="flex justify-between items-center">
                  <h1 className='font-semibold pl-4 text-lg'>Available Desks:</h1>
                  <div className="relative w-60 max-w-md">
                    <input
                      type="text"
                      className="w-full p-2 pr-10 pl-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150 ease-in-out"
                      placeholder="Search desks"
                      value={searchQuery} 
                      onChange={e => setSearchQuery(e.target.value)} 
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
                        <th className="py-3 pr-6">Name</th>
                        <th className="py-3 pr-6">Area</th>
                        <th className="py-3 pr-6">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y text-center text-sm">
                    {
                    currentDesks.map((desk, idx) => (
                      <tr key={idx}>
                      
                        <td className="pr-6 py-4 whitespace-nowrap">{desk.title}</td>
                        <td className="pr-6 py-4 whitespace-nowrap">{desk.area}</td>
                        <td className="pr-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-2 rounded-full font-semibold text-xs ${desk.status === "available" ? "text-green-600 bg-green-50" : "text-blue-600 bg-blue-50"}`}>
                            {desk.status}
                          </span>
                        </td>

                      </tr>
                    ))
                  }

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
    </>
  );
};

export default Dashboard;
