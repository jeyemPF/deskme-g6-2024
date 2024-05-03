import React, { useState } from 'react';
import Logo from '../assets/Logo.png';
import { IoMenuSharp } from 'react-icons/io5';
import desk1 from '../assets/desk1.avif';    
import desk2 from '../assets/desk2.avif';
import { PiShieldCheckBold } from "react-icons/pi";
import { PiUsersThreeBold } from "react-icons/pi";
import { PiFolderLockBold } from "react-icons/pi";
import { PiRocketFill } from "react-icons/pi";
import { PiBookBookmarkFill } from "react-icons/pi";
import { PiCloudArrowUpFill } from "react-icons/pi";
import { TbClockPlus } from "react-icons/tb";
import { MdOnlinePrediction } from "react-icons/md";
import { GoBook } from "react-icons/go";
import { BsCloudCheck } from "react-icons/bs";
import offer1 from '../assets/offer1.webp';
import offer2 from '../assets/offer2.webp';
import { IoIosArrowDown } from "react-icons/io";
import { RiQuestionMark } from "react-icons/ri";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import Switcher from '../components/Switcher';

function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Login');
  };

return (
  <div className='dark:bg-neutral-900'>
    <div className='container dark:bg-neutral-900'>
      <Navbar/>
          <div className=' flex flex-col xl:flex-row items-center'>
            <div className='w-full md:w-2/4y'>
              <h1 className='text-2xl xl:ml-32 xl:text-left sm:text-center sm:text-base sm:pt-12 sm:ml-0'>
                <span className='text-5xl text-neutral-700 font-extrabold leading-8 lg:text-5xl md:text-4xl sm:text-2xl dark:text-white'>Make every <i><span className='font-black text-neutral-700 dark:text-white'>click count.</span></i></span>
                <p className='font-normal text-neutral-700 text-lg pt-1 leading-5 lg:text-lg md:text-base sm:text-xs dark:text-neutral-300'>
                DeskMe is built to elevate individuals, providing a seamless <br /> intersection where booking meets brilliance,  empowering <br /> users to thrive through the power of connection <br /> and convenience.
                </p>
                <button onClick={handleClick} className='text-neutral-700 bg-white font-semibold text-lg rounded-lg border-2 border-neutral-700 shadow-lg hover:bg-neutral-700 hover:text-white transition-colors duration-300 mt-3 md:mx-auto md:px-7 md:py-3 sm:px-5 sm:py-2 dark:text-neutral-300 dark:bg-neutral-900 dark:border-neutral-300 dark:hover:bg-neutral-300 dark:hover:text-neutral-700 dark:transition-colors dark:duration-300'>Book Now</button>
              </h1>
            </div>

            <div className='flex items-center justify-center'>
              <div className='flex gap-4 mr-28'>
                <div className='pt-28'>
                  <img className='hidden xl:block lg:h-80 lg:w-96 rounded-xl border-2 border-neutral-700 shadow-xl transition duration-300 transform hover:scale-105 dark:border-neutral-300' src={desk1} alt="Desk 1"/>
                </div>
                <div className='pt-16'>
                  <img className='hidden xl:block lg:h-80 lg:w-96 rounded-xl border-2 border-neutral-700 shadow-xl transition duration-300 transform hover:scale-105 dark:border-neutral-300' src={desk2} alt="Desk 2"/>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-10 pt-20 flex-wrap xs:flex-col text-neutral-700 dark:text-neutral-300">
            <div className="flex items-center mb-10 sm:mb-3 md:mb-10 xs:w-full xs:text-center">
              <p className="p-2 text-2xl xs:text-xl"><PiShieldCheckBold /></p>
              <p className="text-xl xs:text-base xs:block xs:mx-auto">|</p>
              <p className="ml-2 text-base sm:text-lg xs:text-sm font-semibold xs:mx-auto">Security</p>
            </div>
            <div className="flex items-center mb-10 sm:mb-3 md:mb-10 xs:w-full xs:text-center">
              <p className="p-2 text-2xl xs:text-xl"><PiUsersThreeBold /></p>
              <p className="text-xl xs:text-base xs:block xs:mx-auto">|</p>
              <p className="ml-2 text-base sm:text-lg xs:text-sm font-semibold xs:mx-auto">Friendly</p>
            </div>
            <div className="flex items-center sm:mb-3 md:mb-10 xs:w-full xs:text-center">
              <p className="p-2 text-2xl xs:text-xl"><PiFolderLockBold /></p>
              <p className="text-xl xs:text-base xs:block xs:mx-auto">|</p>
              <p className="ml-2 text-base sm:text-lg xs:text-sm font-semibold xs:mx-auto">Privacy</p>
            </div>
            <div className="flex items-center sm:mb-3 md:mb-10 xs:w-full xs:text-center">
              <p className="p-2 text-2xl xs:text-xl"><TbClockPlus /></p>
              <p className="text-xl xs:text-base xs:block xs:mx-auto">|</p>
              <p className="ml-2 text-base sm:text-lg xs:text-sm font-semibold xs:mx-auto">Efficient</p>
            </div>
            <div className='h-[1px] w-[80%] bg-neutral-700 dark:bg-neutral-300'></div>
          </div>

          <div className='container '>
            <div className='text-center'>
              <div className='text-4xl font-black pt-12 pb-5'>
                <h1 className='text-neutral-700 dark:text-white'>Reasons to choose DeskMe</h1>
              </div>

              <div className='text-xl pb-12 font-normal text-neutral-700 dark:text-neutral-300'>
                  <h1>Where booking becomes a breeze! Your easy pass to <br/> hassle-free reservations. Swift, seamless, and stress-free!</h1>
              </div>

              <div className='flex justify-center pb-10 md:flex-row sm:flex-col sm:items-center md:space-y-0 sm:space-y-4 xl:gap-28 lg:gap-10 md:gap-5'>
                <div className='flex flex-col justify-center items-center box-border h-64 w-64 p-4 border-2 rounded-xl text-neutral-700 border-neutral-700 shadow-lg dark:text-neutral-300 dark:border-neutral-300'>
                  <div className='text-7xl transition duration-300 transform hover:scale-105'><PiRocketFill /></div>
                  <div className='text-xl font-extrabold p-3 text-black-700 dark:text-white'>24/7 Online</div>
                  <div className='text-sm font-medium text-black-500'>
                    Round-the-clock excellence! We're here 24/7, because needs never sleep.
                  </div>
                </div>

                <div className='flex flex-col justify-center items-center box-border h-64 w-64 p-4 border-2 rounded-xl text-neutral-700 border-neutral-700 shadow-lg dark:text-neutral-300 dark:border-neutral-300'>
                  <div className='text-7xl transition duration-300 transform hover:scale-105'><PiBookBookmarkFill /></div>
                  <div className='text-xl font-extrabold p-3 text-black-700 dark:text-white'>Fast Booking</div>
                  <div className='text-sm font-medium text-black-500'>"Quick and easy! Fast booking, because your time matters."</div>
                </div>

                <div className='flex flex-col justify-center items-center box-border h-64 w-64 p-4 border-2 rounded-xl text-neutral-700 border-neutral-700 shadow-lg dark:text-neutral-300 dark:border-neutral-300'>
                  <div className='text-7xl transition duration-300 transform hover:scale-105'><PiCloudArrowUpFill /></div>
                  <div className='text-xl font-extrabold p-3 text-black-700 dark:text-white'>Cloud Storage</div>
                  <div className='text-sm font-medium text-black-500'>"Sky high storage, lightning-fast access your data's new home in the cloud!"</div>
                </div>
              </div>
            </div>
          </div>

          <div className='container'>
            <div className='flex lg:flex-row lg:justify-center lg:gap-16 pt-12 pb-12 sm:items-center sm:flex-col'>
              <div className='flex h-72 lg:w-[500px] md:h-72 md:w-[500px] sm:h-60 sm:w-[260px]'>
                  <img className='rounded-2xl border-2 border-neutral-700 shadow-xl dark:border-neutral-300' src={offer1} alt="Offer 1"/>
              </div>

              <div className='w-1/3'>
                  <h1 className='text-4xl font-black lg:pt-8 lg:pb-6 lg:text-left sm:text-center sm:pt-5 text-neutral-700 dark:text-white'>We Offer</h1>
                  <p className='text-xl lg:text-left lg:pt-0 sm:text-center sm:pt-5 text-neutral-700 dark:text-neutral-300'>Book with ease, experience with delight! Elevate your journey with our seamless booking where every click sparks satisfaction.Your great adventure starts here!</p>
              </div>
            </div>

            <div className='flex lg:flex-row lg:justify-center lg:gap-16 pb-12 sm:items-center sm:flex-col-reverse'>
              <div className='w-1/3'>
              <div className='flex items-center lg:justify-end justify-center w-full  '>  
                <h1 className='text-4xl font-black lg:pb-6 sm:text-center lg:pt-5 sm:pt-5 text-neutral-700 dark:text-white'>Innovative</h1></div>
                    <p className='text-xl lg:pt-0 lg:text-right sm:text-center sm:pt-5 text-neutral-700 dark:text-neutral-300'>Experience the future with our innovative system where simplicity meets sophistication. Redefining possibilities, one breakthrough at a time.</p>
              </div>

              <div className='flex h-72 lg:w-[500px] md:h-72 md:w-[500px] sm:h-60 sm:w-[260px]'>
                  <img className='rounded-2xl border-2 border-neutral-700 shadow-xl dark:border-neutral-300' src={offer2} alt="Offer 2"/>
              </div>
            </div>
          </div>

          <Footer/>
      </div>
    </div>
  );
}

export default Home;