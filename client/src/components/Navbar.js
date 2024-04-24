import React, { useState } from 'react';
import Logo from '../assets/Logo.png';
import { BiMoon } from "react-icons/bi";
import { PiSunBold } from "react-icons/pi";
import { IoMenuSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { PiLockSimpleBold } from "react-icons/pi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Login');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  

  return (
    <div className={`bg-white ${isDarkMode ? 'dark' : ''}`}>
      <nav className="bg-white w-full start-0">
        <div className="flex flex-col-reverse items-center justify-between max-w-screen-navbar mx-auto">

          <div className="flex justify-end md:items-center sm:justify-between w-full navbar:w-auto gap-48">
          <img className="flex w-full max-w-60 p-5 lg:w-60 md:w-52 sm:w-32" src={Logo} alt="Logo" />

            <ul className="hidden navbar:flex gap-14 pt-1">
              <li className="font-bold">
                <a href="/" className="relative text-black hover:text-black transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-50">Home</a>
              </li>
              <li className="font-bold">
                <a href="/about" className="relative text-black hover:text-black transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-50">About us</a>
              </li>
              <li className="font-bold">
                <a href="/services" className="relative text-black hover:text-black transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-50">Services</a>
              </li>
              <li className="font-bold">
                <a href="/contact" className="relative text-black hover:text-black transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-50">Contact Us</a>
              </li>
            </ul>

            <div className="flex navbar:hidden">
              <button className="text-black text-2xl pt-1" onClick={toggleMenu}>
                <IoMenuSharp />
              </button>
            </div>

            <div className="hidden navbar:flex gap-2 lg:ml-auto">
              <button className="text-black text-xl" onClick={toggleDarkMode}>
                {isDarkMode ? <BiMoon /> : <PiSunBold />}
              </button>
              <p className=' text-2xl'>|</p>
              <button className="text-black text-xl"><PiLockSimpleBold /></button>
              <button onClick={handleClick} className="hidden md:block text-white bg-black font-bold rounded-lg border-2 border-black shadow-lg text-sm px-6 py-2.5 hover:bg-white hover:text-black transition-colors duration-300">Login</button>
            </div>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div className="navbar:hidden sm:bg-white sm:w-full sm:h-full sm:justify-center sm:items-center sm:pt-3 sm:pb-5 sm:border-b sm:border-black">
          <ul className="flex flex-col items-center">
            <li className="my-2 mx-4 font-bold">
              <a href="/" className="relative text-black hover:text-black transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-50">Home</a>
            </li>
            <li className="my-2 mx-4 font-bold">
              <a href="/about" className="relative text-black hover:text-black transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-50">About us</a>
            </li>
            <li className="my-2 mx-4 font-bold">
              <a href="/services" className="relative text-black hover:text-black transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-50">Services</a>
            </li>
            <li className="my-2 mx-4 font-bold">
              <a href="/contact" className="relative text-black hover:text-black transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-50">Contact Us</a>
            </li>
            <button onClick={handleClick} className="text-white bg-black font-bold rounded-lg border-2 border-black shadow-lg text-sm px-6 py-2.5 mt-2 hover:bg-white hover:text-black transition-colors duration-300">Login</button>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;