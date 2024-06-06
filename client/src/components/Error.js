import React, { useEffect } from 'react';
import Switcher from './Switcher';
import { useNavigate } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();

  // Store the previous page's URL in sessionStorage
  useEffect(() => {
    sessionStorage.setItem('previousPage', window.location.pathname);
  }, []);

  const handleClick = () => {
    // Retrieve the previous page's URL from sessionStorage
    const previousPage = sessionStorage.getItem('previousPage');
    if (previousPage) {
      navigate(previousPage);
    } else {
      // If the previous page's URL is not found, navigate to the home page
      navigate('/');
    }
  };

  return (
    <div className='bg-neutral-50 dark:bg-neutral-900'>
      <div className='hidden'>
        <Switcher />
      </div>
      <main>
        <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8">
          <div className="max-w-lg mx-auto space-y-3 text-center">
            <h3 className="text-neutral-600 dark:text-neutral-300 font-semibold">
              404 Error
            </h3>
            <p className="text-gray-800 dark:text-neutral-100 text-4xl font-semibold sm:text-5xl">
              Page not found
            </p>
            <p className="text-gray-600 dark:text-neutral-400">
              Sorry, the page you are looking for could not be found or has been removed.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button onClick={handleClick} className="block py-2 px-4 text-white font-medium bg-neutral-600 duration-150 hover:bg-neutral-500 active:bg-neutral-700 rounded">
                Go back
              </button>
              <a href="javascript:void(0)" className="block py-2 px-4 text-gray-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-medium duration-150 active:bg-gray-100 border rounded">
                Contact support
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Error;
