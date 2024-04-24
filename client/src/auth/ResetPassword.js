import React, { useState } from 'react';
import { HiOutlineXMark } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';

const InputField = ({ type, name, placeholder, value, onChange, icon }) => {
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
    </div>
  );
};

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const navigate = useNavigate();

  const handleClick1 = () => {
    navigate('/login');
  };

  return (
    <div className='flex flex-col items-center justify-center mt-32'>
      <div className='border-2 border-black rounded-lg shadow-lg w-full max-w-md p-8'>
        <div className='flex justify-end'>
          <button onClick={handleClick1} className='text-2xl'><HiOutlineXMark /></button>
        </div>
        <h1 className='text-4xl font-black text-left'>Reset Password</h1>
        <p className='font-normal text-left mt-1'>Always remember your password.</p>

        <div className='mt-12'>
          <InputField
            type='email'
            name='email'
            placeholder='Email Address:'
            value={email}
            onChange={handleChange}
            icon={null}
          />
            <button type='submit' onClick={handleClick1} className='bg-white text-black font-semibold rounded-2xl mt-12 mb-4 border-2 border-black py-3 w-full hover:bg-black hover:text-white transition-colors duration-300'>Confirm</button>
        </div>
      </div>
      <div className='text-center text-base font-light mt-2'>
        <h1>
          <span>&#169;</span>2023 DeskMe, All right reserved. Privacy Policy <br /> and Terms & Conditions.
        </h1>
      </div>
    </div>
  );
};

export default ResetPassword;
