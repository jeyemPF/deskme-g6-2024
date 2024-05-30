// NotificationDropdown.js
import React from 'react';
import { FaBell } from 'react-icons/fa'; // Assuming you're using react-icons for icons

const notifications = [
  { id: 1, text: 'Your booking is until 3:00pm only.' },
];

const NotificationDropdown = () => {
  return (
    <div className="relative">
      <div className="absolute -right-24 mt-2 w-60 bg-white dark:bg-neutral-800 rounded-lg shadow-lg z-10 ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="p-4">
          <h2 className="text-base font-bold mb-4 flex items-center text-neutral-700 dark:text-neutral-300">
            Notifications
          </h2>
          <ul className="space-y-3">
            {notifications.map((notification) => (
              <li key={notification.id} className="flex items-start p-3 bg-gray-100 dark:bg-neutral-600 rounded-lg shadow-sm hover:bg-gray-200 dark:hover:bg-neutral-600 transition duration-200">
                <div className="text-lg mr-3 mt-1">🔔</div>
                <div className="text-sm text-neutral-700 dark:text-neutral-300">{notification.text}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-gray-100 dark:border-neutral-600 p-2 text-center">
          <button className="text-neutral-700 dark:text-neutral-300 text-sm">View All</button>
        </div>
      </div>
    </div>
  );
};

export default NotificationDropdown;
