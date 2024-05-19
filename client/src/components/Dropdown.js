import React, { useState } from 'react';

const Dropdown = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className="focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {children[0]}
      </button>
      {isOpen && (
        <ul className="absolute mt-1 -ml-8 text-center py-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border-[1px] border-neutral-700 dark:bg-neutral-900 dark:border-neutral-300">
          {children[1].map((item, index) => (
            <li key={index} className="px-4 py-1 text-sm text-gray-900 hover:bg-gray-100 hover:text-gray-900">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;