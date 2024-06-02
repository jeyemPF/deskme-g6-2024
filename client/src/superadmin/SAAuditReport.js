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
    sessionStorage.removeItem('userCredentials');
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

  return (
    <>
      <Header />
      <div className="flex dark:bg-neutral-900">
        <SidebarProvider>
          <Sidebar>
            <SidebarItem icon={<LayoutDashboard size={20} onClick={handleDashboardClick} />} text="Dashboard" />
            <SidebarItem icon={<BookCopy size={20} onClick={handleBookingClick} />} text="Booking" />
            <SidebarItem icon={<Layers size={20} onClick={handleManageBookingClick} />} text="Manage Bookings" />
            <SidebarItem icon={<Users size={20} onClick={handlePrivManageClick} />} text="Manage Roles" />
            <SidebarItem icon={<Flag size={20} onClick={handleReportClick} />} text="Reports" />
            <hr className="my-3" />
            <SidebarItem icon={<NotebookTabs size={20} />} text="Audit Trails" active />
            <SidebarItem icon={<Settings size={20} />} text="Settings" />
            <hr className="my-3" />
            <SidebarItem icon={<LogOut size={20} onClick={handleSignOutClick} />} text="Sign Out" />
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
                  {auditTrails.slice().reverse().map((item, idx) => (
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
            </div>
          </Content>
        </SidebarProvider>
      </div>
    </>
  );
}

export default SAAuditReport;
