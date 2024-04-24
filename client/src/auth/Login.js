import React, { useEffect, useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

<<<<<<< HEAD
=======
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

>>>>>>> jc
function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (setValue) => (event) => {
    setValue(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

<<<<<<< HEAD
=======
  const handleClick1 = () => {
    navigate('/resetpassword');
  };

  const handleClick2 = () => {
    navigate('/');
  };

>>>>>>> jc
  const handleLogin = async () => {
    try {
      const credentials = {
        email,
        password
      }
  
      const response = await axios.post('http://localhost:8800/api/auth/login', credentials);
  
      console.log('Login successful');
      console.log('Response:', response.data);
  
      // Redirect to the dashboard route after successful login
      navigate("/dashboard");
  
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Unauthorized (401) status code indicates incorrect password
        console.error('Incorrect password');
        setErrorMessage('Incorrect password'); // Set error message for incorrect password
      } else {
        // Handle other errors
        console.error('Login failed:', error.response ? error.response.data.message : error.message);
        setErrorMessage('Login failed. Please try again later.');
      }
    }
  }
  

  useEffect(() => {
    console.log(email);
    console.log(password);
  }, [password, email]);

  return (
<<<<<<< HEAD
    <div className="flex-col flex justify-center items-center mt-12">
      <div className="box-border border-2 w-[500px] h-[500px] border-black rounded-xl">
        <div>
          <div className="ml-12 pb-16">
            <button className="ml-[415px] text-2xl pt-3">
              <HiOutlineXMark />
            </button>
            <h1 className="text-4xl font-black">Sign-in</h1>
            <p>Stay updated on your bookings.</p>
          </div>

          <div className="text-center">
            <div className="pb-5">
              <input
                value={email}
                className="border border-black rounded-lg py-3 px-2 w-[80%]"
                name="email"
                placeholder="Username or email:"
                onChange={handleInputChange(setEmail)}
              />
            </div>

            <div className="relative">
              <input
                className="border border-black rounded-lg py-3 px-2 w-[80%]"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={handleInputChange(setPassword)}
                placeholder="Password:"
              />

              <button
                className="absolute top-1/2 transform -translate-y-1/2 right-4 focus:outline-none pr-12"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <BsEye /> : <BsEyeSlash />}
              </button>
            </div>
          </div>

          <div className="list-none ml-12 pt-2">
            <li className="font-medium">
              <a href="#">Forgot password?</a>
            </li>
          </div>

          <div className="text-center pt-10 pb-5">
            <button
              onClick={handleLogin}
              className=" text-white bg-black font-semibold rounded-full text-xl py-3 w-[80%] "
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
      <div className="text-center font-light pt-3">
        <h1>
          <span>&#169;</span>2023 DeskMe, All right reserved. Privacy Policy{" "}
          <br /> and Terms & Conditions.
=======
    <div className='flex flex-col items-center justify-center mt-32'>
      <div className='border-2 border-black rounded-lg shadow-lg w-full max-w-md p-8'>
        <div className='flex justify-end'>
          <button onClick={handleClick2} className='text-2xl'><HiOutlineXMark /></button>
        </div>
        <h1 className='text-4xl font-black text-left'>Sign in</h1>
        <p className='font-normal text-left mt-1'>Stay updated on your bookings.</p>

        <div className='mt-12'>
          <InputField
            type='email'
            name='email'
            placeholder='Email Address:'
            value={email}
            onChange={handleInputChange(setEmail)}
            icon={null}
          />
        </div>

        <div className='relative mt-4'>
          <InputField
            type={showPassword ? 'text' : 'password'}
            name='password'
            placeholder='Password:'
            value={password}
            onChange={handleInputChange(setPassword)}
            icon={{
              component: showPassword ? <BsEyeSlash /> : <BsEye />,
              onClick: togglePasswordVisibility,
            }}
          />
        </div>

        <div class="flex items-left mt-4 mb-4">
          <input type="checkbox" id="ce976249-77f6-469a-9301-40f1eec73660" class="w-4 h-5 text-black bg-gray-100 border-black rounded hover:cursor-pointer" />
          <label for="ce976249-77f6-469a-9301-40f1eec73660" class="ms-2 text-sm font-medium text-black dark:text-black hover:cursor-pointer">Remember Me</label>
          <div class="list-none ml-auto">
            <li onClick={handleClick1} class="font-medium text-sm hover:underline cursor-pointer">Forgot password?</li>
          </div>
        </div>

        <div className='text-center mt-14 mb-5'>
          <button onClick={handleLogin} className='bg-white text-black font-semibold rounded-2xl border-2 border-black py-3 w-full hover:bg-black hover:text-white transition-colors duration-300'>Sign in</button>
        </div>
      </div>
      <div className='text-center text-base font-light mt-2'>
        <h1>
          <span>&#169;</span>2023 DeskMe, All right reserved. Privacy Policy <br /> and Terms & Conditions.
>>>>>>> jc
        </h1>
      </div>
    </div>
  );
}

export default Login;