import React from 'react'
import Logo from '../assets/Logo.png'
import { MdOutlineDashboard } from "react-icons/md";
import { IoBookOutline } from "react-icons/io5";
import { RiBookLine } from "react-icons/ri";
import { PiArrowUDownRightLight } from "react-icons/pi";
import { BiMoon } from "react-icons/bi";
import { GrNotification } from "react-icons/gr";
import { LuUserSquare } from "react-icons/lu";
import { PiDesktopTowerBold } from "react-icons/pi";
import { PiWarning } from "react-icons/pi";
import { CiSquarePlus } from "react-icons/ci"; 
import { CiSquareMinus } from "react-icons/ci";

import { useNavigate } from 'react-router-dom';


function Booking() {

    const navigate = useNavigate();

    const handleClick = () => {
      navigate('/dashboard');
    };
    const handleBooking = () => {
        navigate('/managebooking');
      };

    const handleSignout = () => {
        navigate('/');
    };

  return (
    <div className='bg-gray-100 bg-repeat'>
        <div className='flex flex-row-reverse gap-10'>

            <div className='border-t-2 w-[80%] h-[85px] bg-white rounded-es-2xl'>
                <div className='flex gap-5 justify-between'>
                    <h1 className='text-3xl font-black pl-5 pt-8'>Booking</h1>
                    <div className='flex gap-3 mr-8'>
                        <div className='flex gap-2 pt-5'> 
                            <button className="text-black text-xl"><BiMoon /></button>
                            <p className=' text-xl pt-1'>|</p>
                            <button className="text-black text-xl"><GrNotification /></button>
                        </div>
                        <div className='flex pt-5 gap-3'>
                            <button className="text-black text-5xl"><LuUserSquare /></button>
                            <div className='flex-col'>
                                <h1 className='font-bold'>John Carlo</h1>
                                <h1 className='text-xs'>Customer</h1>
                            </div>
                          
                        </div>
                    </div>
                </div>
                <div className='flex gap-5'>

                    <div className='pt-10'>
                        <div className='border w-60 h-32 rounded-xl bg-[linear-gradient(90deg,_#FFFFFF_0%,_#B3C4FF_100%)] [box-shadow:0px_4px_4px_0px_#0000001A]'>
                            <div className='flex justify-center items-center pt-8 gap-5'>
                                <div>
                                    <h1 className='text-xl font-bold'>50</h1>
                                    <p className='font-medium'>Available Desks</p>
                                </div>
                                <h1 className='text-4xl pt-5'><PiDesktopTowerBold /></h1>
                            </div>
                        </div>
                    </div>

                    <div className='pt-10'>
                        <div className='border w-60 h-32 rounded-xl bg-[linear-gradient(90deg,_#FFFFFF_0%,_#FFC5C5_97.09%)] [box-shadow:0px_4px_4px_0px_#0000001A]'>
                            <div className='flex justify-center items-center pt-8 gap-5'>
                                <div>
                                    <h1 className='text-xl font-bold'>10</h1>
                                    <p className='font-medium'>Unavailable Desks</p>
                                </div>
                                <h1 className='text-4xl pt-5'><PiWarning /></h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='pt-3'>
                    <h1 className='text-xl font-black'>Book a Desk</h1>
                </div>

                <div className='pt-2'>
                    <div className='border w-[1000px] h-[500px] bg-white rounded-xl [box-shadow:0px_4px_4px_0px_#0000001A]'>
                      <div className='flex pt-6 pl-6'>
                         <div className='border-[0.5px] border-[solid] border-[#000000] w-[500px] h-[450px] rounded-xl'>
                             <div className=' flex flex-col text-xl pt-3 pl-3'>
                                 <button><CiSquarePlus /></button>
                                 <button><CiSquareMinus /></button>
                             </div>
                             <h1 className='text-center font-bold mt-44'>Map</h1>
                         </div>

                         <div>
                            <div className=' text-center ml-40'>
                                <h1 className='text-xl font-bold pb-3'>Date</h1>
                                <div>
                                    <h1 className='pb-2'>Select Date:</h1>
                                </div>
                                <div>
                                    <button className='border border-none bg-[#F8F8F8] w-[100%] rounded-lg px-10 py-2 font-bold'>Check In</button>
                                </div>

                                <div>
                                    <h1 className='pb-2 pt-5'>Select Date:</h1>
                                </div>
                                <div>
                                    <button className='border border-none bg-[#F8F8F8] w-[100%] rounded-lg px-10 py-2 font-bold'>Check Out</button>
                                </div>
                            </div>
                            <div className='border-b-2 bg-gray-800 mt-5 mb-3 w-[100%] ml-20'></div>

                            <div className='border w-[80%] h-[100px] bg-white rounded-xl [box-shadow:0px_4px_4px_0px_#0000001A] ml-28'>
                                <div>
                                    <h1 className='text-xl font-black text-center pt-2'>Information</h1>
                                </div>
                            </div>

                            <div>
                                <button className='text-white mt-5 bg-black font-semibold rounded-lg text-sm px-5 py-2.5 md:px-6 md:py-3 lg:text-base ml-40 lg:px-7 xl:text-lg xl:px-8 xl:py-4'>Book Now</button>    
                            </div>
                         </div>

                      </div>
                      
                    </div>
                </div>
               
                
            </div>
           
            <div className='border-l-2 border-black w-72 h-[800px] bg-white'>
                <div>
                    <img className='w-44 pb-10 ml-8' src={Logo}/>
                </div>

                <div className='flex font-bold text-xl pb-8 pl-10'>
                    <button onClick={handleClick} className='text-xl flex gap-3'>
                    <p className='text-4xl'><MdOutlineDashboard /></p>
                    <h1>Dashboard</h1>
                </button>
                 </div>

                <div className='flex font-bold text-xl pb-8 pl-10'>
                    <button className='text-xl flex gap-3'>
                    <p className='text-4xl'><RiBookLine /></p>
                    <h1>Booking</h1>
                    </button>
                </div>

                <div className='flex font-bold text-xl pb-8 pl-10'>
                    <button onClick={handleBooking} className='text-xl flex gap-3'>
                        <p className='text-4xl pt-4'><IoBookOutline /></p>
                        <h1>Manage<br/>Booking</h1>
                    </button>
                </div>

                <div className='flex font-bold text-xl pb-8 pl-10 '>
                    <button onClick={handleSignout} className='flex text-xl gap-3 mt-96'>
                        <p className='text-4xl'><PiArrowUDownRightLight /></p>
                        <h1>Sign-out</h1>
                    </button>
                </div>
            </div>
        </div>
        

    </div>
  )
}

export default Booking