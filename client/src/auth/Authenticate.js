import React, { useState } from 'react';
import { HiOutlineXMark } from "react-icons/hi2";
import { PiShieldWarningBold } from "react-icons/pi";   
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Authenticate() {
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setCode(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8800/api/auth/login', { code });

      // Assuming the authentication is successful, you can redirect the user to the dashboard
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center pt-5 pb-5'>
      <div className='box-border border-2 w-[500px] h-[550px] border-black rounded-xl'>
        <div>
            <div className='ml-12'>
                <button className='ml-[415px] text-2xl pt-3'><HiOutlineXMark /></button>
            </div>

            <div className='flex flex-col items-center'>
                <p className='text-7xl pb-5'><PiShieldWarningBold /></p>
                <h1 className='text-4xl font-black'>Authenticate</h1>
                <h1 className='text-4xl font-black'>Your Account</h1>
            </div>
            <div className='pt-5'>
                <h1 className='text-center pb-3'>Please confirm your account by entering <br/> the authorization code sent to <br/> <strong> Registered email </strong></h1>
                <form onSubmit={handleSubmit} className='text-center pt-5'>
                  <input
                    type="text"
                    value={code}
                    onChange={handleChange}
                    placeholder="Enter code"
                    className="border border-black rounded-lg py-3 px-2 w-[70%] mx-auto"
                  />
                  <h1 className='pt-3'>It may take a minute to receive your code. <br/>
                    Haven't received it? <a className='text-blue-900' href='/'><u>Resend a new code.</u></a></h1>
                  <br/>
                  <button type="submit" className=" text-white bg-black font-semibold rounded-full text-base py-3 w-[25%]">Submit</button>
                </form>
            </div>
        </div>
      </div>
        <div className='text-center font-light pt-3'>
            <h1><span>&#169;</span>2023 DeskMe, All right reserved. Privacy Policy <br/> and Terms & Conditions.</h1>
        </div>
    </div>
  )
}

export default Authenticate;
