import React, { useState } from 'react';
import axios from 'axios';
import {  message } from 'antd';


const ReservationForm = ({ selectedDesk, isAreaClicked, emptyFields }) => {
    const [bookingData, setBookingData] = useState({
      deskId: selectedDesk && selectedDesk._id ? selectedDesk._id : '',
      deskTitle: selectedDesk && selectedDesk.title ? selectedDesk.title : '',
      deskArea: selectedDesk && selectedDesk.area ? selectedDesk.area : '',
      date: '',
      startTime: '',
      endTime: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setBookingData({ ...bookingData, [name]: value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        // Make API request to book the desk
        const token = localStorage.getItem('token');
        const response = await axios.post(
          `http://localhost:8800/api/reservations/book/${selectedDesk._id}`, 
          bookingData,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            }
          }
        );
        console.log('Reservation successful:', response.data);
        message.success('Your book has been made.');
        
        // Reset form fields after successful booking
        setBookingData({
          deskId: selectedDesk && selectedDesk._id ? selectedDesk._id : '',
          deskTitle: selectedDesk && selectedDesk.title ? selectedDesk.title : '',
          deskArea: selectedDesk && selectedDesk.area ? selectedDesk.area : '',
          date: '',
          startTime: '',
          endTime: '',
        });
        // Handle any success UI updates or redirects here
      } catch (error) {
        if (error.response.status === 409) {
          // Desk is already reserved, display a message to the user
          setError('There is another reservation for this desk. Please select another desk.');
          message.error('There is another reservation for this desk. Please select another desk.');

        } else {
          // Other errors
          setError(error.response.data.message);
          message.error('Failed to create your book. Please select another desk.');
        }
      }
      setLoading(false);
    };
  
      

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 flex">
        <div className="w-1/2 mr-2">
          <label htmlFor="deskId" className="block text-sm font-medium text-gray-700">Desk ID:</label>
          <input
            type="text"
            id="deskId"
            name="deskId"
            readOnly
            value={selectedDesk && selectedDesk.title ? selectedDesk.title : ''}
            onChange={handleChange}
            className={`mt-1 p-2 border ${emptyFields.deskId ? 'border-red-500' : 'border-gray-300'} rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            disabled
          />
        </div>
        <div className="w-1/2 ml-2">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={bookingData.date}
            onChange={handleChange}
            className={`mt-1 p-2 border ${emptyFields.date ? 'border-red-500' : 'border-gray-300'} rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          />
        </div>
      </div>
      
      <div className="mb-10 flex">
        <div className="w-1/2 mr-2">
          <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time:</label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={bookingData.startTime}
            onChange={handleChange}
            className={`mt-1 p-2 border ${emptyFields.startTime ? 'border-red-500' : 'border-gray-300'} rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          />
        </div>
        <div className="w-1/2 ml-2">
          <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time:</label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            value={bookingData.endTime}
            onChange={handleChange}
            className={`mt-1 p-2 border ${emptyFields.endTime ? 'border-red-500' : 'border-gray-300'} rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button type="button" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-normal py-2 px-4 rounded">
          Cancel
        </button>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-normal py-2 px-4 rounded ml-2" disabled={loading}>
          {loading ? 'Booking...' : 'Book'}
        </button>
      </div>
    </form>
  );
};

export default ReservationForm;
