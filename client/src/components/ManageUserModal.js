import React from 'react';
import axios from 'axios';
import { message } from 'antd';

const ManageUserModal = ({ userId, handleCloseModal }) => {
  const handleConfirmDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8800/api/users/delete-user/${userId}`);
      console.log(`User with ID ${userId} deleted successfully`);
      handleCloseModal(); // Close the modal after deletion
      message.success("User deleted successfully")

      // Optionally, update the user list or provide feedback to the user
      window.location.reload(); // You can use a more efficient state update method
    } catch (error) {
      console.error(`There was an error deleting the user with ID ${userId}:`, error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Manage User</h2>
        <p className="mb-6">Do you want to delete this user?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleCloseModal}
            className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 transition duration-200"
          >
            Cancel
          </button>
          <button
              onClick={() => handleConfirmDelete(userId)}
              className="py-2 px-4 bg-red-600 text-white rounded-lg shadow hover:bg-red-500 focus:outline-none transition duration-150 ease-in-out"
            >
              Delete
            </button>



        </div>
      </div>
    </div>
  );
};

export default ManageUserModal;
