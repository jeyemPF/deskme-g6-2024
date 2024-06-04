import React from 'react';

const ManageUserModal = ({ handleCloseModal }) => {
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
            onClick={handleCloseModal}
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageUserModal;
