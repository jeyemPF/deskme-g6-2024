import * as React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationCircle , FaLaptopCode, FaBookmark } from 'react-icons/fa';
import { FaDesktop, FaBorderAll  } from "react-icons/fa6";
import ASidebar from './ASidebar';
import Header from '../components/Header';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';

const Card = ({ icon, title, description }) => {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-4 xl:w-80 sm:w-64 xl:h-32 sm:h-28 flex items-center space-x-3 border-[1px] border-neutral-200">
      <div className="xl:text-3xl mr-8 ml-8 sm:text-xl">
        {icon === 'all bookings' && <FaBookmark  />}
        {icon === 'adesks' && <FaDesktop />}
        {icon === 'udesks' && <FaExclamationCircle  />}
        {icon === 'desks' && <FaBorderAll    />}
      </div>
      <div>
        <h5 className="xl:text-lg sm:text-base">{title}</h5>
        <p className="xl:text-sm sm:text-xs text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );
};

const palette = ['skyblue', 'grey', 'black', 'papayawhip'];

function ADashboard() {
  return (
    <div className="dark:bg-neutral-900">
      <Header />
      <ASidebar />
      <div>
        <main className="container 2xl:pl-12 sm:pl-24 pt-24 dark:bg-neutral-900 dark:text-white pb-4">
          <a className="text-sm font-light dark:text-white" href="#">
            Admin
            <span className="mx-1 text-sm text-navy-700 hover:text-navy-700 dark:text-white">
              {" "}
              /{" "}
            </span>
          </a>
          <Link className="text-sm font-normal capitalize text-navy-700 hover:underline dark:text-white dark:hover:text-white" to="#">
            Dashboard
          </Link>
          <div className='flex xl:flex-row pt-5 sm:flex-col sm:gap-y-4 sm:items-center gap-x-3'>
            <div className="xl:w-1/2">
              <Card icon="all bookings" title="All Bookings" description="Total: 3" />
            </div>
            <div className="xl:w-1/2">
              <Card icon="adesks" title="Available Desks" description="Total: 6" />
            </div>
            <div className="xl:w-1/2">
              <Card icon="udesks" title="Unavailable Desks" description="Total: 10" />
            </div>
            <div className="xl:w-1/2">
              <Card icon="desks" title="All Desks" description="Total: 16" />
            </div>
          </div>
          <div className='flex lg:flex-row sm:flex-col justify-center items-center border-neutral-200 border-[1px] rounded-md mt-6 shadow-md gap-20 w-full'>
            <div className='lg:w-6/12 lg:h-96 sm:w-60 sm:h-48 flex items-center justify-center lg:border-neutral-300 lg:border-r-[1px] sm:border-r-none'>
              <BarChart
                xAxis={[{ scaleType: 'band', data: ['April', 'May', 'June', 'July'] }]}
                series={[{ data: [4, 3, 5, 2] }, { data: [1, 6, 3, 4] } , { data: [3, 1, 2, 2] } , { data: [2, 5, 6, 3] }]} 
                colors={palette}
              />
            </div>
              <div className='lg:w-96 lg:h-96 sm:w-52 sm:h-40 flex items-center justify-center'>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 10, label: 'April' },
                      { id: 1, value: 15, label: 'May' },
                      { id: 2, value: 20, label: 'June' },
                      { id: 3, value: 25, label: 'July' },
                    ],
                  },
                ]}
                colors={palette}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ADashboard;