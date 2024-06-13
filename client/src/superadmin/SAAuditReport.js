import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar, { SidebarItem, SidebarProvider, Content } from '../components/Sidebar';
import { LayoutDashboard, Layers, Flag, BookCopy, Settings, LogOut, Users, NotebookTabs } from "lucide-react";

const SAAuditReport = () => {
  const [auditTrails, setAuditTrails] = useState([]);
  const [filters, setFilters] = useState({
    userId: '',
    actionType: '',
    startDate: '',
    endDate: '',
    email: '',
    roles: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchAuditTrails = async () => {
      try {
        const queryParams = new URLSearchParams(filters).toString();
        const response = await fetch(`http://localhost:8800/api/auditTrails/get-audit-trails?${queryParams}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAuditTrails(data);
      } catch (error) {
        console.error('There was a problem fetching the audit trails:', error);
      }
    };
    fetchAuditTrails();
  }, [filters]);

  const navigate = useNavigate();

  const handleSignOutClick = () => {
    // Clear session storage
    sessionStorage.removeItem('userCredentials');
  
    // Navigate to login page
    navigate('/login');
  };

  const handleBookingClick = () => {
    navigate('/superbooking');
  };

  const handleDashboardClick = () => {
    navigate('/superdashboard');
  };

  const handleManageBookingClick = () => {
    navigate('/supermanagebooking');
  };

  const handlePrivManageClick = () => {
    navigate('/superprivmanage');
  };

  const handleReportClick = () => {
    navigate('/superreports');
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  // Pagination
  const totalPages = Math.ceil(auditTrails.length / itemsPerPage);

  const handleClickPrev = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleClickNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleClickPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = auditTrails.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <Header />
      <div className="flex dark:bg-neutral-900">
        <SidebarProvider>
          <Sidebar>
            <SidebarItem icon={<LayoutDashboard size={20} onClick={handleDashboardClick} />} text="Dashboard" />
            <SidebarItem icon={<BookCopy size={20} />} text="Booking" onClick={handleBookingClick} />
          <SidebarItem icon={<Layers size={20} />} text="Manage Bookings" onClick={handleManageBookingClick} />
          <SidebarItem icon={<Users size={20} />} text="Manage Users" onClick={handlePrivManageClick} />
          <SidebarItem icon={<Flag size={20} />} text="Reports" onClick={handleReportClick}/>
          <hr className="my-3" />
          <SidebarItem icon={<NotebookTabs size={20} />} text="Audit Trails"/>
          <SidebarItem icon={<Settings size={20} />} text="Settings" />
          <hr className="my-3" />
          <SidebarItem icon={<LogOut size={20} />} text="Sign Out" onClick={handleSignOutClick} />
        </Sidebar>
          <Content>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-1 lg:gap-8 mt-6">
              <div className="flex flex-row items-center justify-center h-32 rounded-lg bg-gradient-to-r from-pink-50 to-pink-200 border-[1px] border-neutral-100 shadow-sm">
                <div className='flex flex-col'>
                  <span className="text-xl font-semibold">Audit Trails History</span>
                </div>
                <NotebookTabs className="w-10 h-10 ml-10" />
              </div>
            </div>
            <div className="rounded-lg bg-white p-5 border-[1px] border-neutral-100 shadow-sm mt-6 lg:col-span-2">
            <div className="overflow-x-auto">
    <table className="w-full table-auto mt-2">
      <thead className="text-gray-900 font-medium text-lg border-b text-center">
        <tr>
          <th className="py-3 pr-6">Email</th>
          <th className="py-3 pr-6">Roles</th>
          <th className="py-3 pr-6">Action type</th>
          <th className="py-3 pr-6">IP address</th>
          <th className="py-3 pr-6">Date</th>
        </tr>
      </thead>
      <tbody className="text-gray-600 divide-y text-center text-sm">
        {/* Reverse the order of items before mapping */}
        {currentItems.slice().map((item, idx) => (
          <tr key={idx}>
            <td className="pr-6 py-4 whitespace-nowrap">{item.userId ? item.userId.email : 'N/A'}</td>
            <td className="pr-6 py-4 whitespace-nowrap">{item.userId ? item.userId.role : 'N/A'}</td>
            <td className="pr-6 py-4 whitespace-nowrap">{item.actionType}</td>
            <td className="pr-6 py-4 whitespace-nowrap">{item.ipAddress}</td>
            <td className="pr-6 py-4 whitespace-nowrap">{new Date(item.timestamp).toLocaleDateString('en-PH', { month: 'long', day: 'numeric', year: 'numeric' })}, {new Date(item.timestamp).toLocaleTimeString('en-PH', { hour: 'numeric', minute: 'numeric' })}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
              {/* Pagination */}
              <div className="flex justify-center mt-4">
                <div className="inline-flex items-center justify-center rounded border border-gray-100 bg-white text-gray-900">
                  <button
                    className={`p-2 border-r ${currentPage === 1 ? 'inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180' : 'hover:bg-gray-200'}`}
                    onClick={handleClickPrev}
                  >
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
                  <span className="block size-8 rounded border-blue-600 bg-blue-600 text-center leading-8 text-white">{currentPage}</span>
                  <button
                    className={`p-2 border-l ${currentPage === totalPages ? 'inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180' : 'hover:bg-gray-200'}`}
                    onClick={handleClickNext}
                  >
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
                </div>
              </div>
            </div>
          </Content>
        </SidebarProvider>
      </div>
    </>
  );
}

export default SAAuditReport;
