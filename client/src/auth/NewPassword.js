import React, { useState } from 'react';
import { HiOutlineXMark } from "react-icons/hi2";
import { useNavigate, useParams } from 'react-router-dom';
import { BsEye, BsEyeSlash } from "react-icons/bs";
import axios from 'axios';
import { message } from 'antd';
import Switcher from '../components/Switcher';

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
          type="button"
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

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { token, id } = useParams();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');
  
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }
  
    try {
      // Use the API URL from the environment variable
      await axios.patch(`${process.env.REACT_APP_API_URL}/api/auth/reset-password/${token}/${id}`, { password, confirmPassword });
      
      navigate('/login');
      message.success("Password reset successfully");
    } catch (error) {
      setPasswordError('Failed to reset password. Please try again.');
      message.error("Failed to reset password. Please try again.");
    }
  };
  

  return (
    <div className='min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900'>
    <div className='w-full max-w-md p-8 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-700 dark:border-neutral-200'>
      <div className='hidden'>
            <Switcher />
          </div>
        <div className='flex justify-end'>
          <button onClick={() => navigate('/login')} className='text-2xl'><HiOutlineXMark /></button>
        </div>
        <h1 className='text-4xl font-black text-left text-neutral-700'>New Password</h1>
        <p className='font-normal text-left mt-1 text-neutral-700'>Set up your new password.</p>

        <form onSubmit={handleSubmit} className='mt-12'>
          <InputField
            type={showPassword ? 'text' : 'password'}
            name='password'
            placeholder='Password:'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={{
              component: showPassword ? <BsEye /> : <BsEyeSlash />,
              onClick: togglePasswordVisibility,
            }}
            error={passwordError}
          />

        <div className='relative mt-4'>
          <InputField
            type={showPassword ? 'text' : 'password'}
            name='confirmPassword'
            placeholder='Confirm Password:'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            icon={{
              component: showPassword ? <BsEye /> : <BsEyeSlash />,
              onClick: togglePasswordVisibility,
            }}
            error={passwordError}
          />
           </div>
          <button type="submit" className='bg-white text-neutral-700 font-semibold rounded-2xl mt-12 mb-4 border-[1px] border-neutral-700 py-3 w-full hover:bg-neutral-700 hover:text-white transition-colors duration-300'>
            Confirm Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
