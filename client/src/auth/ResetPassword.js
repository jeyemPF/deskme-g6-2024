import React, { useState } from 'react';
import { HiOutlineXMark } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';

const InputField = ({ type, name, placeholder, value, onChange, icon, error }) => {
  return (
    <div className='relative'>
      <input
        className='border border-black rounded-md py-3 px-3 w-full'
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {icon && (
        <button
          className='absolute top-1/2 transform -translate-y-1/2 right-1 focus:outline-none pr-4'
          onClick={icon.onClick}
        >
          {icon.component}
        </button>
      )}
      {error && <p className='text-red-500 text-sm'>{error}</p>}
    </div>
  );
};

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    }
  };

  const navigate = useNavigate();

  const handleClick1 = () => {
    navigate('/login');
  };

  const isEmpty = (str) => {
    return str.trim() === '';
  };

  const handleConfirm = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (isEmpty(email)) {
      setEmailError('Please fill out this field.');
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
    } else {
      // Add your logic here to handle the confirm button click
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900'>
      <div className='w-full max-w-md p-8 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-700 dark:border-neutral-200'>
        <div className='flex justify-end'>
          <button onClick={handleClick1} className='text-2xl text-neutral-700 dark:text-neutral-200'><HiOutlineXMark /></button>
        </div>
        <h1 className='text-4xl font-black text-left text-neutral-700 dark:text-neutral-200'>Reset Password</h1>
        <p className='font-normal text-left mt-1 text-neutral-700 dark:text-neutral-200'>We'll send a code to your email inbox.</p>

        <div className='mt-12'>
            <InputField
              type='email'
              name='email'
              placeholder='Email Address:'
              value={email}
              onChange={handleChange}
              icon={null}
              error={emailError}
            />
            <button className='bg-white mt-12 dark:bg-neutral-700 text-neutral-700 dark:text-white font-semibold rounded-2xl border-[1px] border-neutral-700 dark:border-neutral-200 py-3 w-full hover:bg-neutral-700 hover:text-white dark:hover:bg-neutral-500 dark:hover:text-neutral-200 transition-colors duration-300' onClick={handleConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};
export default ResetPassword;
