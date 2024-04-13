import React, { useState } from 'react';
import Logo from '../assets/Logo.png';
import { IoMenuSharp } from 'react-icons/io5';
import desk1 from '../assets/desk1.avif';    
import desk2 from '../assets/desk2.avif';
import { GrShieldSecurity } from "react-icons/gr";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { TbClockPlus } from "react-icons/tb";
import { MdOnlinePrediction } from "react-icons/md";
import { GoBook } from "react-icons/go";
import { BsCloudCheck } from "react-icons/bs";
import offer1 from '../assets/offer1.webp';
import offer2 from '../assets/offer2.webp';
import { IoIosArrowDown } from "react-icons/io";
import { RiQuestionMark } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import { RiLinkedinLine } from "react-icons/ri";
import { PiFigmaLogoBold } from "react-icons/pi";
import { SiTailwindcss } from "react-icons/si";
import { BiLogoTypescript } from "react-icons/bi";
import { FaGithubSquare } from "react-icons/fa";
import Navbar from '../components/Navbar';

function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Navbar/>
       <div className='flex flex-col md:flex-row items-center px-4 md:px-12 lg:px-20 xl:px-36 pt-8 md:pt-12 pb-8 md:pb-14'>
        <div className='md:w-1/2'>
          <div className=''>
            <h1 className='text-2xl md:text-3xl lg:text-4xl'>
              <span className='text-[44px] font-bold'>Make every <i><span className='font-black'>click count.</span></i></span>
              <p className='font-normal md:text-lg lg:text-3xl mt-5'>"Book. Click. Thrive." <br/>Elevate with DeskMe where <br/>booking meets brilliance!</p>
            </h1>
            <button className='text-white mt-5 bg-black font-semibold rounded-lg text-sm px-5 py-2.5 md:px-6 md:py-3 lg:text-base lg:px-7 xl:text-lg xl:px-8 xl:py-4'>Book Now</button>
          </div>
        </div>

        <div className='md:w-1/2 md:flex hidden md:items-center md:justify-center pt-10 md:pt-0'>
          <div className='sm:flex flex-col md:flex-row md:gap-4'>
            <div className='md:pt-8 lg:pt-28'>
              <img className='h-48 md:h-64 lg:h-80 w-32 md:w-40 lg:w-48 rounded-xl border-2 border-black' src={desk1} alt="Desk 1"/>
            </div>
            <div className='md:pt-8 lg:pt-16'>
              <img className='h-48 md:h-64 lg:h-80 w-32 md:w-40 lg:w-48 rounded-xl border-2 border-black' src={desk2} alt="Desk 2"/> 
            </div>
          </div>
        </div>  
      </div>

      <div className="flex items-center sm:flex-row justify-center gap-10 pb-4">
      <div className="flex items-center  sm:mb-0">
        <p className="p-2 text-2xl sm:text-3xl"><GrShieldSecurity /></p>
        <p>|</p>
        <p className="ml-2 text-base sm:text-lg">Security</p>
      </div>
      <div className="flex items-center  sm:mb-0">
        <p className="p-2 text-2xl sm:text-3xl"><LiaUserFriendsSolid /></p>
        <p>|</p>
        <p className="ml-2 text-base sm:text-lg">Friendly</p>
      </div>
      <div className="flex items-center  sm:mb-0">
        <p className="p-2 text-2xl sm:text-3xl"><MdOutlinePrivacyTip /></p>
        <p>|</p>
        <p className="ml-2 text-base sm:text-lg">Privacy</p>
      </div>
      <div className="flex items-center">
        <p className="p-2 text-2xl sm:text-3xl"><TbClockPlus /></p>
        <p>|</p>
        <p className="ml-2 text-base sm:text-lg">Efficient</p>
      </div>
    </div>

    <div className='h-[1px] w-[80%] ml-36 bg-gray-300'></div>

    <div>
        <div className='text-center'>
            <div className='text-3xl md:text-4xl lg:text-5xl font-black pt-5 pb-2'>
              <h1>Reasons to choose DeskMe</h1>
            </div>

            <div className='text-lg md:text-xl lg:text-2xl pb-12 '>
                <h1>Where booking becomes a breeze! Your easy pass to <br/> hassle-free reservations. Swift, seamless, and stress-free!</h1>
            </div>

            <div className='flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-20 justify-center items-center pb-12 '>
                <div className='box-border h-48 md:h-64 w-48 md:w-64 p-4 border-2 rounded-2xl border-black'>
                  <div className='text-5xl md:text-8xl pl-10 md:pl-16'><MdOnlinePrediction /></div>
                  <div className='text-base md:text-xl font-bold'>24/7 Online</div>
                  <div className='font-semibold text-sm md:text-base'><h1>"Round-the-clock <br/>excellence! We're here 24/7, <br/>because needs never <br/>sleep."</h1></div>
                </div>

                <div className='box-border h-48 md:h-64 w-48 md:w-64 p-4 border-2 rounded-2xl border-black'>
                  <div className='text-5xl md:text-8xl pl-10 md:pl-16'><GoBook /></div>
                  <div className='text-base md:text-xl font-bold'>Fast Booking</div>
                  <div className='font-semibold text-sm md:text-base'><h1>"Quick and easy! Fast <br/>booking, because your<br/>time matters."</h1></div>
                </div>

                <div className='box-border h-48 md:h-64 w-48 md:w-64 p-4 border-2 rounded-2xl border-black'>
                  <div className='text-5xl md:text-8xl pl-10 md:pl-16'><BsCloudCheck /></div>
                  <div className='text-base md:text-xl font-bold'>Cloud Storage</div>
                  <div className='font-semibold text-sm md:text-base'><h1>"Sky high storage, <br/>lightning-fast access<br/>your data's new home <br/>in the cloud!"</h1></div>
                </div>

            </div>

            <div className='flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-20 pl-4 md:pl-12 xl:pl-48 pt-10'>
              <div className='h-96 w-[500px]'>
                  <img className='rounded-2xl border-2 border-black' src={offer1} alt="Offer 1"/>
              </div>

              <div className='w-full md:w-1/2 lg:w-1/3'>
                  <h1 className='text-3xl md:text-5xl font-black pt-8 pb-6'>We Offer</h1>
                  <p className='text-lg md:text-2xl'>Book with ease, experience with<br/>delight! Elevate your journey with<br/>our seamless booking - where<br/>every click sparks satisfaction.Your <br/> great adventure starts here!</p>
              </div>

            </div>

            <div className='flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-20 md:pl-12 xl:pl-48 '>
              <div className='w-full md:w-1/2 lg:w-1/3'>
                    <h1 className='text-3xl md:text-5xl font-black pt-8 pb-6 md:pb-10'>Innovative</h1>
                    <p className='text-lg md:text-2xl'>Experience the future with our<br/>innovative system where<br/>simplicity meets sophistication.<br/>Redefining possibilities, one<br/>breakthrough at a time.</p>
              </div>

              <div className='h-96 w-[500px]'>
                  <img className='rounded-2xl border-2 border-black' src={offer2} alt="Offer 2"/>
              </div>
            </div>
        </div>
    </div>

    <div className='h-[1px] w-[80%] ml-36 bg-gray-300'></div>

    <div>
      <div className='ml-40 pt-8'>
        <h1 className='text-5xl font-black pb-4'>Frequently asked questions</h1>
        <p className='text-2xl pb-6'>Got questions? Weve got answers! Check out our FAQ's for quick <br/>solutions and breeze through any uncertainties.</p>
      </div>

        <div> 
            <div className='flex justify-center font-medium pl-96 text-xl pb-3'>
                <button>View All</button>
            </div>
            <div className=' h-[1px] bg-gray-300 w-[55%] ml-40'></div>

            <div className='flex'>
                <div className='flex-col'>
                    <div className='flex ml-40 gap-32'>
                        <h1 className='text-2xl pt-4 pb-4'>How do I make a reservation using the booking system?</h1>
                        <button className='text-2xl pt-2'><IoIosArrowDown /></button>
                    </div>

                    <div className=' h-[1px] bg-gray-300 w-[82%] ml-40'></div> 

                    <div className='flex ml-40 gap-10'>
                        <h1 className='text-2xl pt-4 pb-4'>What happens if i encounter issues during the booking process?</h1>
                        <button className='text-2xl pt-2'><IoIosArrowDown /></button>
                    </div>
                    <div className=' h-[1px] bg-gray-300 w-[82%] ml-40'></div> 

                    <div className='flex ml-40 gap-32'>
                        <h1 className='text-2xl pt-4 pb-4'>Can I make changes to my booking after it's confirmed?</h1>
                        <button className='text-2xl pt-2'><IoIosArrowDown /></button>
                    </div>
                    <div className=' h-[1px] bg-gray-300 w-[82%] ml-40'></div> 
                </div>
                <div className='text-9xl ml-40'><RiQuestionMark /></div>

            </div>
        </div>

        <div className="flex justify-center pt-20 pb-16 gap-2">
            <div>
             <input className='border-2 border-black rounded-full p-2 w-[700px]' placeholder='Enter your email:'></input>
            </div>
           <button className=' text-white bg-black font-semibold rounded-full text-sm px-5 p-2 w-[10%]'>Submit</button>
        </div> 

        <div className='flex justify-center gap-20 pt-10 bg-gray-100'>
            <div className='pb-10'>
                <img className='w-48' src={Logo}/>
                <h1 className='text-xl font-light'>Hotdesk Booking System</h1>
                <h1 className='text-xl font-light'>BSIS 3 | Team 6</h1>
            </div>

             <div>
                 <h1 className='text-2xl font-black pb-5'>Quick links</h1>
                 <h1 className='text-lg'>Home</h1>
                 <h1 className='text-lg'>About Us</h1>
                 <h1 className='text-lg'>Services</h1>
                 <h1 className='text-lg'>Contact Us</h1>
             </div>

             <div>
                 <h1 className='text-2xl font-black pb-5'>Company</h1>
                 <h1 className='text-lg'>Terms & Condition</h1>
                 <h1 className='text-lg'>Privacy Policy</h1>
             </div>

             <div>
                 <h1 className='text-2xl font-black pb-5'>Get in touch</h1>
                 <div className='flex justify-center gap-2'>
                    <h1 className='text-3xl'><FaFacebook/></h1>
                    <h1 className='text-3xl'><RiLinkedinLine /></h1> 
                 </div>
             </div>

             <div>
                 <h1 className='text-2xl font-black pb-5'>Special thanks to</h1>
                 <div className='flex justify-center gap-2'>
                    <h1 className='text-3xl'><PiFigmaLogoBold /></h1>
                    <h1 className='text-3xl'><SiTailwindcss /></h1> 
                 </div>
                    <div className='flex justify-center gap-2'>
                        <h1 className='text-3xl'><BiLogoTypescript /></h1>
                        <h1 className='text-3xl'><FaGithubSquare /></h1>
                    </div>
             </div>

        </div>

    </div>
    </div>
  );
}

export default Home;