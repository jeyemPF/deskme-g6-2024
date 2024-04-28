import { useState } from "react";
import {
  MdDashboard,
  MdSettings,
  MdLogout,
} from "react-icons/md";
import { PiArrowCircleRightBold } from "react-icons/pi";
import { PiBookBookmarkFill } from "react-icons/pi";
import { PiBooksFill } from "react-icons/pi";
import { FaHandsHelping } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Switcher from '../components/Switcher';

function Dashboard() {
  const [open, setOpen] = useState(true);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Login');
  };

  const firstMenuItems = [
    { title: "Dashboard", icon: <MdDashboard className="text-2xl" /> },
    { title: "Booking", icon: <PiBookBookmarkFill className="text-2xl " />, gap: true },
    { title: "Manage Booking", icon: <PiBooksFill className="text-2xl" /> },
    { title: "Customer Support", icon: <FaHandsHelping className="text-2xl" /> },
  ];

  const Menus = [
    ...firstMenuItems,
    { title: "Settings", icon: <MdSettings className="text-2xl" />, gap: true },
    { title: "Logout", icon: <MdLogout className="text-2xl" /> },
  ];

  return (
    <div className="dark:bg-neutral-900">
      <div className="flex">
        <div
          className={`${
            open ? "w-60" : "w-20"
          } bg-white dark:bg-neutral-900 h-screen p-5 pt-5 relative duration-500 border-r-2 border-black shadow-md shadow-neutral-700 dark:border-white dark:shadow-md dark:shadow-neutral-200`}
        >
          <button className="text-black pt-1 ml-2"><Switcher /></button>
          <div className="flex items-center gap-x-4 mb-8 ml-2 mt-6">
            <span className={`text-black font-bold origin-left duration-200 dark:text-white ${!open && "hidden"}`}>
              DESKME
            </span>
          </div>
          <PiArrowCircleRightBold
            onClick={() => setOpen(!open)}
            className={`text-black bg-white dark:bg-neutral-900 dark:text-white absolute cursor-pointer -right-3 top-9 w-6 border-2 border-black rounded-full dark:border-white ${
              !open && "rotate-180"
            } text-4xl`}
          />
          <ul className="pt-2">
            {firstMenuItems.map((Menu, index) => (
              <li
                key={index}
                className={`text-black dark:text-white dark:hover:bg-white dark:hover:text-black text-sm font-medium flex items-center gap-x-4 p-2 hover:bg-neutral-900 hover:text-white rounded-md cursor-pointer ${
                  Menu.gap && "mt-9"
                }`}
              >
                {Menu.icon}
                <span className={`${!open && "hidden"} origin-left duration-200`}>
                  {Menu.title}
                </span>
              </li>
            ))}
          </ul>

          <ul className="flex flex-col lg:mt-60 sm:mt-44 ">
            {/* Render settings and logout items */}
            <li className="text-black text-sm font-medium flex items-center gap-x-4 p-2 hover:bg-neutral-900 hover:text-white rounded-md mt-9 cursor-pointer dark:text-white dark:hover:bg-white dark:hover:text-black">
              <MdSettings className="text-2xl" />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Settings
              </span>
            </li>
            <li onClick={handleClick} className="text-black text-sm font-medium flex items-center gap-x-4 p-2 hover:bg-black hover:text-white border-2 border-black rounded-md cursor-pointer dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black">
              <MdLogout className="text-2xl" />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Logout
              </span>
            </li>
          </ul>
        </div>
        <main className="flex-grow p-5">
          <h2 className="text-xl">Content</h2>
          <p>This is the main content area.</p>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;