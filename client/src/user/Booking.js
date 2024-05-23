import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar, { SidebarItem, SidebarProvider, Content } from '../components/Sidebar';
import { LayoutDashboard, Layers, BookCopy, LifeBuoy, Settings, LogOut, FileCog } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { SidebarProvider, SidebarItem } from '../components/Sidebar';
import { LayoutDashboard, Calendar, Flag, LifeBuoy, Settings, LogOut } from "lucide-react";
import { useNavigate, useLocation } from 'react-router-dom';
import { Content } from '../components/Sidebar';
import deskmap from '../assets/deskmap.png';
import Desk1 from '../assets/Desk1.jpeg';
import { VscDebugContinue } from "react-icons/vsc";
import axios from 'axios';
import Modal from 'react-modal';

const Booking = () => {

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingMessage, setBookingMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredArea, setHoveredArea] = useState(null); // Define hoveredArea state
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
  const [showBookingForm, setShowBookingForm] = useState(false); // Define showBookingForm state
  const navigate = useNavigate();

  const location = useLocation();

  const handleSignOutClick = () => {
    navigate('/login');
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };
  const handleManageBookingClick = () => {
    navigate('/managebooking');
  }
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

    // Check for empty fields
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
      return; // Prevent form submission if there are empty fields
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

    // Reset form fields and hide the booking form
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
            </div>
          </Content>
        </SidebarProvider>
            )}
          </div>
        </Content>
      </div>
    </>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Reservation Message"
        className="bg-white p-6 rounded shadow-lg max-w-lg mx-auto my-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <div>
          <h2 className="text-xl font-bold mb-4">Reservation Status</h2>
          <p className="mb-4">{bookingMessage}</p>
          <button
            onClick={closeModal}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </Modal>
    </SidebarProvider>
  );
};

export default Booking;
