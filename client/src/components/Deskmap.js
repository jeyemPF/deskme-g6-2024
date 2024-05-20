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

    { desk: 8, top: 34, left: 28,  width: 8.5, height: 15 },
    { desk: 9, top: 34, left: 36,  width: 8.5, height: 15 },
    { desk: 10, top: 34, left: 44.5,  width: 8.5, height: 15 },
    { desk: 11, top: 34, left: 53,  width: 8.5, height: 15 },
    { desk: 12, top: 34, left: 61,  width: 8.5, height: 15 },
    { desk: 13, top: 48.5, left: 28,  width: 8.5, height: 15 },
    { desk: 14, top: 48.5, left: 36,  width: 8.5, height: 15 },
    { desk: 15, top: 48.5, left: 44.5,  width: 8.5, height: 15 },
    { desk: 16, top: 48.5, left: 53,  width: 8.5, height: 15 },
    { desk: 17, top: 48.5, left: 61,  width: 8.5, height: 15 },

    { desk: 18, top: 81, left: 17.5,   width: 9.5, height: 16 },
    { desk: 19, top: 81, left: 27,   width: 9.5,   height: 16 },
    { desk: 20, top: 81, left: 36,   width: 9.5,   height: 16 },
    { desk: 21, top: 81, left: 45,   width: 9.5,   height: 16 },
    { desk: 22, top: 81, left: 54.5,   width: 9.5, height: 16 },
    { desk: 23, top: 81, left: 64,   width: 9.5,   height: 16 },
    { desk: 24, top: 81, left: 73,   width: 9.5,   height: 16 },
  ];

  const [hoveredArea, setHoveredArea] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isDeskBooked, setIsDeskBooked] = useState(false);
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

  const handleMouseEnter = (index) => {
    setHoveredArea(index);
  };

  const handleMouseLeave = () => {
    setHoveredArea(null);
  };

  const handleAreaClick = (desk) => {
    setBookingData({ ...bookingData, deskId: desk });
    setShowBookingForm(true);
  };

  const handleFormSubmit = (e) => {
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

    // Form submission logic
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
    setIsDeskBooked(true);
  };

  const handleDateChange = (e) => {
    setBookingData({ ...bookingData, date: e.target.value });
  };

  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <div className='container mx-auto p-4 flex justify-center items-center md:flex-col lg:flex-row sm:flex-col 2xl:flex-row sm:ml-6 2xl:ml-0 xl:ml-0 md:ml-5 '>
      <div className="mr-8">
        <h1 className="text-2xl text-center font-bold mb-4">DESKMAP</h1>
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
      {showBookingForm && (
        <div className='border-2 py-5 border-black rounded-xl w-[25%] h-[500px] sm:w-[70%] sm:ml-8 md:ml-9 md:w-[70%] xl:w-[25%] lg:w-[25%]'>
          <h2 className="text-lg font-semibold text-center">Booking Form</h2>
          <form onSubmit={handleFormSubmit} className="px-8">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deskId">Desk no:</label>
              <input
                id="deskId"
                className="shadow appearance-none border text-center rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                type="text"
                value={bookingData.deskId} 
                onChange={(e) => setBookingData({ ...bookingData, deskId: e.target.value })}
                disabled={true}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">Date:</label>
              <input
                id="date"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${emptyFields.date ? 'border-red-500' : ''}`}
                type="date"
                value={bookingData.date}
                onChange={handleDateChange}
                min={currentDate}
              />
              {emptyFields.date && <p className="text-red-500 text-xs italic">Please fill this field</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startTime">Start Time:</label>
              <input
                id="startTime"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${emptyFields.startTime ? 'border-red-500' : ''}`}
                type="time"
                value={bookingData.startTime}
                onChange={(e) => setBookingData({ ...bookingData, startTime: e.target.value })}
              />
              {emptyFields.startTime && <p className="text-red-500 text-xs italic">Please fill this field</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endTime">End Time:</label>
              <input
                id="endTime"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${emptyFields.endTime ? 'border-red-500' : ''}`}
                type="time"
                value={bookingData.endTime}
                onChange={(e) => setBookingData({ ...bookingData, endTime: e.target.value })}
              />
              {emptyFields.endTime && <p className="text-red-500 text-xs italic">Please fill this field</p>}
            </div>
            <div className="flex justify-center">
              <button className='bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline' type="submit">
                Book
              </button>
            </div>
          </form>
        </div>
      )}
     {isDeskBooked && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-gray-800 bg-opacity-75 absolute inset-0"></div>
          <div className="bg-white rounded-lg p-8 relative">
            <p className="text-lg font-semibold text-center">Desk {bookingData.deskId} has been booked.</p>
            <button className="block mx-auto mt-4 bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline" onClick={() => setIsDeskBooked(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageMapper;
