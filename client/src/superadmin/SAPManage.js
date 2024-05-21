import React, { useState } from 'react';
import { LayoutDashboard, Layers, Users, BookCopy, Settings, LogOut, Flag, NotebookTabs } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import Sidebar, { SidebarItem, SidebarProvider, Content } from '../components/Sidebar'
import Header from '../components/Header'

const SAPManage = () => {
const [isModalOpen, setIsModalOpen] = useState(false);
const [isModalOpen2, setIsModalOpen2] = useState(false);

const handleManageClick = () => {
    setIsModalOpen(true);
    };
const handleCloseModal = () => {
    setIsModalOpen(false);
    };

const handleManageClick2 = () => {
    setIsModalOpen2(true);
    };
const handleCloseModal2 = () => {
    setIsModalOpen2(false);
    };

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
  }
  const handleReportClick = () => {
    navigate('/superreports');
  };
  const handleAuditClick = () => {
    navigate('/superaudit');
  };

  const tableItems = [
    {
      reservation_id: 1,
      name: "Peter Sthanlie Rayos",
      status: "Superadmin"
    },
    {
      reservation_id: 2,
      name: "Algen Rey Ubang",
      status: "Office Manager"
    },
  ];

  return (
    <>
      <Header />
      <div className="flex dark:bg-neutral-900">
        <SidebarProvider>
          <Sidebar>
            <SidebarItem icon={<LayoutDashboard size={20} onClick={handleDashboardClick} />} text="Dashboard" />
            <SidebarItem icon={<BookCopy size={20} onClick={handleBookingClick} />} text="Booking" />
            <SidebarItem icon={<Layers size={20} onClick={handleManageBookingClick}/>} text="Manage Bookings" />
            <SidebarItem icon={<Users size={20} />} text="Manage Roles" active />
            <SidebarItem icon={<Flag size={20} onClick={handleReportClick} />} text="Reports" />
            <hr className="my-3" />
            <SidebarItem icon={<NotebookTabs size={20} onClick={handleAuditClick} />} text="Audit Trails"/>
            <SidebarItem icon={<Settings size={20} />} text="Settings" />
            <hr className="my-3" />
            <SidebarItem icon={<LogOut size={20} onClick={handleSignOutClick} />} text="Sign Out" />
          </Sidebar>
          <Content>
            <h1 className='font-bold text-xl mb-3 dark:text-neutral-50'>Manage Roles</h1>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-1 lg:gap-8">
              <div className="flex flex-row items-center justify-center h-32 rounded-lg bg-gradient-to-r from-pink-50 to-pink-200 border-[1px] border-neutral-100 shadow-sm">
                <div className='flex flex-col'>
                  <span className="text-xl font-semibold">Total: 2</span>
                  <span className="text-sm font-normal">Privelege Users</span>
                </div>
                <Users className="w-10 h-10 ml-10" />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-1 lg:gap-8 mt-6">
              <div className="rounded-lg bg-white p-5 border-[1px] border-neutral-100 shadow-sm">
              <div className="flex justify-end items-center">
                <button onClick={handleManageClick2} className="py-2 px-4 mr-5 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500 focus:outline-none transition duration-150 ease-in-out">
                    Add user
                </button>
                <div className="relative w-60 max-w-md">
                    <input
                    type="text"
                    className="w-full p-2 pr-10 pl-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150 ease-in-out"
                    placeholder="Search users"
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
                        <th className="py-3 pr-6">Roles</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y text-center text-sm">
                      {
                        tableItems.map((item, idx) => (
                          <tr key={idx}>
                            <td className="pr-6 py-4 whitespace-nowrap">{item.reservation_id}</td>
                            <td className="pr-6 py-4 whitespace-nowrap">{item.name}</td>
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
            <h2 className="text-xl font-semibold mb-4">Manage User</h2>
            <p className="mb-6">Do you want to delete this user?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCloseModal}
                className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleCloseModal}
                className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        )}
        {isModalOpen2 && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-11/12 max-w-md mx-auto">
              <h2 className="text-xl font-semibold mb-4">Add User</h2>
              <form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="mt-1 p-2 pl-4 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150 ease-in-out"
                    placeholder="Enter name"
                  />
                </div>
                <div className="mb-4 relative">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                    Role
                </label>
                <div className="relative">
                    <select
                    id="role"
                    className="mt-1 p-2 pl-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150 ease-in-out appearance-none pr-10"
                    >
                    <option value="superadmin">Superadmin</option>
                    <option value="admin">Admin</option>
                    <option value="office-manager">Office Manager</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg
                        className="h-5 w-5 mt-2 text-gray-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06 0L10 10.92l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0l-4.25-4.25a.75.75 0 010-1.06z"
                        clipRule="evenodd"
                        />
                    </svg>
                    </div>
                </div>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={handleCloseModal2}
                    className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 transition duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCloseModal2}
                    type="submit"
                    className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200"
                  >
                    Add User
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
    </>
  )
}

export default SAPManage