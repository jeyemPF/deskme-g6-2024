import React from 'react'
import Navbar from '../components/Navbar'
import Conpic1 from '../assets/Conpic1.avif'
import Conpic2 from '../assets/Conpic2.jpg'
import Footer from '../components/Footer'

function Contact() {
  return (
  <div className='container'>
    <Navbar/>
    <div className=" flex flex-col justify-center items-center pb-10">
            <h1 className="font-black text-5xl mt-10">Ask how we can help you:</h1>
            <p className="text-lg mt-4 mb-8">
                Questions, bug reports, feedback — we're here for it all.
            </p>
            <div className="flex justify-center items-center flex-col md:flex-row lg:ml-56 md:ml-12">
                <div className="box-border justify-center border-black rounded-2xl h-[500px] w-[700px] border xs:w-[350px] sm:w-[500px] sm:h-[600px] sm:flex-col lg:w-[700px] md:w-[700px]">
                    <h1 className="font-bold text-xl mt-10 ml-8">Select a topic:</h1>
                    <div className='flex gap-5 mt-5 ml-8'>
                      <button className='border border-black h-[20%] w-[25%] rounded-full py-2 hover:bg-neutral-700 hover:text-white transition-colors duration-300 dark:text-neutral-300 dark:bg-neutral-900 dark:border-neutral-300 dark:hover:bg-neutral-300 dark:hover:text-neutral-700 dark:transition-colors dark:duration-300'>Booking</button>
                      <button className='border border-black h-[20%] w-[40%] rounded-full py-2 hover:bg-neutral-700 hover:text-white transition-colors duration-300 dark:text-neutral-300 dark:bg-neutral-900 dark:border-neutral-300 dark:hover:bg-neutral-300 dark:hover:text-neutral-700 dark:transition-colors dark:duration-300'>Bugs encountered</button>
                      <button className='border border-black h-[20%] w-[20%] rounded-full py-2 hover:bg-neutral-700 hover:text-white transition-colors duration-300 dark:text-neutral-300 dark:bg-neutral-900 dark:border-neutral-300 dark:hover:bg-neutral-300 dark:hover:text-neutral-700 dark:transition-colors dark:duration-300'>Sign In</button>
                    </div>
                    <div className='flex gap-5 mt-5 ml-8'>
                      <button className='border border-black h-[20%] w-[30%] rounded-full py-2  hover:bg-neutral-700 hover:text-white transition-colors duration-300 dark:text-neutral-300 dark:bg-neutral-900 dark:border-neutral-300 dark:hover:bg-neutral-300 dark:hover:text-neutral-700 dark:transition-colors dark:duration-300'>Notifications</button>
                      <button className='border border-black h-[20%] w-[40%] rounded-full py-2  hover:bg-neutral-700 hover:text-white transition-colors duration-300 dark:text-neutral-300 dark:bg-neutral-900 dark:border-neutral-300 dark:hover:bg-neutral-300 dark:hover:text-neutral-700 dark:transition-colors dark:duration-300'>Slow Information</button>
                    </div>
                    <div className='flex gap-5 mt-5 ml-8'>
                      <button className='border border-black h-[20%] w-[45%] rounded-full py-2  hover:bg-neutral-700 hover:text-white transition-colors duration-300 dark:text-neutral-300 dark:bg-neutral-900 dark:border-neutral-300 dark:hover:bg-neutral-300 dark:hover:text-neutral-700 dark:transition-colors dark:duration-300'>Cancellation of desk</button>
                      <button className='border border-black h-[20%] w-[40%] rounded-full py-2  hover:bg-neutral-700 hover:text-white transition-colors duration-300 dark:text-neutral-300 dark:bg-neutral-900 dark:border-neutral-300 dark:hover:bg-neutral-300 dark:hover:text-neutral-700 dark:transition-colors dark:duration-300'>Slow Connections</button>
                    </div>

                    <div className='flex-col mt-8 ml-8'>
                      <h1 className='text-xl font-bold pb-3'>Or tell us what you need help with: </h1>
                      <div className='pb-3'>
                        <input className='border border-black h-[40px] w-[80%] rounded-lg py-5 px-5' placeholder='Enter you concern here:'/>
                      </div>
                     
                      <div>
                        <button className=" md:block text-neutral-700 bg-white font-bold rounded-lg border-2 border-neutral-700 shadow-lg text-sm px-6 py-2.5 hover:bg-neutral-700 hover:text-white transition-colors duration-300 dark:text-neutral-300 dark:bg-neutral-900 dark:border-neutral-300 dark:hover:bg-neutral-300 dark:hover:text-neutral-700 dark:transition-colors dark:duration-300">Submit</button>
                      </div>
                    </div>
                </div>

                <div className=" md:w-1/2 sm:pt-10 sm:pl-18 sm:mr-40 sm:w-52 3xl:pr-48 lg:pr-48 xl:pr-48 flex-col items-center justify-center">
                  <img
                      className="w-72 rounded-2xl ml-20"
                      src={Conpic2}
                      alt="Customer support"
                  />
                  <img
                      className="w-72 rounded-2xl mt-3 ml-60 xl:ml-60 lg:ml-20 sm:ml-20"
                      src={Conpic1}
                      alt="Customer support"
                  />
                </div>
              </div>
        </div>
  <Footer/>
  </div>
  )
}

export default Contact