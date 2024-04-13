import React from 'react'
import Logo from '../assets/Logo.png'
import { MdOutlineDashboard } from "react-icons/md";
import { IoBookOutline } from "react-icons/io5";
import { RiBookLine } from "react-icons/ri";
import { PiArrowUDownRightLight } from "react-icons/pi";
import { BiMoon } from "react-icons/bi";
import { GrNotification } from "react-icons/gr";
import { LuUserSquare } from "react-icons/lu";
import { FaRegBookmark } from "react-icons/fa6";
import { PiDesktopTowerBold } from "react-icons/pi";
import { PiWarning } from "react-icons/pi";
import { CgMenuGridO } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import Input from 'postcss/lib/input';
import Calendar from '../components/calendar';




function ManageBooking() {

    const navigate = useNavigate();

    const handleClick = () => {
    navigate('/booking');
  };
  const handleDashboard = () => {
    navigate('/dashboard');
  };

  const handleSignout = () => {
    navigate('/');
  };


  return (
    <div className='bg-gray-100'>
        <div className='flex flex-row-reverse gap-10'>

            <div className='border-t-2 w-[80%] h-[85px] bg-white rounded-es-2xl'>
                <div className='flex gap-5 justify-between'>
                    <h1 className='text-3xl font-black pl-5 pt-8'>Manage Booking</h1>
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
                        <div className='border w-60 h-32 rounded-xl bg-[linear-gradient(90deg,_#FFFFFF_0%,_#D9F2D4_76.7%)] [box-shadow:0px_4px_4px_0px_#0000001A]'>
                            <div className='flex justify-center items-center pt-8 gap-5'>
                                <div>
                                    <h1 className='text-xl font-bold'>3</h1>
                                    <p className='font-medium'>All bookings</p>
                                </div>
                                <h1 className='text-4xl pt-5'><FaRegBookmark /></h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='pt-8'>
                    <div className='border w-[1000px] h-[400px] bg-white rounded-xl [box-shadow:0px_4px_4px_0px_#0000001A]'>
                      <div className='flex justify-between pt-4'>
                        <h1 className='text-xl font-bold pl-6'>All bookings | History</h1>
                        <div className='pr-6'>
                          <input className='rounded-xl px-3 py-5 border-[1px] border-[solid] border-[#000000] h-10 w-[100%]'
                            type="text"
                            placeholder=" Search bookings        🔍"
                             />
                          </div>
                      </div>

                          <div className='border-[1px] rounded-xl ml-6 mt-5 border-[solid] border-[#000000] w-[95%] h-[10%] bg-[#EEEEEE]'>
                            <div className='flex justify-center gap-[45px] pt-2 text-normal'>
                              <h1>ID</h1>
                              <h1>|</h1>
                              <h1>Name</h1>
                              <h1>|</h1>
                              <h1>Booking Number</h1>
                              <h1>|</h1>
                              <h1>Check in</h1>
                              <h1>|</h1>
                              <h1>Check out</h1>
                              <h1>|</h1>
                              <h1>Status</h1>
                            </div>
                          </div>

                          <div className='border-[0.5px] border-[solid] border-[#000000] w-[95%] h-[65%] rounded-xl mt-3 ml-6'>
                            <div className=' rounded-xl ml-5 mt-5 border-none w-[95%] h-[15%] bg-[#EEEEEE]' >
                              <div className='flex justify-center gap-20 pt-2 pl-3 text-normal'>
                                  <h1>1</h1>
                                  <h1>John</h1>
                                  <h1 className='pl-12'>123456789</h1>
                                  <h1>March 22, 2024</h1>
                                  <h1>March 23, 2024</h1>
                                  <h1>Done</h1>
                              </div>
                            </div>

                            <div className=' rounded-xl ml-5 mt-5 border-none w-[95%] h-[15%] bg-[#EEEEEE]' >
                            <div className='flex justify-center gap-20 pt-2 pl-3 text-normal'>
                                  <h1>2</h1>
                                  <h1>John</h1>
                                  <h1 className='pl-12'>123456789</h1>
                                  <h1>March 22, 2024</h1>
                                  <h1>March 23, 2024</h1>
                                  <h1>Done</h1>
                              </div>
                            </div>

                            <div className=' rounded-xl ml-5 mt-5 border-none w-[95%] h-[15%] bg-[#EEEEEE]' >
                            <div className='flex justify-center gap-20 pt-2 pl-3 text-normal'>
                                  <h1>3</h1>
                                  <h1>John</h1>
                                  <h1 className='pl-12'>123456789</h1>
                                  <h1>March 22, 2024</h1>
                                  <h1>March 23, 2024</h1>
                                  <h1>Done</h1>
                              </div>
                            </div>
                         </div>
                          
                      
                        
                  


                    </div>
                </div>
               
                
            </div>
           
            <div className='border-l-2 border-black w-72 h-[700px] bg-white'>
                <div>
                    <img className='w-44 pb-10 ml-8' src={Logo}/>
                </div>

                <div className='flex font-bold text-xl pb-8 pl-10'>
                    <button onClick={handleDashboard} className='text-xl flex gap-3'>
                    <p className='text-4xl'><MdOutlineDashboard /></p>
                    <h1>Dashboard</h1>
                </button>
                 </div>

                <div className='flex font-bold text-xl pb-8 pl-10'>
                    <button onClick={handleClick} className='text-xl flex gap-3'>
                    <p className='text-4xl'><RiBookLine /></p>
                    <h1>Booking</h1>
                    </button>
                </div>

                <div className='flex font-bold text-xl pb-8 pl-10'>
                    <button className='text-xl flex gap-3'>
                        <p className='text-4xl pt-4'><IoBookOutline /></p>
                        <h1>Manage<br/>Booking</h1>
                    </button>
                </div>

                <div className='flex font-bold text-xl pb-8 pl-10 '>
                    <button onClick={handleSignout} className='flex text-xl gap-3 mt-72'>
                        <p className='text-4xl'><PiArrowUDownRightLight /></p>
                        <h1>Sign-out</h1>
                    </button>
                </div>
            </div>
        </div>
        

    </div>
  )
}

export default ManageBooking