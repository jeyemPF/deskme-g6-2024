import React, { useState } from 'react';
import { HiOutlineXMark } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const InputField = ({ type, name, placeholder, value, onChange, error }) => {
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
      {error && <p className='text-red-500 text-sm'>{error}</p>}
    </div>
  );
};

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      setEmailError('Please fill out this field.');
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
    } else {
      try {
        await axios.post('http://localhost:8800/api/auth/forgot-password', { email });
      } catch (error) {
        setEmailError('Failed to send reset email. Please try again.');
      }
    }
  };

  return (
    <div className='flex flex-col items-center justify-center mt-32'>
      <div className='border-[1px] border-neutral-700 rounded-lg shadow-lg w-full max-w-md p-8'>
        <div className='flex justify-end'>
          <button onClick={() => navigate('/login')} className='text-2xl'><HiOutlineXMark /></button>
        </div>
        <h1 className='text-4xl font-black text-left text-neutral-700'>Reset Password</h1>
        <p className='font-normal text-left mt-1 text-neutral-700'>We'll send a code to your email inbox.</p>

        <form onSubmit={handleSubmit} className='mt-12'>
          <InputField
            type='email'
            name='email'
            placeholder='Email Address:'
            value={email}
            onChange={handleChange}
            error={emailError}
          />
          <button type="submit" className='bg-white text-neutral-700 font-semibold rounded-2xl mt-12 mb-4 border-[1px] border-neutral-700 py-3 w-full hover:bg-neutral-700 hover:text-white transition-colors duration-300'>
            Send Reset Link
          </button>
        </form>
      </div>
      <div className='text-center text-base font-light mt-2 text-neutral-700'>
        <h1>
          <span>&#169;</span>2023 DeskMe, All right reserved. Privacy Policy <br /> and Terms & Conditions.
        </h1>
      </div>
    </div>
  );
};

export default ResetPassword;
