import React from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'
import Sidebar, { SidebarItem, SidebarProvider, Content } from '../components/Sidebar'
import { LayoutDashboard, Layers, Flag, BookCopy, Settings, LogOut, Users, NotebookTabs } from "lucide-react";

const SAAuditReport = () => {

    const tableItems2 = [
        {
            userId: 14151315151612,
            email: "johncarlodiga@student.laverdad.edu.ph",
            timestamp: "May 1, 2024 at 12:38pm",
            status: "Admin",
            action_type: "Login",
            ip_adress: "192.168.0.0.1"
    
        },
        {
            userId: 11314014810801,
            email: "johnmarkfaeldonia@student.laverdad.edu.ph",
            timestamp: "May 5, 2024 at 3:20pm",
            status: "Admin",
            action_type: "Logout",
            ip_adress: "192.168.0.100.1"
        },
      ];

    const navigate = useNavigate();

    const handleSignOutClick = () => {
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
      }
      const handleReportClick = () => {
        navigate('/superreports');
      };

  return (
    <>
    <Header />
    <div className="flex dark:bg-neutral-900">
    <SidebarProvider>
      <Sidebar>
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" onClick={handleDashboardClick} />
        <SidebarItem icon={<BookCopy size={20} />} text="Booking" onClick={handleBookingClick} />
        <SidebarItem icon={<Layers size={20} />} text="Manage Bookings" onClick={handleManageBookingClick} />
        <SidebarItem icon={<Users size={20} />} text="Manage Users" onClick={handlePrivManageClick} />
        <SidebarItem icon={<Flag size={20} />} text="Reports" onClick={handleReportClick} />
        <hr className="my-3" />
        <SidebarItem icon={<NotebookTabs size={20} />} text="Audit Trails" active/>
        <SidebarItem icon={<Settings size={20} />} text="Settings" />
        <hr className="my-3" />
        <SidebarItem icon={<LogOut size={20} />} text="Sign Out" onClick={handleSignOutClick} />
      </Sidebar>
      <Content>
        <h1 className='font-bold text-xl mb-3 dark:text-neutral-50'>Audit Trails</h1>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-1 lg:gap-8">
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
                            <th className="py-3 pr-6">UserId</th>
                            <th className="py-3 pr-6">Email</th>
                            <th className="py-3 pr-6">Roles</th>
                            <th className="py-3 pr-6">Action type</th>
                            <th className="py-3 pr-6">IP address</th>
                            <th className="py-3 pr-6">Date</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-600 divide-y text-center text-sm">
                          {
                            tableItems2.map((item, idx) => (
                              <tr key={idx}>
                                <td className="pr-6 py-4 whitespace-nowrap">{item.userId}</td>
                                <td className="pr-6 py-4 whitespace-nowrap">{item.email}</td>
                                <td className="pr-6 py-4 whitespace-nowrap">
                                  <span className={`px-3 py-2 rounded-full font-semibold text-xs ${item.status === "Active" ? "text-green-600 bg-green-50" : "text-blue-600 bg-blue-50"}`}>
                                    {item.status}
                                  </span>
                                </td>
                                <td className="pr-6 py-4 whitespace-nowrap">{item.action_type}</td>
                                <td className="pr-6 py-4 whitespace-nowrap">{item.ip_adress}</td>
                                <td className="pr-6 py-4 whitespace-nowrap">{item.timestamp}</td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
                    </div>
                </div>
                </Content>
        </SidebarProvider>
        </div>
    </>
  )
}

export default SAAuditReport