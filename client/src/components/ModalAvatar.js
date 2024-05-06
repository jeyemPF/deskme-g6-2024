import React from 'react';

const ModalAvatar = ({ onClose, avatar }) => {
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      // Update the avatar image source with the uploaded file
      const avatarElement = document.querySelector('div.avatar img');
      avatarElement.src = reader.result;
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto bg-opacity-20 backdrop-blur-sm" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h2 className="text-lg font-medium text-gray-900 text-center">Customize Profile</h2>
            <form className="mt-4 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center justify-center w-24 h-24 rounded-full overflow-hidden border-2 border-black avatar mx-auto">
                  <img src={avatar} alt="Avatar" />
                </div>
              </div>
              <label htmlFor="avatar-upload" className="items-center justify-center text-sm text-gray-600 hover:text-gray-900 cursor-pointer">Change Avatar</label>
              <input type="file" id="avatar-upload" className="hidden" accept="image/*" onChange={handleAvatarChange} />
              <div className="mb-4 text-center">
                <label className="mt-2 block text-sm font-medium text-gray-700">Edit name:</label>
                <input type="text" className="border-[1px] border-black rounded-md p-2 mt-1 block w-full pl-5 text-sm text-gray-700 placeholder-gray-400" placeholder="Enter name:" />
              </div>
            </form>
          </div>
          <div className="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-neutral-500 text-base font-medium text-white hover:bg-neutral-400 hover:text-neutral-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => {
                // Add save changes logic here
                onClose();
              }}
            >
              Save Changes
            </button>
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-neutral-700 text-base font-medium text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-700 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAvatar;