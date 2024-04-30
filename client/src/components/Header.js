import React from 'react'
import { BellIcon } from '@heroicons/react/24/solid';
import Dropdown from './Dropdown';
import Switcher from '../components/Switcher';

const Header = () => {
  return (
    <div className="overflow-hidden">
      <header className="dark:bg-neutral-900 w-screen bg-white p-3 border-b-[1px] border-black dark:border-neutral-500 dark:shadow-neutral-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="text-black pt-1 ml-5"><Switcher /></button>
          </div>
          <div className="flex items-center space-x-4 flex-row-reverse">
            <div className="flex flex-col mr-2">
              <span className="text-sm font-medium text-gray-800 dark:text-neutral-300 ml-3">John Carlo</span>
              <span className="text-xs text-gray-500 dark:text-neutral-400 ml-3">Employee</span>
            </div>
            <Dropdown>
              {[
                <button className="focus:outline-none">
                  <img
                    src="https://scontent.fcrk1-3.fna.fbcdn.net/v/t39.30808-6/432775149_3747249338844359_5265507157405488405_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFTzw_9uAbJZ1jiEvCoRKokHlc2p5Q5ZnoeVzanlDlmeg_e-61fWkdDRrXsqzBmzOE7dT5kO24p5m6BHllytThw&_nc_ohc=E-bqFrkZISUQ7kNvgF3vbJr&_nc_ht=scontent.fcrk1-3.fna&oh=00_AfB3IoWBYmAHRjMwlex_UZH8F0E8KCp_Fv2n9Xi9Vd6Upw&oe=6634341D"
                    className="h-9 w-9 rounded-full border-2 border-neutral-700 dark:border-neutral-300 transition duration-300 transform hover:scale-110"
                  />
                </button>,
                [
                  'Customize Profile',
                  'Help Support',
                ].map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block px-2 text-sm hover:bg-gray-100 hover:text-gray-900 dark:hover:text-gray-900 dark:text-neutral-300"
                  >
                    {item}
                  </a>
                )),
              ]}
            </Dropdown>
            <BellIcon className="h-8 w-8 text-neutral-700 rounded-full p-1 hover:bg-neutral-700 hover:text-white dark:text-neutral-300 dark:hover:bg-white dark:hover:text-neutral-700 cursor-pointer" />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;