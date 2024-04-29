import React, { useState } from 'react';
import { HiOutlineXMark } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import { BsEye, BsEyeSlash } from "react-icons/bs";

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

const NewPassword = () => {
    // Password
  const [password, setPassword] = useState("");
  const [newpassword, newsetPassword] = useState("");
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Toggle Password Visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'password') {
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
    if (isEmpty(password)) {
        setPasswordError('Please fill out this field.');
    } else {
      // Add your logic here to handle the confirm button click
    }
  };

  return (
    <div className='flex flex-col items-center justify-center mt-32'>
      <div className='border-[1px] border-neutral-700 rounded-lg shadow-lg w-full max-w-md p-8'>
        <div className='flex justify-end'>
          <button onClick={handleClick1} className='text-2xl'><HiOutlineXMark /></button>
        </div>
        <h1 className='text-4xl font-black text-left text-neutral-700'>New Password</h1>
        <p className='font-normal text-sm text-left mt-2 text-neutral-700'>Setup your new password. Always remember.</p>

        <div className='relative mt-12'>
            <InputField
              style={{ display: 'flex', alignItems: 'center' }}
              type={showPassword ? 'text' : 'password'}
              name='password'
              placeholder='Password:'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && (
              <div
                style={{
                  fontSize: '0.9rem',
                  color: 'red',
                }}
              >
                {passwordError}
              </div>
            )}
            <div className='mt-4'></div>
            <InputField
              style={{ display: 'flex', alignItems: 'center' }}
              type={showPassword ? 'text' : 'password'}
              name='password'
              placeholder='Confirm Password:'
              value={newpassword}
              onChange={(e) => newsetPassword(e.target.value)}
              icon={{
                component: showPassword ? <BsEyeSlash /> : <BsEye />,
                onClick: togglePasswordVisibility,
              }}
            />
            {passwordError && (
              <div
                style={{
                  fontSize: '0.9rem',
                  color: 'red',
                }}
              >
                {passwordError}
              </div>
            )}
            <button className='bg-white text-neutral-700 font-semibold rounded-2xl mt-12 mb-4 border-[1px] border-neutral-700 py-3 w-full hover:bg-neutral-700 hover:text-white transition-colors duration-300' onClick={handleConfirm}>Confirm Password</button>
        </div>
      </div>
      <div className='text-center text-base font-light mt-2 text-neutral-700'>
        <h1>
          <span>&#169;</span>2023 DeskMe, All right reserved. Privacy Policy <br /> and Terms & Conditions.
        </h1>
      </div>
    </div>
  );
};
export default NewPassword;
