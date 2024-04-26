import React, { useEffect, useState } from 'react';
import Logo from '../assets/Logo.png';
import { MdOutlineDashboard } from 'react-icons/md';
import { IoBookOutline } from 'react-icons/io5';
import { RiBookLine } from 'react-icons/ri';
import { PiArrowUDownRightLight } from 'react-icons/pi';
import { BiMoon } from 'react-icons/bi';
import { GrNotification } from 'react-icons/gr';
import { LuUserSquare } from 'react-icons/lu';
import { FaRegBookmark } from 'react-icons/fa6';
import { PiDesktopTowerBold } from 'react-icons/pi';
import { PiWarning } from 'react-icons/pi';
import Calendar from '../components/Calendar.js';
import { CgMenuGridO } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleClick = () => {
    navigate('/booking');
  };
  const handleDashboard = () => {
    navigate('/dashboard');
  };
  const handleManagebooking = () => {
    navigate('/managebooking');
  };

  const handleSignout = () => {
    navigate('/');
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Make API call to fetch user data
        const response = await axios.get('http://localhost:8800/api/user');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className='bg-gray-100'>
      <div className='flex flex-row-reverse gap-10'>
        <div className='border-t-2 w-[80%] h-[85px] bg-white rounded-es-2xl'>
          <div className='flex gap-5 justify-between'>
            <h1 className='text-3xl font-black pl-5 pt-8'>Dashboard</h1>
            <div className='flex gap-3 mr-8'>
              <div className='flex gap-2 pt-5'>
                <button className='text-black text-xl'>
                  <BiMoon />
                </button>
                <p className=' text-xl pt-1'>|</p>
                <button className='text-black text-xl'>
                  <GrNotification />
                </button>
              </div>
              {user && (
                <div className='flex pt-5 gap-3'>
                  <button className='text-black text-5xl'>
                    <LuUserSquare />
                  </button>
                  <div className='flex-col'>
                    <h1 className='font-bold'>{user.name}</h1>
                    <h1 className='text-xs'>{user.role}</h1>
                  </div>
                </div>
              )}
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

                    <div className='pt-10'>
                        <div className='border w-60 h-32 rounded-xl bg-[linear-gradient(90deg,_#FFFFFF_0%,_#FDFF98_100%)] [box-shadow:0px_4px_4px_0px_#0000001A]'>
                            <div className='flex justify-center items-center pt-8 gap-5'>
                                <div>
                                    <h1 className='text-xl font-bold'>60</h1>
                                    <p className='font-medium'>All Desks</p>
                                </div>
                                <h1 className='text-4xl pt-5'><CgMenuGridO /></h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='pt-8'>
                    <div className='border w-[1000px] h-[400px] bg-white rounded-xl [box-shadow:0px_4px_4px_0px_#0000001A]'>
                        <Calendar/>
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
                    <button onClick={handleManagebooking} className='text-xl flex gap-3'>
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

export default Dashboard