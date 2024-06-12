import React, { useState } from 'react';
import Header from '../components/Header';
import deskmap from '../assets/deskmap.png';
import Desk1 from '../assets/Desk1.jpeg';
import Sidebar, { SidebarItem, SidebarProvider, Content } from '../components/Sidebar';
import { LayoutDashboard, Layers, BookCopy, LifeBuoy, Settings, LogOut, FileCog } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'antd';

const Booking = () => {
  const [hoveredArea, setHoveredArea] = useState(null);
  const [bookingData, setBookingData] = useState({
    userId: '',
    deskId: '',
    date: '',
    startTime: '',
    endTime: '',
  });
  const [emptyFields, setEmptyFields] = useState({
    deskId: false,
    date: false,
    startTime: false,
    endTime: false,
  });
  const [isAreaClicked, setIsAreaClicked] = useState(false);

  const imageUrl = deskmap;
  const areas = [
    { desk: 1, top: 2, left: 18, width: 9.5, height: 16 },
    { desk: 2, top: 2, left: 27, width: 9.5, height: 16 }, 
    { desk: 3, top: 2, left: 36.5, width: 9.5, height: 16 },
    { desk: 4, top: 2, left: 45.5, width: 9.5, height: 16 }, 
    { desk: 5, top: 2, left: 55, width: 9.5, height: 16 },
    { desk: 6, top: 2, left: 64, width: 9.5, height: 16 }, 
    { desk: 7, top: 2, left: 73.5, width: 9.5, height: 16 }, 
    { desk: 8, top: 34, left: 28, width: 8.5, height: 15 }, 
    { desk: 9, top: 34, left: 36.5, width: 8.5, height: 15 }, 
    { desk: 10, top: 34, left: 44.5, width: 8.5, height: 15 }, 
    { desk: 11, top: 34, left: 53, width: 8.5, height: 15 },
    { desk: 12, top: 34, left: 61, width: 8.5, height: 15 }, 
    { desk: 13, top: 48.5, left: 28, width: 8.5, height: 15 }, 
    { desk: 14, top: 48.5, left: 36.5, width: 8.5, height: 15 }, 
    { desk: 15, top: 48.5, left: 44.5, width: 8.5, height: 15 }, 
    { desk: 16, top: 48.5, left: 53, width: 8.5, height: 15 }, 
    { desk: 17, top: 48.5, left: 61, width: 8.5, height: 15 },
    { desk: 18, top: 81, left: 18, width: 9.5, height: 16 },
    { desk: 19, top: 81, left: 27, width: 9.5, height: 16 },
    { desk: 20, top: 81, left: 36, width: 9.5, height: 16 },
    { desk: 21, top: 81, left: 45.5, width: 9.5, height: 16 },
    { desk: 22, top: 81, left: 54.5, width: 9.5, height: 16 },
    { desk: 23, top: 81, left: 63.5, width: 9.5, height: 16 },
    { desk: 24, top: 81, left: 73, width: 9.5, height: 16 },
  ];
  const handleMouseEnter = (index) => {
    setHoveredArea(index);
  };

  const handleMouseLeave = () => {
    setHoveredArea(null);
  };

  const handleAreaClick = (desk) => {
    const selectedDeskDetails = {
      desk: desk,
      picture: deskmap, // Assuming 'Desk1' is replaced with the deskmap image
      amenities: ['Ergonomic chair', 'Monitor', 'Power outlets'],
    };
    setBookingData({ ...bookingData, deskId: desk });
    setIsAreaClicked(true);
  };

  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
  };

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
    },
    {
      desk_id: 2,
      area: "Right Wing",
      status: "Pending",
    }
  ];

  return (
    <>
      <Header />
      <div className="flex dark:bg-neutral-900">
        <SidebarProvider>
          <Sidebar>
            <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" onClick={handleDashboardClick} />
            <SidebarItem icon={<BookCopy size={20} />} text="Booking" active />
            <SidebarItem icon={<Layers size={20} />} text="Manage Bookings" onClick={handleManageBookingClick} />
            <hr className="my-3" />
            <SidebarItem icon={<Settings size={20} />} text="Settings" />
            <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
            <hr className="my-3" />
            <SidebarItem icon={<LogOut size={20} />} text="Sign Out" onClick={handleSignOutClick} />
          </Sidebar>
          <Content>
            <h1 className='font-bold text-xl mb-3 dark:text-neutral-50'>Bookings</h1>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-1 lg:gap-8">
              <div className="flex flex-row items-center justify-center h-32 rounded-lg bg-gradient-to-r from-orange-50 to-orange-200 border-[1px] border-neutral-100 shadow-sm">
                <div className='flex flex-col'>
                  <span className="text-xl font-semibold">Total: 2</span>
                  <span className="text-sm font-normal">Pending Books</span>
                </div>
                <FileCog className="w-10 h-10 ml-10" />
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-1 lg:gap-8 -mt-2">
              <div className="border-[1px] border-neutral-100 rounded-lg shadow-sm bg-white dark:bg-neutral-800 dark:border-neutral-700 p-5">
                 <div className="flex justify-end items-center w-full">
                  <label className="inline-flex items-center cursor-pointer">
                    <span className='font-normal pr-3 lg:text-base sm:text-sm dark:text-neutral-100'>Disable receipt :</span>
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
                      <table className="w-full table-auto">
                        <thead className="text-gray-900 dark:text-neutral-300 font-medium text-lg border-b text-center">
                          <tr>
                            <th className="py-3 pr-6">ID</th>
                            <th className="py-3 pr-6">Area</th>
                            <th className="py-3 pr-6">Status</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-600 dark:text-neutral-300 divide-y text-center text-sm">
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
                          className="inline-flex size-8 items-center justify-center rounded border dark:border-neutral-500 dark:bg-neutral-700 border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                        >
                          <span className="sr-only">Prev Page</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 dark:text-neutral-300"
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
                          className="block size-8 rounded dark:bg-neutral-300 dark:text-neutral-700 border-blue-600 bg-blue-600 text-center leading-8 text-white"
                        >
                          1
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="inline-flex size-8 items-center justify-center rounded border dark:border-neutral-500 dark:bg-neutral-700 border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                        >
                          <span className="sr-only">Next Page</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 dark:text-neutral-300"
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

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 -mt-2">
                <div className="border-[1px] border-neutral-100 rounded-lg shadow-sm bg-white dark:bg-neutral-800 dark:border-neutral-700 lg:col-span-2 p-5">
                <h1 className="lg:text-xl md:pl-2 sm:pl-0 font-bold mb-4 dark:text-neutral-100">Desk Map</h1>
                <div className="relative w-full">
                  <img src={imageUrl} alt="mapper" className="w-full dark:rounded" />
                  {areas.map((area, index) => (
                    <div
                      key={index}
                      className="absolute cursor-pointer"
                      style={{
                        top: `${area.top}%`,
                        left: `${area.left}%`,
                        width: `${area.width}%`,
                        height: `${area.height}%`,
                        backgroundColor: hoveredArea === index ? 'rgba(0, 128, 0, 0.3)' : 'transparent',
                      }}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleAreaClick(area.desk)}
                    ></div>
                  ))}
                </div>
                <h1 className="lg:text-xl md:pl-2 sm:pl-0 font-bold mt-4 mb-4 gap-4 dark:text-neutral-100">Note:</h1>
                <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700 md:ml-2 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="-ms-1 me-1.5 h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>

                    <p className="whitespace-nowrap text-sm">Available</p>
                  </span>

                  {/* Warning */}
                  <span
                    className="inline-flex items-center justify-center rounded-full bg-amber-100 px-2.5 py-0.5 text-amber-700 mr-3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="-ms-1 me-1.5 h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 9.75h4.875a2.625 2.625 0 010 5.25H12M8.25 9.75L10.5 7.5M8.25 9.75L10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z"
                      />
                    </svg>

                    <p className="whitespace-nowrap text-sm">Maintenance</p>
                  </span>

                  {/* Error */}
                  <span
                    className="inline-flex items-center justify-center rounded-full bg-red-100 px-2.5 py-0.5 text-red-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="-ms-1 me-1.5 h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                      />
                    </svg>

                    <p className="whitespace-nowrap text-sm">Unavailable</p>
                  </span>
                </div>
                
                <div className="border-[1px] border-neutral-100 rounded-lg shadow-sm bg-white dark:bg-neutral-800 dark:border-neutral-700 p-5">
                  <h1 className="lg:text-xl font-bold mb-4 dark:text-neutral-100">Details:</h1>
                  <div className="mb-5">
                    <img src={Desk1} className='rounded-md'/>
                  </div>
                  <div className="mb-5 flex flex-wrap">
                    <span className="whitespace-nowrap rounded-full bg-neutral-200 px-3 py-1 text-sm text-neutral-700 mr-3 mb-2">
                        Chair
                    </span>
                    <span className="whitespace-nowrap rounded-full bg-neutral-200 px-3 py-1 text-sm text-neutral-700 mr-3 mb-2">
                        Laptop
                    </span>
                    <span className="whitespace-nowrap rounded-full bg-neutral-200 px-3 py-1 text-sm text-neutral-700 mb-2">
                        Computer Table
                    </span>
                  </div>
                  <form>
                    <div className="mb-4 flex">
                      <div className="w-1/2 mr-2">
                        <label htmlFor="deskId" className="block text-sm font-medium text-gray-700 dark:text-neutral-100">Desk ID:</label>
                        <input
                          type="text"
                          id="deskId"
                          name="deskId"
                          readOnly="readonly"
                          value={bookingData.deskId}
                          onChange={(e) => setBookingData({ ...bookingData, deskId: e.target.value })}
                          className={`mt-1 p-2 border ${emptyFields.deskId ? 'border-red-500' : 'border-gray-300'} rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                          disabled="disableonly"
                        />
                      </div>
                      <div className="w-1/2 ml-2">
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-neutral-100">Date:</label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          value={bookingData.date}
                          onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                          className={`mt-1 p-2 border ${emptyFields.date ? 'border-red-500' : 'border-gray-300'} rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                          disabled={!isAreaClicked}
                        />
                      </div>
                    </div>
                    <div className="mb-10 flex">
                      <div className="w-1/2 mr-2">
                        <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 dark:text-neutral-100">Start Time:</label>
                        <input
                          type="time"
                          id="startTime"
                          name="startTime"
                          value={bookingData.startTime}
                          onChange={(e) => setBookingData({ ...bookingData, startTime: e.target.value })}
                          className={`mt-1 p-2 border ${emptyFields.startTime ? 'border-red-500' : 'border-gray-300'} rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                          disabled={!isAreaClicked}
                        />
                      </div>
                      <div className="w-1/2 ml-2">
                        <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 dark:text-neutral-100">End Time:</label>
                        <input
                          type="time"
                          id="endTime"
                          name="endTime"
                          value={bookingData.endTime}
                          onChange={(e) => setBookingData({ ...bookingData, endTime: e.target.value })}
                          className={`mt-1 p-2 border ${emptyFields.endTime ? 'border-red-500' : 'border-gray-300'} rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                          disabled={!isAreaClicked}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button type="button" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-normal py-2 px-4 rounded">Cancel</button>
                      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-normal py-2 px-4 rounded ml-2" disabled={!isAreaClicked}>Book</button>
                    </div>
                  </form>
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