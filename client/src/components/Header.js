import React, { useState, useEffect } from 'react';
import { BellIcon } from '@heroicons/react/24/solid';
import Dropdown from './Dropdown';
import Switcher from '../components/Switcher';
import ModalAvatar from '../components/ModalAvatar';
import Logo from '../assets/Logo.png';

const Header = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [credentialsChanged, setCredentialsChanged] = useState(false);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    const fetchUserCredentials = () => {
      const storedCredentials = sessionStorage.getItem('userCredentials');
      if (storedCredentials) {
        const credentials = JSON.parse(storedCredentials);
        setRole(credentials.user.role);
        setAvatar(credentials.user.avatar);
        setUsername(credentials.user.username);
        setCredentialsChanged(false);
      }
    };

    fetchUserCredentials();

    const handleStorageChange = (event) => {
      if (event.key === 'userCredentials') {
        setCredentialsChanged(true);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [credentialsChanged]);

  const handleCustomizeProfileClick = () => {
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  const fetchUpdatedUser = async () => {
    try {
      const response = await fetch('http://localhost:8800/api/routes/users/avatar/self');
      if (response.ok) {
        const data = await response.json();
        setAvatar(data.user.avatar);
        setUsername(data.user.username);
        setAvatar(data.user.role);
      } else {
        console.error('Error fetching updated user information');
      }
    } catch (error) {
      console.error('Error fetching updated user information', error);
    }
  };

  const handleAvatarUpdate = (newAvatar, newUsername) => {
    setAvatar(newAvatar);
    setUsername(newUsername);
   
  };
  

  return (
    <div>
      <header className="dark:bg-neutral-900 w-screen fixed bg-white p-2 border-b-[1px] border-gray-200 dark:border-neutral-700 dark:shadow-neutral-800">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center space-x-4">
            <img src={Logo} alt="Logo" className="h-9 w-9" />
            <button className="text-black pt-1 ml-5"><Switcher /></button>
          </div>
          <div className="flex items-center space-x-4 flex-row-reverse">
            <div className="flex flex-col mr-2">
              <span className="text-sm font-medium text-gray-800 dark:text-neutral-300 ml-3">{username}</span>
              <span className="text-xs text-gray-500 dark:text-neutral-400 ml-3">{role && role.charAt(0).toUpperCase() + role.slice(1)}</span>
            </div>
            <Dropdown>
              {[
                <button className="focus:outline-none" onClick={() => setAvatar(avatar)}>
                  <img
                    src={avatar}
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
            <BellIcon className="h-8 w-8 text-neutral-700 rounded-full p-1 hover:bg-neutral-700 hover:text-white dark:text-neutral-300 dark:hover:bg-white dark:hover:text-neutral-700 cursor-pointer" />
          </div>
        </div>
      </header>

      {isProfileModalOpen && 
        <ModalAvatar 
            onClose={closeProfileModal} 
            avatar={avatar} 
            username={username} 
            role={role} 
            updateUser={fetchUpdatedUser} 
            onAvatarUpdate={handleAvatarUpdate}
         />}
    </div>
  );
};

export default Header;
