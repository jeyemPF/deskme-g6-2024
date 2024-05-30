import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
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
  }

  const handleDashboard = () => {
    navigate('/dashboard');
  }

  const isActive = (path) => {
    return location.pathname === path;
  }

  const imageUrl = deskmap;
  const areas = [
    { desk: 1, top: 13, left: 15.8, width: 4.5, height: 8.5 }, 
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
    <SidebarProvider>
      <div style={{ height: '100vh', overflowY: 'auto' }}>
        <Header />
        <Sidebar>
          <SidebarItem icon={<LayoutDashboard size={20} onClick={handleDashboard} />} text="Dashboard" active={isActive('/dashboard')} />
          <SidebarItem icon={<Calendar size={20} />} text="Booking" active={isActive('/booking')} />
          <SidebarItem icon={<Flag size={20} />} text="Reporting" active={isActive('/reporting')} />
          <hr className="my-3" />
          <SidebarItem icon={<Settings size={20} />} text="Settings" active={isActive('/settings')} />
          <SidebarItem icon={<LifeBuoy size={20} />} text="Help" active={isActive('/help')} />
          <hr className="my-3" />
          <SidebarItem icon={<LogOut size={20} onClick={handleSignOutClick} />} text="Sign Out" />
        </Sidebar>
        <Content>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
          <div className="h-32 rounded-lg inline-block">
                <img src={imageUrl} alt="mapper" className='w-auto'/>
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
            <div className=" rounded-lg mr-14 flex items-center justify-center">
                {selectedDesk ? (
                  <div className=" mt-2 p-4 border-2 border-black  bg-slate-100 w-[100%] sm:mt-[60px] md:mt-[280px] 2xl:mt-0 xl:mt-0 lg:mt-0 rounded-xl shadow-lg">
                    <div className="mb-4">
                      <img src={selectedDesk.picture} alt={`Desk ${selectedDesk.desk}`} className=" w-[225px] rounded-xl" />
                    </div>
                    <div>
                      <div className='flex items-center justify-between'>
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
                ) : (
                  <div className=" mt-2 p-4 border-2 border-black bg-slate-100 rounded-xl bg-transparent sm:mt-[60px] md:mt-0 xl:mt-0 lg:mt-0 2xl:mt-0  h-[330px] w-[100%]">
                    {/* Placeholder or default background */}
                  </div>
                )}
            </div>
        </div>
        </Content>
      </div>
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
