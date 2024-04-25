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
  )
}

export default Dashboard