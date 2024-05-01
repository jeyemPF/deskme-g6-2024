import React from 'react'
import Navbar from '../components/Navbar'
import { LuCopyCheck } from "react-icons/lu";
import { HiMenuAlt3 } from "react-icons/hi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { AiOutlineMessage } from "react-icons/ai";
import Footer from '../components/Footer';

function Services() {
  return (
    <div className='container'>
      <Navbar/>
      <div className="text-center">
            <h1 className="text-5xl text-neutral-700 font-extrabold pt-6 pb-7 ml-4 sm:ml-0">
                Our Features and Services
            </h1>
            <div className="flex flex-wrap gap-16 justify-center pt-10 pb-10">
                <div className="box-border h-[300px] w-[300px] border-2 rounded-xl border-black">
                    <div className='pt-10'>
                        <h1 className='text-7xl flex justify-center'><LuCopyCheck /></h1>
                        <h1 className='text-xl font-medium pt-2 pb-2'>Authentication</h1>
                        <p>User accounts for personalized experiences, secure login and <br/> registration process, and <br/> password recovery options.</p>
                    </div>
                </div>
                <div className="box-border h-[300px] w-[300px] border-2 rounded-xl border-black">
                    <div className='pt-10'>
                        <h1 className='text-7xl flex justify-center'><HiMenuAlt3 /></h1>
                        <h1 className='text-xl font-medium pt-2 pb-2'>Filtering Options</h1>
                        <p>Search bar for quick service or <br/> accommodation lookup, filters for <br/> location, date, range, and other <br/> relevant criteria, and sorting options <br/> for search results.</p>
                    </div>
                </div>
                <div className="box-border h-[300px] w-[300px] border-2 rounded-xl border-black">
                    <div className='pt-10'>
                        <h1 className='text-7xl flex justify-center'><FaRegCalendarAlt /></h1>
                        <h1 className='text-xl font-medium pt-2 pb-2'>Booking Calendar</h1>
                        <p>Interactive calendar for <br/> selecting dates, real-time <br/> availability updates, and <br/> reservation confirmation and <br/> booking summary.</p>
                    </div>
                </div>
                <div className="box-border h-[300px] w-[300px] border-2 rounded-xl border-black">
                    <div className='pt-10'>
                        <h1 className='text-7xl flex justify-center'><IoIosPeople /></h1>
                        <h1 className='text-xl font-medium pt-2 pb-2'>Accommodation Listings</h1>
                        <p>Detailed listings with <br/> descriptions, images, and <br/> amenities, information, and <br/> availability calendars.</p>
                    </div>
                </div>
                <div className="box-border h-[300px] w-[300px] border-2 rounded-xl border-black">
                    <div className='pt-10'>
                        <h1 className='text-7xl flex justify-center'><MdOutlineNotificationsActive /></h1>
                        <h1 className='text-xl font-medium pt-2 pb-2'>Notifications</h1>
                        <p>Instant booking confirmation <br/> emails, reminders and notifications <br/> for upcoming reservations, and <br/> alerts for booking changes or <br/>  cancellations.</p>
                    </div>
                </div>
                <div className="box-border h-[300px] w-[300px] border-2 rounded-xl border-black">
                    <div className='pt-10'>
                        <h1 className='text-7xl flex justify-center'><AiOutlineMessage /></h1>
                        <h1 className='text-xl font-medium pt-2 pb-2'>Customer Support</h1>
                        <p>Help center or FAQ section, <br/> customer support contact form, <br/> and responsive customer service <br/> for inquiries and issues.</p>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Services