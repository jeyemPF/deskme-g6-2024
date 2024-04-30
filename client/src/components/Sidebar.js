import { useState } from "react";
import {
  MdDashboard,
  MdSettings,
  MdLogout,
} from "react-icons/md";
import { PiArrowCircleLeft } from "react-icons/pi";
import { PiBookBookmarkFill } from "react-icons/pi";
import { PiBooksFill } from "react-icons/pi";
import { FaHandsHelping } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [open, setOpen] = useState(true);
  const [activeMenuItem, setActiveMenuItem] = useState("Dashboard"); // Add a state to track the active menu item

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
            open? "w-60" : "w-20"
          } bg-white dark:bg-neutral-900 h-screen p-5 pt-5 relative duration-500 border-r-[1px] border-black dark:border-neutral-500`}
        >
          <div className="flex items-center gap-x-4 mb-8 ml-2 mt-6">
          <span className={`text-black font-bold origin-left duration-200 dark:text-white ${!open && ""}`}>
            {open ? "DESKME" : "DM"}
          </span>
          </div>
          <PiArrowCircleLeft
            onClick={() => setOpen(!open)}
            className={`text-black bg-white dark:bg-neutral-900 dark:text-neutral-300 absolute cursor-pointer -right-3 top-10 w-6 border-[1px] border-black rounded-full dark:border-neutral-300 ${
             !open && "rotate-180"
            } text-4xl`}
          />
          <ul className="pt-2">
            {firstMenuItems.map((Menu, index) => (
              <li
                key={index}
                className={`text-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-300  dark:hover:text-neutral-900 text-sm font-medium flex items-center gap-x-4 p-2 hover:bg-neutral-700 hover:text-white rounded-md cursor-pointer  ${
                  Menu.gap && "mt-9"
                } ${activeMenuItem === Menu.title? "bg-neutral-700 text-white dark:bg-neutral-300 dark:text-neutral-900" : ""}`}
                onClick={() => setActiveMenuItem(Menu.title)} // Add an onClick handler to update the active menu item
              >
                {Menu.icon}
                <span className={`${!open && "hidden"} origin-left duration-200`}>
                  {Menu.title}
                </span>
              </li>
            ))}
          </ul>

          <ul className="flex flex-col lg:mt-48 sm:mt-36">
            {/* Render settings and logout items */}
            <li
              className={`text-neutral-700 text-sm font-medium flex items-center gap-x-4 p-2 hover:bg-neutral-700 hover:text-white rounded-md mt-9 cursor-pointer dark:text-neutral-300 dark:hover:bg-neutral-300 dark:hover:text-neutral-900 ${activeMenuItem === "Settings"? "bg-neutral-700 text-white dark:bg-neutral-300 dark:text-neutral-900" : ""}`}
              onClick={() => setActiveMenuItem("Settings")}
            >
              <MdSettings className="text-2xl" />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Settings
              </span>
            </li>
            <li
              onClick={() => {
                handleClick();
                setActiveMenuItem("Logout"); // Update the active menu item when logging out
              }}
              className={`text-neutral-700 text-sm font-medium flex items-center gap-x-4 p-2 mt-1 hover:bg-neutral-700 hover:text-white border-2 border-neutral-700 rounded-md cursor-pointer dark:text-neutral-300 dark:border-neutral-300 dark:hover:bg-neutral-300 dark:hover:text-black ${activeMenuItem === "Logout"? "bg-neutral-700 text-white" : ""}`}
            >
              <MdLogout className="text-2xl" />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Logout
              </span>
            </li>
          </ul>
        </div>
        <div>
          <main className="flex-grow p-5 dark:bg-neutral-900 dark:text-white">
              <p className="font-light text-sm">Dashboard / Employee</p>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;