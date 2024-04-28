import React, { useState } from 'react';
import { BellIcon, MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/solid'

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleNotificationsToggle = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  return (
    <header className="bg-gray-200">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <button className="text-gray-600 focus:outline-none">
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search..."
            className="bg-gray-100 ml-2 px-2 py-1 rounded-md focus:ring-0 focus:border-0 focus:bg-white"
          />
        </div>
        <div className="flex items-center">
          <button onClick={handleProfileToggle} className="text-gray-600 focus:outline-none">
            <UserCircleIcon className="h-5 w-5" />
          </button>
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Profile</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Settings</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Sign out</a>
              </div>
            </div>
          )}
          <button onClick={handleNotificationsToggle} className="text-gray-600 focus:outline-none">
            <BellIcon className="h-5 w-5" />
          </button>
          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Notification 1</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Notification 2</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Notification 3</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
