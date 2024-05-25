import React, { useEffect, useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

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

function Login() {
  // Email
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState('');
  // Password
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  // Toggle Password Visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Navigation
  const navigate = useNavigate();

  const handleClick1 = () => {
    navigate('/resetpassword');
  };

  const handleClick2 = () => {
    navigate('/');
  };

  // Validations
  const isEmpty = (str) => {
    return str.trim() === '';
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (isEmpty(email)) {
      setEmailError('Please fill out this field.');
      return;
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    if (isEmpty(password)) {
      setPasswordError('Please fill out this field.');
      return;
    }

    try {
      const credentials = { email, password };
      const response = await axios.post('http://localhost:8800/api/auth/login', credentials);

      console.log('Login successful');
      console.log('Response:', response.data);

      // Ideally, the token should be stored in a more secure manner (e.g., HTTP-only cookies)
      sessionStorage.setItem('userCredentials', JSON.stringify(response.data));

      // Redirect to the dashboard route after successful login
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Incorrect password');
        setPasswordError('Incorrect password'); // Set error message for incorrect password
      } else {
        console.error('Login failed:', error.response ? error.response.data.message : error.message);
        setPasswordError('Login failed. Please try again.');
      }
    }
  };

  useEffect(() => {
    console.log(email);
    console.log(password);
  }, [password, email]);

  return (
    <div className='flex flex-col items-center justify-center mt-32'>
      <div className='border-[1px] border-neutral-700 rounded-lg shadow-lg w-full max-w-md p-8'>
        <div className='flex justify-end'>
          <button onClick={handleClick2} className='text-2xl text-neutral-700'>
            <HiOutlineXMark />
          </button>
        </div>
        <h1 className='text-4xl font-black text-left text-neutral-700'>Sign in</h1>
        <p className='font-normal text-left mt-1 text-neutral-700'>Stay updated on your bookings.</p>

        <form onSubmit={handleLogin} className='mt-12'>
          <InputField
            type='email'
            name='email'
            placeholder='Email Address:'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={null}
            error={emailError}
          />
          <div className='relative mt-4'>
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
          </div>

          <div className="flex items-left mt-4 mb-4">
            <input type="checkbox" id="rememberMe" className="w-4 h-5 text-neutral-700 bg-gray-100 border-black rounded hover:cursor-pointer" />
            <label htmlFor="rememberMe" className="ms-2 text-sm font-medium text-neutral-700 hover:cursor-pointer">Remember Me</label>
            <div className="list-none ml-auto">
              <li onClick={handleClick1} className="font-medium text-sm hover:underline cursor-pointer text-neutral-700">Forgot password?</li>
            </div>
          </div>

          <div className='text-center mt-14 mb-5'>
            <button type="submit" className='bg-white text-neutral-700 font-semibold rounded-2xl border-[1px] border-neutral-700 py-3 w-full hover:bg-neutral-700 hover:text-white transition-colors duration-300'>Sign in</button>
          </div>
        </form>
      </div>
      <div className='text-center text-base font-light mt-2 text-neutral-700'>
        <h1>
          <span>&#169;</span>2023 DeskMe, All right reserved. Privacy Policy <br /> and Terms & Conditions.
        </h1>
      </div>
    </div>
  );
}

export default Login;
