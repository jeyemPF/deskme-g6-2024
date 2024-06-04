import React, { useState } from 'react';
import axios from 'axios';

const AddUserModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: '',
    password: ''
  });
  const [error, setError] = useState('');

  const validRoles = ['admin', 'officemanager', 'user'];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validRoles.includes(formData.role)) {
      setError('Invalid role. Please enter a valid role: admin, officemanager, or user.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8800/api/users/authorized-user', formData);
      console.log(response.data);
      onClose(); // Close the modal on successful submission
      // Optionally, you can add a success message or refresh the users list
    } catch (error) {
      setError('Failed to add user. Please try again.'); // Set error message if submission fails
      console.error(error);
    }
  };

  const handleCancel = () => {
    onClose(); // Close the modal when cancel button is clicked
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${isOpen ? '' : 'hidden'}`}>
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Add User</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="mb-4 text-red-500">{error}</div>}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              onChange={handleChange}
              className="mt-1 p-2 pl-4 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150 ease-in-out"
              placeholder="Enter username"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              onChange={handleChange}
              className="mt-1 p-2 pl-4 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150 ease-in-out"
              placeholder="Enter Email Address"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <input
              type="text"
              id="role"
              onChange={handleChange}
              className="mt-1 p-2 pl-4 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150 ease-in-out"
              placeholder="Enter role"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={handleChange}
              className="mt-1 p-2 pl-4 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150 ease-in-out"
              placeholder="Enter password"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={handleCancel}
              className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
