import * as React from 'react';
import ASidebar from './ASidebar';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const ABooking = () => {
  return (
    <div className="dark:bg-neutral-900">
    <Header />
    <ASidebar />
    <div>
        <main className="container 2xl:pl-12 sm:pl-24 pt-6 dark:bg-neutral-900 dark:text-white">
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
        </main> 
        </div>
    </div>
  )
}

export default ABooking
