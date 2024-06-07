import React from 'react'
import { PiShieldCheckBold } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';

function AuthenticateSuccess() {
  
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className='flex flex-col items-center justify-center mt-36'>
      <div className='border-[1px] border-black rounded-lg shadow-lg w-full max-w-md p-8'>
        <div className='mt-2'>
          <div className='flex flex-col items-center'>
            <p className='text-8xl pb-5'><PiShieldCheckBold /></p>
            <h1 className='text-4xl font-black'>Authentication</h1>
            <h1 className='text-4xl font-black'>Success!</h1>
          </div>
          <div className='pt-6 text-center'>
            <h1 className='text-sm font-normal text-center'>Your security is our priority, and now you're all set to enjoy our services with added protection. </h1>
            <div className='pt-10 pb-5'>
              <button onClick={handleClick} type="submit" className="text-black bg-white font-semibold rounded-2xl border-[1px] border-neutral-700 text-base py-3 w-44 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto hover:bg-neutral-700 hover:text-white transition-colors duration-300">Done</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthenticateSuccess