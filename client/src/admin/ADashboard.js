// ADashboard.jsx

import * as React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationCircle, FaBookmark } from 'react-icons/fa';
import { FaDesktop, FaBorderAll } from "react-icons/fa6";
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import useFetch from '../Hooks/useFetch';

const Card = ({ icon, title, description }) => {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-4 xl:w-80 sm:w-64 xl:h-32 sm:h-28 flex items-center space-x-3 border-[1px] border-neutral-200">
      <div className="xl:text-3xl mr-8 ml-8 sm:text-xl">
        {icon === 'all bookings' && <FaBookmark />}
        {icon === 'adesks' && <FaDesktop />}
        {icon === 'udesks' && <FaExclamationCircle />}
        {icon === 'desks' && <FaBorderAll />}
      </div>
      <div>
        <h5 className="xl:text-lg sm:text-base">{title}</h5>
        <p className="xl:text-sm sm:text-xs text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );
};

function ADashboard() {
  const { data: deskCountData, loading: deskLoading, error: deskError } = useFetch("http://localhost:8800/api/desks/count");
  const { data: reservationCountData, loading: reservationLoading, error: reservationError } = useFetch("http://localhost:8800/api/reservations/count-reservation");
  const { data: reservationAvailableDeskCount, loading: reservationAvailableDeskCountLoading, error: reservationAvailableDeskCountError } = useFetch("http://localhost:8800/api/reservations/available-desk");

  const deskCount = deskCountData && deskCountData.count;
  const reservationCount = reservationCountData && reservationCountData.count;
  const reservationDeskCount = reservationAvailableDeskCount && reservationAvailableDeskCount.count;

  return (
    <div className="dark:bg-neutral-900">
      <Header />
      <Sidebar />
      <div>
        <main className="container 2xl:pl-12 sm:pl-24 pt-24 dark:bg-neutral-900 dark:text-white pb-4">
          <div>
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
          </div>
          {(deskLoading || reservationLoading || reservationAvailableDeskCountLoading) ? (
            "Loading Please Wait..."
          ) : (
            <div className='flex xl:flex-row pt-5 sm:flex-col sm:gap-y-4 sm:items-center gap-x-3'>
              <div className="xl:w-1/2">
                <Card key="deskCount" icon="all bookings" title="All Bookings" description= {`Total: ${reservationCount}`} />
              </div>
              <div className="xl:w-1/2">
                {/* Add key prop for Card component */}
                <Card key="availableDesks" icon="adesks" title="Available Desks" description={`Total: ${reservationDeskCount}`} />
              </div>
              <div className="xl:w-1/2">
                {/* Add key prop for Card component */}
                <Card key="unavailableDesks" icon="udesks" title="Unavailable Desks" description="Total: 5" />
              </div>
              <div className="xl:w-1/2">
                {/* Add key prop for Card component */}
                <Card key="allDesks" icon="desks" title="All Desks" description={`Total: ${deskCount}`} />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
export default ADashboard;
