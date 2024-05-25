import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar, { SidebarItem, SidebarProvider, Content } from '../components/Sidebar';
import { LayoutDashboard, Layers, BookCopy, LifeBuoy, Settings, LogOut, FileCog } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Booking = () => {

  const navigate = useNavigate();

  const handleSignOutClick = () => {
    navigate('/login');
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };
  const handleManageBookingClick = () => {
    navigate('/managebooking');
  }

  const tableItems = [
    {
      desk_id: 1,
      area: "Left Wing",
      status: "Pending",
    }
  ];

  return (
    <>
      <Header />
      <div className="flex dark:bg-neutral-900">
        <SidebarProvider>
          <Sidebar>
            <SidebarItem icon={<LayoutDashboard size={20} onClick={handleDashboardClick} />} text="Dashboard" />
            <SidebarItem icon={<BookCopy size={20} />} text="Booking" active />
            <SidebarItem icon={<Layers size={20} onClick={handleManageBookingClick} />} text="Manage Bookings" />
            <hr className="my-3" />
            <SidebarItem icon={<Settings size={20} />} text="Settings" />
            <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
            <hr className="my-3" />
            <SidebarItem icon={<LogOut size={20} onClick={handleSignOutClick} />} text="Sign Out" />
          </Sidebar>
          <Content>
            <h1 className='font-bold text-xl mb-3 dark:text-neutral-50'>Bookings</h1>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-1 lg:gap-8">
              <div className="flex flex-row items-center justify-center h-32 rounded-lg bg-gradient-to-r from-orange-50 to-orange-200 border-[1px] border-neutral-100 shadow-sm">
                <div className='flex flex-col'>
                  <span className="text-xl font-semibold">Total: 0</span>
                  <span className="text-sm font-normal">Pending Books</span>
                </div>
                <FileCog className="w-10 h-10 ml-10" />
              </div>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 -mt-2">
                <div className="border-[1px] border-neutral-100 rounded-lg shadow-sm bg-white lg:col-span-2 p-5">

                </div>
                <div className="border-[1px] border-neutral-100 rounded-lg shadow-sm bg-white p-5">
                <div className="overflow-x-auto">
                      <table className="w-full table-auto">
                        <thead className="text-gray-900 font-medium text-lg border-b text-center">
                          <tr>
                            <th className="py-3 pr-6">ID</th>
                            <th className="py-3 pr-6">Area</th>
                            <th className="py-3 pr-6">Status</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-600 divide-y text-center text-sm">
                          {
                            tableItems.map((item, idx) => (
                              <tr key={idx}>
                                <td className="pr-6 py-4 whitespace-nowrap">{item.desk_id}</td>
                                <td className="pr-6 py-4 whitespace-nowrap">{item.area}</td>
                                <td className="pr-6 py-4 whitespace-nowrap">
                                  <span className={`px-3 py-2 rounded-full font-semibold text-xs ${item.status === "Active" ? "text-green-600 bg-green-50" : "text-blue-600 bg-blue-50"}`}>
                                    {item.status}
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
            </div>
          </Content>
        </SidebarProvider>
      </div>
    </>
  );
};

export default Booking;
