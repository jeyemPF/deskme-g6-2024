import React, { useState } from 'react';
import Logo from '../assets/Logo.png';
import { IoMenuSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { PiLockSimpleBold } from "react-icons/pi";
import Switcher from '../components/Switcher';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickH1 = () => {
    // Programmatically refresh the page
    location.reload();
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Login');
  };
  

  return (
    <div className="bg-white">
      <nav className="bg-white w-full start-0 dark:bg-neutral-900">
        <div className="flex flex-col-reverse items-center justify-between max-w-screen-navbar mx-auto">

          <div className="flex justify-end md:items-center sm:justify-between w-full navbar:w-auto gap-48">
          <h1 onClick={handleClickH1} className="flex w-full max-w-60 font-black lg:w-60 lg:p-12 lg:text-4xl md:w-52 md:p-8 md:text-2xl sm:w-32 sm:p-5 sm:text-xl cursor-pointer text-neutral-700 dark:text-neutral-300">DESKME</h1> 

            <ul className="hidden navbar:flex gap-14 pt-1">
              <li className="font-bold">
                <a href="/" className="relative text-neutral-700 hover:text-neutral-700 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-neutral-700 after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-50 dark:text-neutral-300 dark:transition-colors dark:duration-300 dark:after:absolute dark:after:bottom-0 dark:after:left-0 dark:after:w-full dark:after:h-0.5 dark:after:bg-neutral-300 dark:after:origin-left dark:after:scale-x-0 dark:after:transition-transform dark:after:duration-300 dark:hover:after:scale-x-50">Home</a>
              </li>
              <li className="font-bold">
                <a href="/about" className="relative text-neutral-700 hover:text-neutral-700 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-neutral-700after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-50 dark:text-neutral-300 dark:transition-colors dark:duration-300 dark:after:absolute dark:after:bottom-0 dark:after:left-0 dark:after:w-full dark:after:h-0.5 dark:after:bg-neutral-300 dark:after:origin-left dark:after:scale-x-0 dark:after:transition-transform dark:after:duration-300 dark:hover:after:scale-x-50">About us</a>
              </li>
              <li className="font-bold">
                <a href="/services" className="relative text-neutral-700 hover:text-neutral-700 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-neutral-700 after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-50 dark:text-neutral-300 dark:transition-colors dark:duration-300 dark:after:absolute dark:after:bottom-0 dark:after:left-0 dark:after:w-full dark:after:h-0.5 dark:after:bg-neutral-300 dark:after:origin-left dark:after:scale-x-0 dark:after:transition-transform dark:after:duration-300 dark:hover:after:scale-x-50">Services</a>
              </li>
              <li className="font-bold">
                <a href="/contact" className="relative text-neutral-700 hover:text-neutral-700 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-neutral-700 after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-50 dark:text-neutral-300 dark:transition-colors dark:duration-300 dark:after:absolute dark:after:bottom-0 dark:after:left-0 dark:after:w-full dark:after:h-0.5 dark:after:bg-neutral-300 dark:after:origin-left dark:after:scale-x-0 dark:after:transition-transform dark:after:duration-300 dark:hover:after:scale-x-50">Contact Us</a>
              </li>
            </ul>

            <div className="flex navbar:hidden gap-1">
              <button className="text-neutral-700 text-xl pt-1"><Switcher /></button>
              <button className="text-neutral-700 text-2xl pt-1 dark:text-neutral-300" onClick={toggleMenu}>
                <IoMenuSharp />
              </button>
            </div>

            <div className="hidden navbar:flex gap-2 lg:ml-auto">
              <button className="text-neutral-700 text-xl">
              </button>
              <button className="text-neutral-700 text-2xl"><Switcher /></button>
              <p></p>
              <button onClick={handleClick} className="hidden md:block text-neutral-700 bg-white font-bold rounded-lg border-2 border-neutral-700 shadow-lg text-sm px-6 py-2.5 hover:bg-neutral-700 hover:text-white transition-colors duration-300 dark:text-neutral-300 dark:bg-neutral-900 dark:border-neutral-300 dark:hover:bg-neutral-300 dark:hover:text-neutral-700 dark:transition-colors dark:duration-300">Login</button>
            </div>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div className="navbar:hidden sm:bg-white sm:w-full sm:h-full sm:justify-center sm:items-center sm:pt-3 sm:pb-5 sm:border-b sm:border-black dark:bg-neutral-900 dark:border-white">
          <ul className="flex flex-col items-center">
            <li className="my-2 mx-4 font-bold">
              <a href="/" className="relative text-black hover:text-black transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-50 dark:text-white dark:transition-colors dark:duration-300 dark:after:absolute dark:after:bottom-0 dark:after:left-0 dark:after:w-full dark:after:h-0.5 dark:after:bg-white dark:after:origin-left dark:after:scale-x-0 dark:after:transition-transform dark:after:duration-300 dark:hover:after:scale-x-50">Home</a>
            </li>
            <li className="my-2 mx-4 font-bold">
              <a href="/about" className="relative text-black hover:text-black transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-50 dark:text-white dark:transition-colors dark:duration-300 dark:after:absolute dark:after:bottom-0 dark:after:left-0 dark:after:w-full dark:after:h-0.5 dark:after:bg-white dark:after:origin-left dark:after:scale-x-0 dark:after:transition-transform dark:after:duration-300 dark:hover:after:scale-x-50">About us</a>
            </li>
            <li className="my-2 mx-4 font-bold">
              <a href="/services" className="relative text-black hover:text-black transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-50 dark:text-white dark:transition-colors dark:duration-300 dark:after:absolute dark:after:bottom-0 dark:after:left-0 dark:after:w-full dark:after:h-0.5 dark:after:bg-white dark:after:origin-left dark:after:scale-x-0 dark:after:transition-transform dark:after:duration-300 dark:hover:after:scale-x-50">Services</a>
            </li>
            <li className="my-2 mx-4 font-bold">
              <a href="/contact" className="relative text-black hover:text-black transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-50 dark:text-white dark:transition-colors dark:duration-300 dark:after:absolute dark:after:bottom-0 dark:after:left-0 dark:after:w-full dark:after:h-0.5 dark:after:bg-white dark:after:origin-left dark:after:scale-x-0 dark:after:transition-transform dark:after:duration-300 dark:hover:after:scale-x-50">Contact Us</a>
            </li>
            <button onClick={handleClick} className="text-white bg-black font-bold rounded-lg border-2 border-black shadow-lg text-sm px-6 py-2.5 mt-2 hover:bg-white hover:text-black transition-colors duration-300 dark:text-black dark:bg-white dark:border-white dark:hover:bg-neutral-900 dark:hover:text-white dark:transition-colors dark:duration-300">Login</button>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;