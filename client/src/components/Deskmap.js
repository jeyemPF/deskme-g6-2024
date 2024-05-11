import React, { useState } from 'react';
import deskmap from '../assets/deskmap.png';

const ImageMapper = () => {
  const imageUrl = deskmap;
  const areas = [
    { desk: 1, top: 2, left: 18,   width: 9,   height: 16 }, 
    { desk: 2, top: 2, left: 27,   width: 9.5, height: 16 },
    { desk: 3, top: 2, left: 36.5, width: 9,   height: 16 },
    { desk: 4, top: 2, left: 45.5, width: 9.5, height: 16 },
    { desk: 5, top: 2, left: 55,   width: 9,   height: 16 },
    { desk: 6, top: 2, left: 64,   width: 9.5, height: 16 },
    { desk: 7, top: 2, left: 73.5, width: 9,   height: 16 },
  ];

  // State to track which area is being hovered over
  const [hoveredArea, setHoveredArea] = useState(null);

  // State for booking form
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    userId: '',
    deskId: '',
    date: '',
    startTime: '',
    endTime: '',
  });

  // Function to handle mouse enter event
  const handleMouseEnter = (index) => {
    setHoveredArea(index);
  };

  // Function to handle mouse leave event
  const handleMouseLeave = () => {
    setHoveredArea(null);
  };

  // Function to handle area click event
  const handleAreaClick = (desk) => {
    setBookingData({ ...bookingData, deskId: desk });
    setShowBookingForm(true);
  };

  // Function to handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Implement your form submission logic here
    console.log('Booking data:', bookingData);
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

  return (
    <div className="container mx-auto p-4 flex justify-center items-center">
      <div className="mr-8">
        <h1 className="text-2xl font-bold mb-4">DeskMe</h1>
        <div className="relative">
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
                backgroundColor: hoveredArea === index ? 'rgba(0, 128, 0, 0.3)' : 'transparent', // Change background color when area is hovered
              }}
              onMouseEnter={() => handleMouseEnter(index)} // Handle mouse enter event
              onMouseLeave={handleMouseLeave} // Handle mouse leave event
              onClick={() => handleAreaClick(area.desk)} // Pass desk value to the onClick function
            ></div>
          ))}
        </div>
      </div>
      {/* Render booking form if showBookingForm is true */}
      {showBookingForm && (
        <div className='border-2 rounded-xl w-[20%] h-[250px] '>
          <h2 className="text-lg font-semibold mb-2 mt-2">Booking Form</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-2">
              <label>User ID:</label>
              <input
                type="text"
                value={bookingData.userId}
                onChange={(e) => setBookingData({ ...bookingData, userId: e.target.value })}
              />
            </div>
            <div className="mb-2">
              <label>Desk ID: </label>
              <input
               type="text"
               value={bookingData.deskId} 
               onChange={(e) => setBookingData({ ...bookingData, deskId: e.target.value })}
              />
            </div>
            <div className="mb-2">
              <label>Date: </label>
              <input
                type="date"
                value={bookingData.date}
                onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
              />
            </div>
            <div className="mb-2">
              <label>Start Time: </label>
              <input
                type="time"
                value={bookingData.startTime}
                onChange={(e) => setBookingData({ ...bookingData, startTime: e.target.value })}
              />
            </div>
            <div className="mb-2">
              <label>End Time: </label>
              <input
                type="time"
                value={bookingData.endTime}
                onChange={(e) => setBookingData({ ...bookingData, endTime: e.target.value })}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ImageMapper;
