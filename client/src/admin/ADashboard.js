import * as React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationCircle, FaBookmark } from 'react-icons/fa';
import { FaDesktop, FaBorderAll  } from "react-icons/fa6";
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

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
      <Sidebar />
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
        </main>
      </div>
    </div>
  );
};

export default ADashboard;