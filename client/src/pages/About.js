import React from 'react'
import deskteam from '../assets/deskteam.jpg'
import peter from '../assets/peter.jpg'
import jc from '../assets/jc.jpg'
import jm from '../assets/jm.jpg'
import jireh from '../assets/jireh.jpg'
import jayvee from '../assets/jayvee.jpg'
import algen from '../assets/algen.jpg'
import { FaFacebook } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaGithub } from "react-icons/fa6";
import Logo from '../assets/Logo.png';
import { RiLinkedinLine } from "react-icons/ri";
import { PiFigmaLogoBold } from "react-icons/pi";
import { SiTailwindcss } from "react-icons/si";
import { BiLogoTypescript } from "react-icons/bi";
import { FaGithubSquare } from "react-icons/fa";
import Navbar from '../components/Navbar'


function About()  { 
  return (
    <div>
      <Navbar/>
      <div className='ml-56 mt-10 pb-4'>
        <h1 className='font-black text-5xl'>About</h1>
      </div>

        <div className='flex ml-56'>
          <div className='flex-col'>
            <h1 className='text-xl pb-5'>We are a symphony of ideas, a collective force bound by a common <br/>
             vision. Together, we transform dreams into reality, challenges into <br/>
              triumphs. We are not just a team; we are architects of innovation, <br/>
               creators of success. Let's embark on this journey, where 'we are' <br/>
                is the catalyst for what 'we can achieve'.</h1>

            <div>
              <img className='w-[580px] h-[308px] rounded-lg border-2 border-black' src={deskteam}/>
            </div>
          </div>

            <div className='ml-52 fle-col'>
              <h1 className='text-7xl font-black pb-3'>D</h1>
              <h1 className='text-7xl font-black pb-3'>E</h1>
              <h1 className='text-7xl font-black pb-3'>S</h1>
              <h1 className='text-7xl font-black pb-3'>K</h1>
              <h1 className='text-7xl font-black pb-3'>M</h1>
              <h1 className='text-7xl font-black pb-3'>E</h1>
            </div>

        </div>

        <div className='text-center'>
          <div className='pt-5 pb-10'>
            <h1 className='text-5xl font-black'>Meet the team</h1>
          </div>

          <div className='flex justify-center gap-12 pb-12'>
            <h1 className='text-2xl font-semibold'>Leadership</h1>
            <h1 className='text-2xl font-semibold'>UI/UX Designer</h1>
            <h1 className='text-2xl font-semibold'>Full Stack</h1>
            <h1 className='text-2xl font-semibold'>Business Analyst</h1>
            <h1 className='text-2xl font-semibold'>Tech Writer</h1>
          </div>

        </div>

        <div className='flex justify-center gap-20 pb-10'>

          <div className='box-border h-[500px] w-[280px] border-2 rounded-xl border-black'>
              <div className='text-center'>
                <div className='pl-12 pt-10 pb-5'> 
                  <img className='h-[180px] w-[180px] border-2 rounded-full border-black' src={peter}/>
                </div>

                <div> 
                  <h1 className='text-2xl font-bold'>Peter</h1>
                  <h1 className='text-2xl font-bold pb-8'>Sthanlie Rayos</h1>
                  <h1 className='text-2xl font-light'>Project Manager &</h1>
                  <h1 className='text-2xl font-light'>Documentation</h1>
                </div>

                <div className='flex justify-center gap-4 pt-8'>
                  <p className='text-4xl'><FaFacebook /></p>
                  <p className='text-4xl'><IoLogoLinkedin /></p>
                  <p className='text-4xl'><FaGithub /></p>
                </div>

              </div>

          </div>
          <div className='box-border h-[500px] w-[280px] border-2 rounded-xl border-black'>
             <div className='text-center'>
                <div className='pl-12 pt-10 pb-5'> 
                  <img className='h-[180px] w-[180px] border-2 rounded-full border-black' src={jc}/>
                </div>

                <div> 
                  
                  <h1 className='text-2xl font-bold pb-8 pt-8'>John Carlo Diga</h1>
                  <h1 className='text-2xl font-light'>UX/UI Designer &</h1>
                  <h1 className='text-2xl font-light'>Documentation</h1>
                </div>

                <div className='flex justify-center gap-4 pt-8'>
                  <p className='text-4xl'><FaFacebook /></p>
                  <p className='text-4xl'><IoLogoLinkedin /></p>
                  <p className='text-4xl'><FaGithub /></p>
                </div>

              </div>
          </div>
          <div className='box-border h-[500px] w-[280px]  border-2 rounded-xl border-black'>
            <div className='text-center'>
                  <div className='pl-12 pt-10 pb-5'> 
                    <img className='h-[180px] w-[180px] border-2 rounded-full border-black' src={jm}/>
                  </div>

                  <div> 
                    <h1 className='text-2xl font-bold'>Johnmack</h1>
                    <h1 className='text-2xl font-bold pb-8'>Faeldonia</h1>
                    <h1 className='text-2xl font-light'>Full Stack</h1>
                    <h1 className='text-2xl font-light'>Developer</h1>
                  </div>

                  <div className='flex justify-center gap-4 pt-8'>
                    <p className='text-4xl'><FaFacebook /></p>
                    <p className='text-4xl'><IoLogoLinkedin /></p>
                    <p className='text-4xl'><FaGithub /></p>
                  </div>

                </div>
            </div>
        </div>

        <div className='flex justify-center gap-20'>
          <div className='box-border h-[500px] w-[280px] border-2 rounded-xl border-black'>
          <div className='text-center'>
                <div className='pl-12 pt-10 pb-5'> 
                  <img className='h-[180px] w-[180px] border-2 rounded-full border-black' src={jireh}/>
                </div>

                <div> 
                  
                  <h1 className='text-2xl font-bold pb-8 pt-8'>Jireh Belen</h1>
                  <h1 className='text-2xl font-light'>Analyst &</h1>
                  <h1 className='text-2xl font-light'>Front-End Developer</h1>
                </div>

                <div className='flex justify-center gap-4 pt-8'>
                  <p className='text-4xl'><FaFacebook /></p>
                  <p className='text-4xl'><IoLogoLinkedin /></p>
                  <p className='text-4xl'><FaGithub /></p>
                </div>

              </div>
          </div>
          <div className='box-border h-[500px] w-[280px] border-2 rounded-xl border-black'>
          <div className='text-center'>
                <div className='pl-12 pt-10 pb-5'> 
                  <img className='h-[180px] w-[180px] border-2 rounded-full border-black' src={jayvee}/>
                </div>

                <div> 
                  
                  <h1 className='text-2xl font-bold pb-10 pt-8'>Jayvee Brian Ibale</h1>
                  <h1 className='text-2xl font-light pb-6'>Front-End Developer</h1>
                </div>

                <div className='flex justify-center gap-4 pt-8'>
                  <p className='text-4xl'><FaFacebook /></p>
                  <p className='text-4xl'><IoLogoLinkedin /></p>
                  <p className='text-4xl'><FaGithub /></p>
                </div>

              </div>
          </div>
          <div className='box-border h-[500px] w-[280px]  border-2 rounded-xl border-black'>
          <div className='text-center'>
                <div className='pl-12 pt-10 pb-5'> 
                  <img className='h-[180px] w-[180px] border-2 rounded-full border-black' src={algen}/>
                </div>

                <div> 
                  
                  <h1 className='text-2xl font-bold pb-10 pt-8'>Algen Rey Ubang</h1>
                  <h1 className='text-2xl font-light pb-6'>Documentation</h1>
                </div>

                <div className='flex justify-center gap-4 pt-8'>
                  <p className='text-4xl'><FaFacebook /></p>
                  <p className='text-4xl'><IoLogoLinkedin /></p>
                  <p className='text-4xl'><FaGithub /></p>
                </div>

              </div>
          </div>
        </div>

        <div className="flex justify-center pt-20 pb-16 gap-2">
          <div className='flex-row gap-2'>
              <h1 className='text-3xl font-black pl-3 pb-3'>If you have any questions:</h1>
              <div className='flex gap-2'>
               <input className='border-2 border-black rounded-full p-2 w-[700px]' placeholder='Enter your email:'></input>
               <button className=' text-white bg-black font-semibold rounded-full text-sm p-2 px-5 w-[15%]'>Submit</button>
              </div>
          </div>
          
        </div> 

        <div className='flex justify-center gap-20 pt-10 bg-gray-100'>
            <div className='pb-10'>
                <img className='w-48' src={Logo}/>
                <h1 className='text-xl font-light'>Hotdesk Booking System</h1>
                <h1 className='text-xl font-light'>BSIS 3 | Team 6</h1>
            </div>

             <div>
                 <h1 className='text-2xl font-black pb-5'>Quick links</h1>
                 <h1 className='text-lg'>Home</h1>
                 <h1 className='text-lg'>About Us</h1>
                 <h1 className='text-lg'>Services</h1>
                 <h1 className='text-lg'>Contact Us</h1>
             </div>

             <div>
                 <h1 className='text-2xl font-black pb-5'>Company</h1>
                 <h1 className='text-lg'>Terms & Condition</h1>
                 <h1 className='text-lg'>Privacy Policy</h1>
             </div>

             <div>
                 <h1 className='text-2xl font-black pb-5'>Get in touch</h1>
                 <div className='flex justify-center gap-2'>
                    <h1 className='text-3xl'><FaFacebook/></h1>
                    <h1 className='text-3xl'><RiLinkedinLine /></h1> 
                 </div>
             </div>

             <div>
                 <h1 className='text-2xl font-black pb-5'>Special thanks to</h1>
                 <div className='flex justify-center gap-2'>
                    <h1 className='text-3xl'><PiFigmaLogoBold /></h1>
                    <h1 className='text-3xl'><SiTailwindcss /></h1> 
                 </div>
                    <div className='flex justify-center gap-2'>
                        <h1 className='text-3xl'><BiLogoTypescript /></h1>
                        <h1 className='text-3xl'><FaGithubSquare /></h1>
                    </div>
             </div>
        </div>

    </div>
  )
}

export default About