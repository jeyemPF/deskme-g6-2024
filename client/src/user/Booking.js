import React, { useState } from 'react';
import Header from '../components/Header';
import deskmap from '../assets/deskmap.png';
import Desk1 from '../assets/Desk1.jpeg';
import Sidebar, { SidebarItem, SidebarProvider, Content } from '../components/Sidebar';
import { LayoutDashboard, Layers, BookCopy, LifeBuoy, Settings, LogOut, FileCog } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'antd';
import { LayoutDashboard, Calendar, Flag, LifeBuoy, Settings, LogOut } from "lucide-react";
import { useNavigate, useLocation } from 'react-router-dom';
import deskmap from '../assets/deskmap.png';
import Desk1 from '../assets/Desk1.jpeg';
import { VscDebugContinue } from "react-icons/vsc";
import axios from 'axios';
import Modal from 'react-modal';

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
    sessionStorage.removeItem('userCredentials');
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
  }

  const isActive = (path) => {
    return location.pathname === path;
  }

  const imageUrl = deskmap;
  const areas = [
    { desk: 1, top: 2, left: 18, width: 9.5, height: 16 }, 
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
      picture: Desk1,
      amenities: ['Ergonomic chair', 'Monitor', 'Power outlets'],
    };
    setSelectedDesk(selectedDeskDetails);
    setShowBookingForm(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const emptyFieldsCopy = { ...emptyFields };
    let hasEmptyField = false;
    for (const key in bookingData) {
      if (!bookingData[key]) {
        emptyFieldsCopy[key] = true;
        hasEmptyField = true;
      } else {
        emptyFieldsCopy[key] = false;
      }
    }
    setEmptyFields(emptyFieldsCopy);

    if (hasEmptyField) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:8800/api/reservation', bookingData);

      if (response.status === 200) {
        setBookingMessage('Reservation successful');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setBookingMessage(error.response.data.message);
      } else {
        setBookingMessage('An error occurred. Please try again.');
      }
    } finally {
      setIsModalOpen(true);
    }

    setBookingData({
      userId: '',
      deskId: '',
      date: '',
      startTime: '',
      endTime: '',
    });
    setShowBookingForm(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
    <SidebarProvider>
      <div style={{ height: '100vh', overflowY: 'hidden' }}>
        <Header />
        <Sidebar>
          <SidebarItem icon={<LayoutDashboard size={20} onClick={handleDashboardClick} />} text="Dashboard" active={isActive('/dashboard')} />
          <SidebarItem icon={<Calendar size={20} />} text="Booking" active={isActive('/booking')} />
          <SidebarItem icon={<Flag size={20} />} text="Reporting" active={isActive('/reporting')} />
          <hr className="my-3" />
          <SidebarItem icon={<Settings size={20} />} text="Settings" active={isActive('/settings')} />
          <SidebarItem icon={<LifeBuoy size={20} />} text="Help" active={isActive('/help')} />
          <hr className="my-3" />
          <SidebarItem icon={<LogOut size={20} onClick={handleSignOutClick} />} text="Sign Out" />
        </Sidebar>
        <Content>
          <div className='flex'>
            <div className="mr-8">
              <h1 className="text-2xl ml-2 font-bold mb-4">DESKMAP</h1>
              <div className="relative mb-5">
                <img src={imageUrl} alt="mapper" className="w-auto" />
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
            </div>
            {selectedDesk && (
              <div className="p-4 border-2 border-gray-200 rounded-xl bg-white shadow-lg w-[25%] h-[380px] mt-14">
                <div className="mb-4">
                  <img src={selectedDesk.picture} alt={`Desk ${selectedDesk.desk}`} className="w-[100%] rounded-xl" />
                </div>
                <FileCog className="w-10 h-10 ml-10" />
                <div>
                  <div className='flex gap-40'>
                    <h3 className="text-lg font-bold mb-2">Equipment:</h3>
                    <button onClick={() => setShowBookingModal(true)} className="text-2xl">
                      <VscDebugContinue />
                    </button>
                  </div>
                  <ul className="list-disc pl-6">
                    {selectedDesk.amenities.map((amenity, index) => (
                      <li key={index} className="mb-2">{amenity}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-1 lg:gap-8 -mt-2">
              <div className="border-[1px] border-neutral-100 rounded-lg shadow-sm bg-white p-5">
                 <div className="flex justify-end items-center w-full">
                  <label className="inline-flex items-center cursor-pointer">
                    <span className='font-normal pr-3 lg:text-base sm:text-sm'>Disable receipt :</span>
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
            )}
            {showBookingModal && (
              <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
                <div className="bg-gray-100 bg-opacity-80 fixed top-0 left-0 w-full h-full flex justify-center items-center">
                  <div className="bg-white rounded-lg shadow-lg w-[50%] md:w-[40%] lg:w-[30%] xl:w-[25%]">
                    <div className="p-6">
                      <h2 className="text-xl font-bold mb-4">Booking Form</h2>
                      <form onSubmit={handleFormSubmit}>
                        <div className="mb-4">
                          <label htmlFor="userId" className="block text-sm font-medium text-gray-700">User ID</label>
                          <input
                            type="text"
                            id="userId"
                            name="userId"
                            value={bookingData.userId}
                            onChange={(e) => setBookingData({ ...bookingData, userId: e.target.value })}
                            className={`mt-1 p-2 border ${emptyFields.userId ? 'border-red-500' : 'border-gray-300'} rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="deskId" className="block text-sm font-medium text-gray-700">Desk ID</label>
                          <input
                            type="text"
                            id="deskId"
                            name="deskId"
                            value={bookingData.deskId}
                            onChange={(e) => setBookingData({ ...bookingData, deskId: e.target.value })}
                            className={`mt-1 p-2 border ${emptyFields.deskId ? 'border-red-500' : 'border-gray-300'} rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                          <input
                            type="date"
                            id="date"
                            name="date"
                            value={bookingData.date}
                            onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                            className={`mt-1 p-2 border ${emptyFields.date ? 'border-red-500' : 'border-gray-300'} rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time</label>
                          <input
                            type="time"
                            id="startTime"
                            name="startTime"
                            value={bookingData.startTime}
                            onChange={(e) => setBookingData({ ...bookingData, startTime: e.target.value })}
                            className={`mt-1 p-2 border ${emptyFields.startTime ? 'border-red-500' : 'border-gray-300'} rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time</label>
                          <input
                            type="time"
                            id="endTime"
                            name="endTime"
                            value={bookingData.endTime}
                            onChange={(e) => setBookingData({ ...bookingData, endTime: e.target.value })}
                            className={`mt-1 p-2 border ${emptyFields.endTime ? 'border-red-500' : 'border-gray-300'} rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                          />
                        </div>
                        <div className="flex justify-end">
                          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2">Book</button>
                          <button type="button" onClick={() => setShowBookingModal(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Cancel</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 -mt-2">
                <div className="border-[1px] border-neutral-100 rounded-lg shadow-sm bg-white lg:col-span-2 p-5">
                <h1 className="lg:text-xl md:pl-2 sm:pl-0 font-bold mb-4">Desk Map</h1>
                <div className="relative w-full">
                  <img src={imageUrl} alt="mapper" className="w-full" />
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
                <h1 className="lg:text-xl md:pl-2 sm:pl-0 font-bold mt-8 mb-4 gap-4">Note:</h1>
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
                
                <div className="border-[1px] border-neutral-100 rounded-lg shadow-sm bg-white p-5">
                  <h1 className="lg:text-xl font-bold mb-4">Details:</h1>
                  <div className="mb-4">
                    <img src={Desk1} className='rounded-md'/>
                  </div>
                  <form>
                    <div className="mb-4">
                      <label htmlFor="userId" className="block text-sm font-medium text-gray-700">User ID</label>
                      <input
                        type="text"
                        id="userId"
                        name="userId"
                        value={bookingData.userId}
                        onChange={(e) => setBookingData({ ...bookingData, userId: e.target.value })}
                        className={`mt-1 p-2 border ${emptyFields.userId ? 'border-red-500' : 'border-gray-300'} rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                        disabled={!isAreaClicked}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="deskId" className="block text-sm font-medium text-gray-700">Desk ID</label>
                      <input
                        type="text"
                        id="deskId"
                        name="deskId"
                        readonly="readonly"
                        value={bookingData.deskId}
                        onChange={(e) => setBookingData({ ...bookingData, deskId: e.target.value })}
                        className={`mt-1 p-2 border ${emptyFields.deskId ? 'border-red-500' : 'border-gray-300'} rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                        disabled="disableonly"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
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
                    <div className="mb-4">
                      <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time</label>
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
                    <div className="mb-4">
                      <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time</label>
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
            )}
          </div>
        </Content>
      </div>
    </SidebarProvider>
  );
};

export default Booking;