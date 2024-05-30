import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar, { SidebarItem, SidebarProvider, Content } from '../components/Sidebar';
import { LayoutDashboard, Calendar, Flag, LifeBuoy, Settings, LogOut } from "lucide-react";
import { useNavigate, useLocation } from 'react-router-dom';
import deskmap from '../assets/deskmap.png';
import Desk1 from '../assets/Desk1.jpeg';
import { VscDebugContinue } from "react-icons/vsc";
import axios from 'axios';
import Modal from 'react-modal';

const Booking = () => {

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingMessage, setBookingMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    endTime: false
  });
  const [selectedDesk, setSelectedDesk] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();

  const handleSignOutClick = () => {
    sessionStorage.removeItem('userCredentials');
    navigate('/login');
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
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
            )}
          </div>
        </Content>
      </div>
    </SidebarProvider>
  );
};

export default Booking;
