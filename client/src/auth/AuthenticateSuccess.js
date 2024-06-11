import React from 'react'
import { PiShieldCheckBold } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';

function AuthenticateSuccess() {
  
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900'>
      <div className='w-full max-w-md p-8 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-700 dark:border-neutral-200'>
        <div className='mt-2'>
          <div className='flex flex-col items-center'>
            <p className='text-8xl pb-5 dark:text-neutral-200'><PiShieldCheckBold /></p>
            <h1 className='text-4xl font-black text-neutral-700 dark:text-neutral-200'>Authentication</h1>
            <h1 className='text-4xl font-black text-neutral-700 dark:text-neutral-200'>Success!</h1>
          </div>
          <div className='pt-6 text-center'>
            <h1 className='text-sm font-normal text-center text-neutral-700 dark:text-neutral-200'>Your security is our priority, and now you're all set to enjoy our services with added protection. </h1>
            <div className='pt-10 pb-5'>
              <button onClick={handleClick} type="submit" className="bg-white dark:bg-neutral-700 text-neutral-700 dark:text-white font-semibold rounded-2xl border border-neutral-700 dark:border-neutral-200 py-3 w-full hover:bg-neutral-700 hover:text-white dark:hover:bg-neutral-500 dark:hover:text-neutral-200 transition-colors duration-300">Done</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthenticateSuccess