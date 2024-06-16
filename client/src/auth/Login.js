import React, { useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Switcher from "../components/Switcher";

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

const Login = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleClick1 = () => {
    navigate('/resetpassword');
  };

  const handleClick2 = () => {
    navigate('/');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateFields = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim()) {
      setEmailError('Please fill out this field.');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }
    if (!password.trim()) {
      setPasswordError('Please fill out this field.');
      isValid = false;
    }
    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;
  
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8800/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.user._id); // Store the user ID
      sessionStorage.setItem('userCredentials', JSON.stringify(response.data));
      
      const userRole = response.data.user.role;
      if (userRole === 'admin') navigate("/admindashboard");
      else if (userRole === 'superadmin') navigate("/superdashboard");
      else if (userRole === 'officemanager') navigate('/officedashboard');
      else navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setPasswordError('Incorrect password');
      } else {
        setPasswordError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className='min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900'>
      <div className='w-full max-w-md p-8 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-700 dark:border-neutral-200'>
        <div className='flex justify-end'>
          <div className='hidden'>
            <Switcher />
          </div>
          <button onClick={handleClick2} className='text-2xl text-neutral-700 dark:text-neutral-200'><HiOutlineXMark /></button>
        </div>
        <h1 className='text-4xl font-black text-left text-neutral-700 dark:text-neutral-200'>Sign in</h1>
        <p className='font-normal text-left mt-1 text-neutral-700 dark:text-neutral-200'>Stay updated on your bookings.</p>

        <div className='mt-12'>
          <InputField
            type='email'
            name='email'
            placeholder='Email Address:'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={null}
            error={emailError}
          />
        </div>

        <div className='relative mt-4'>
          <InputField
            style={{ display: 'flex', alignItems: 'center' }}
            type={showPassword ? 'text' : 'password'}
            name='password'
            placeholder='Password:'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={{
              component: showPassword ? <BsEye /> : <BsEyeSlash />,
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
        </div>

        <div className="flex items-left mt-4 mb-4">
          <input type="checkbox" id="rememberMe" className="w-4 h-5 text-neutral-700 dark:text-neutral-200 bg-gray-100 dark:bg-neutral-700 border-black dark:border-neutral-200 rounded hover:cursor-pointer" />
          <label htmlFor="rememberMe" className="ms-2 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:cursor-pointer">Remember Me</label>
          <div className="list-none ml-auto">
            <li onClick={handleClick1} className="font-medium text-sm hover:underline cursor-pointer text-neutral-700 dark:text-neutral-200">Forgot password?</li>
          </div>
        </div>

        <div className='text-center mt-14 mb-5'>
          <button
            onClick={handleLogin}
            className={`bg-white dark:bg-neutral-700 text-neutral-700 dark:text-white font-semibold rounded-2xl border border-neutral-700 dark:border-neutral-200 py-3 w-full transition-colors duration-300 ${loading ? 'cursor-not-allowed' : 'hover:bg-neutral-700 hover:text-white dark:hover:bg-neutral-500 dark:hover:text-neutral-200'}`}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
