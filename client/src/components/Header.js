import React, { useState } from 'react';
import { BellIcon } from '@heroicons/react/24/solid';
import Dropdown from './Dropdown';
import Switcher from '../components/Switcher';
import ModalAvatar from '../components/ModalAvatar';
import Logo from '../assets/Logo.png';
import jc from '../assets/jc.jpg';
import NotificationDropdown from './NotificationDropdown';

const Header = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);

  const handleCustomizeProfileClick = () => {
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  const toggleNotificationDropdown = () => {
    setIsNotificationDropdownOpen((prev) => !prev);
  };

  return (
    <div>
      <header className="dark:bg-neutral-900 w-screen fixed bg-white p-2 border-b-[1px] border-gray-200 dark:border-neutral-700 dark:shadow-neutral-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 pl-2">
            <img src={Logo} alt="Logo" className="h-9 w-9" />
            <h1 className='font-extrabold md:text-xl sm:text-lg cursor-pointer text-neutral-600 dark:text-neutral-100'>DESKME</h1>
          </div>
          <div className="flex items-center md:space-x-4 sm:space-x-2 flex-row-reverse relative">
            <div className="flex flex-col md:pr-2 sm:pr-0">
              <span className="md:text-sm sm:text-xs font-medium text-gray-700 dark:text-neutral-100 ml-3">John Carlo Diga</span>
              <span className="md:text-xs sm:text-xs text-gray-500 dark:text-neutral-400 ml-3">Specific Role</span>
            </div>
            <Dropdown>
              {[
                <button className="focus:outline-none">
                  <img
                    src={jc}
                    className="h-9 w-9 rounded-full border-2 border-neutral-500 dark:border-neutral-300 transition duration-300 transform hover:scale-110"
                  />
                </button>,
                [
                  'My Profile',
                ].map((item, index) => (
                  <a
                    key={index}
                    onClick={handleCustomizeProfileClick}
                    className="block text-sm hover:bg-gray-100 hover:text-gray-900 dark:hover:text-gray-900 dark:text-neutral-300 cursor-pointer"
                  >
                    {item}
                  </a>
                )),
              ]}
            </Dropdown>
            <div className="relative">
              <BellIcon
                className="h-7 w-7 text-neutral-600 rounded-full p-1 hover:bg-neutral-700 hover:text-white dark:text-neutral-100 dark:hover:bg-white dark:hover:text-neutral-700 cursor-pointer"
                onClick={toggleNotificationDropdown}
              />
              {isNotificationDropdownOpen && <NotificationDropdown />}
            </div>
            <button className="text-neutral-700"><Switcher /></button>
          </div>
        </div>
      </header>

      {isProfileModalOpen && (
        <ModalAvatar onClose={closeProfileModal}>
          {/* Add the content you want to show in the modal here */}
        </ModalAvatar>
      )}
    </div>
  );
};

export default Header;
