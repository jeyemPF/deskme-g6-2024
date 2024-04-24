import React from 'react'
import { HiOutlineXMark } from "react-icons/hi2";
import { PiShieldWarningBold } from "react-icons/pi"; 
import { useNavigate } from 'react-router-dom';



function AuthenticateSuccess() {
  
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className='flex flex-col justify-center items-center mt-12 mb-5'>
      <div className='box-border border-2 w-[500px] h-[500px] border-black rounded-xl'>
        <div className='mt-28'>
            <div className='flex flex-col items-center'>
                <p className='text-8xl pb-5'><PiShieldWarningBold /></p>
                <h1 className='text-4xl font-black'>Authentication</h1>
                <h1 className='text-4xl font-black'>Success!</h1>
            </div>
            <div className='pt-5 text-center'>
                <h1 className='text-center'>You have successfully verified your account!</h1>
                <div className='pt-5'>
                    <button onClick={handleClick} type="submit" className=" text-white bg-black font-semibold rounded-full text-base py-3 w-[25%]">Done</button>
                </div>
            </div>
        </div>
      </div>
        <div className='text-center font-light pt-3'>
            <h1><span>&#169;</span>2023 DeskMe, All right reserved. Privacy Policy <br/> and Terms & Conditions.</h1>
        </div>
    </div>
  )
}

export default AuthenticateSuccess