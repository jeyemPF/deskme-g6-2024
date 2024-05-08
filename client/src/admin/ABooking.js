import * as React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { FaTruckLoading } from "react-icons/fa";

const Card = ({ icon, title, description }) => {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-4 xl:w-80 sm:w-64 xl:h-32 sm:h-28 flex items-center space-x-3 border-[1px] border-neutral-200">
      <div className="xl:text-3xl mr-8 ml-8 sm:text-xl">
        {icon === 'pending' && <FaTruckLoading   />}
      </div>
      <div>
        <h5 className="xl:text-lg sm:text-base">{title}</h5>
        <p className="xl:text-sm sm:text-xs text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );
};

const ABooking = () => {
  return (
    <div className="dark:bg-neutral-900">
    <Header />
    <Sidebar />
    <div>
        <main className="container 2xl:pl-12 sm:pl-24 pt-24 dark:bg-neutral-900 dark:text-white">
          <a className="text-sm font-light dark:text-white" href="#">
            Admin
            <span className="mx-1 text-sm text-navy-700 hover:text-navy-700 dark:text-white">
              {" "}
              /{" "}
            </span>
          </a>
          <Link className="text-sm font-normal capitalize text-navy-700 hover:underline dark:text-white dark:hover:text-white" to="#">
            Booking
          </Link>
          <div className='flex xl:flex-row pt-5 sm:flex-col sm:gap-y-4 sm:items-center gap-x-3'>
            <div className="xl:w-1/2">
              <Card icon="pending" title="Pending Bookings" description="Total: 2" />
            </div>
          </div>
        </main> 
        </div>
    </div>
  )
}

export default ABooking
