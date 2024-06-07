import React, { useState } from 'react';
import { HiOutlineXMark } from "react-icons/hi2";
import { PiShieldWarningBold } from "react-icons/pi";   
import { useNavigate } from 'react-router-dom';
import Switcher from "../components/Switcher";

function Authenticate() {
  const [code, setCode] = useState('');

  const handleChange = (event) => {
    setCode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can perform validation or submit the code here
    console.log('Submitted code:', code);
    // Reset the input field after submission if needed
    setCode('');
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/authenticatesuccess');
  };


  return (
    <div className='min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900'>
      <div className='w-full max-w-md p-8 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-700 dark:border-neutral-200'>
      <div className='hidden'>
            <Switcher />
      </div>
      <div>
          <div className="flex flex-col items-center">
            <p className="text-8xl pb-5 dark:text-neutral-200"><PiShieldWarningBold /></p>
            <h1 className="text-3xl font-black text-neutral-700 dark:text-neutral-200">Authenticate</h1>
            <h1 className="text-3xl font-black text-neutral-700 dark:text-neutral-200">Your Account</h1>
          </div>

          <div className="pt-3">
            <h1 className="text-center text-xs font-light pb-3 text-neutral-700 dark:text-neutral-200">Please confirm your account by entering <br /> the authorization code sent to example@gmail.com.</h1>
            <form onSubmit={handleSubmit} className="text-center pt-1">
            {Array.from({ length: 5 }, (_, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                onChange={(e) => handleChange(e, index)}
                placeholder={``}
                className="border-b border-black py-3 px-2 w-10 h-10 mx-1 text-center"
              />))}
              <h1 className="font-normal text-sm pt-8 text-neutral-700 dark:text-neutral-200  ">
                It may take a minute to receive your code. <br />
                Haven't received it? <a className="text-blue-500 hover:underline" href="/">Resend a new code.</a></h1>
              <br />
              <button onClick={handleClick} type="submit" className="bg-white dark:bg-neutral-700 text-neutral-700 dark:text-white font-semibold rounded-2xl border border-neutral-700 dark:border-neutral-200 py-3 w-full hover:bg-neutral-700 hover:text-white dark:hover:bg-neutral-500 dark:hover:text-neutral-200 transition-colors duration-300">Submit</button>
            </form>
          </div>
        </div>
      </div>
   </div>
  )
}

export default Authenticate;