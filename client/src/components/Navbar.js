import React, { useState } from 'react';
import { BiMoon } from "react-icons/bi";
import { GoLock } from 'react-icons/go';
import Logo from '../assets/Logo.png';
import { IoMenuSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white">
      <nav className="bg-white w-full start-0 pt-2">
        <div className="flex flex-col-reverse items-center justify-between max-w-screen-lg mx-auto py-4 ">
          <div className='h-[1px] w-[100%] bg-gray-300'></div>

          <div className="flex items-center justify-between w-full lg:w-auto gap-24">
            <img className="w-40" src={Logo} alt="Logo" />

            <ul className="hidden lg:flex gap-9">
              <li className="mx-4 font-bold">
                <a href="/" className="relative text-black hover:text-black transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-50">Home</a>
              </li>
              <li className="mx-4 font-bold">
                <a href="/about" className="relative text-black hover:text-black transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-50">About Us</a>
              </li>
              <li className="mx-4 font-bold">
                <a href="/services" className="relative text-black hover:text-black transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-50">Services</a>
              </li>
              <li className="mx-4 font-bold">
                <a href="/contact" className="relative text-black hover:text-black transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-50">Contact Us</a>
              </li>
            </ul>

            <div className="flex lg:hidden">
              <button className="text-gray-600 text-2xl" onClick={toggleMenu}>
                <IoMenuSharp />
              </button>
            </div>

            <div className="hidden lg:flex gap-2">
              <button className="text-black text-2xl"><BiMoon /></button>
              <p className=' text-2xl'>|</p>
              <button className="text-black text-2xl"><GoLock /></button>
              <button onClick={handleClick} className="hidden md:block text-white bg-black font-bold rounded-xl text-sm px-5 py-2.5">Login</button>
            </div>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div className="lg:hidden bg-gray-100 py-4 px-2 sm:bg-white sm:absolute sm:top-20 sm:w-full sm:h-full sm:justify-center">
          <ul className="flex flex-col items-center">
            <li className="my-2 mx-4 font-bold">Home</li>
            <li className="my-2 mx-4 font-bold">About Us</li>
            <li className="my-2 mx-4 font-bold">Services</li>
            <li className="my-2 mx-4 font-bold">Contact Us</li>
            <li className="my-2 mx-4 font-bold">Login</li>
          </ul>
        </div>
      )}

    </div>
  );
}

export default Navbar;