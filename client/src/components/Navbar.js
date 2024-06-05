import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Switcher from '../components/Switcher';
import Logo from '../assets/Logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState(false);

  const navigate = useNavigate();

  const navigation = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Services", path: "/services" },
    { title: "Contact Us", path: "/contact" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickH1 = () => {
    // Programmatically refresh the page
    location.reload();
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <nav className="bg-neutral-50 dark:bg-neutral-900 w-full md:static md:text-sm border-b-[1px] border-neutral-200 dark:border-neutral-400">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <a onClick={handleClickH1} className="flex items-center">
            <img
              className='cursor-pointer'
              onClick={handleClickH1}
              src={Logo}
              width={40}
              height={45}
              alt="Deskme Logo"
            />
            <h1 className="font-extrabold md:text-3xl sm:text-lg cursor-pointer text-neutral-700 dark:text-neutral-100 ml-2">DESKME</h1>
          </a>
          <div className="md:hidden">
            <button className="text-gray-500 dark:text-neutral-300 hover:text-gray-800"
                onClick={() => setState(!state)}
            >
              {state ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className={`flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? 'block' : 'hidden'}`}>
          <ul className="justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
            {navigation.map((item, idx) => (
              <li key={idx} className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-neutral-500">
                <button onClick={() => handleNavigation(item.path)} className="block">
                  {item.title}
                </button>
              </li>
            ))}
            <span className='hidden w-[0.5px] h-4 bg-gray-300 dark:bg-gray-400 md:block'></span>
            <div className='space-y-3 items-center gap-x-6 md:flex md:space-y-0'>
              <li>
                <button className="block py-3 text-center text-neutral-700 hover:text-neutral-950 border rounded-lg md:border-none">
                  <Switcher />
                </button>
              </li>
              <li>
                <button onClick={handleClick} className="block py-3 px-4 font-medium text-center text-white dark:text-black bg-neutral-900 dark:bg-neutral-300 hover:bg-neutral-700 dark:hover:bg-neutral-100 active:bg-neutral-700 dark:active:bg-neutral-100 active:shadow-none rounded shadow md:inline">
                  Sign in
                </button>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
