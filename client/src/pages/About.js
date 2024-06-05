import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';

import peter from '../assets/peter.jpg';
import algen from '../assets/algen.png';
import jayvee from '../assets/jayvee.jpg';
import jc from '../assets/jc.jpg';
import jireh from '../assets/jireh.jpg';
import jm from '../assets/jm.jpg';

const team = [
  {
      avatar: peter,
      name: "Peter Sthanlie Rayos",
      title: "Product Owner",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesettin industry.",
      linkedin: "javascript:void(0)",
      github: "javascript:void(0)"
  },
  {
      avatar: jc,
      name: "John Carlo Diga",
      title: "Team Leader",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesettin industry.",
      linkedin: "javascript:void(0)",
      github: "javascript:void(0)"
  },
  {
      avatar: jm,
      name: "Johnmack Faeldonia",
      title: "Head Developer",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesettin industry.",
      linkedin: "javascript:void(0)",
      github: "javascript:void(0)"
  },
  {
      avatar: jayvee,
      name: "Jayvee Brian Ibale",
      title: "Front-End Developer",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesettin industry.",
      linkedin: "javascript:void(0)",
      twitter: "javascript:void(0)",
      github: "javascript:void(0)"
  },
  {
      avatar: jireh,
      name: "Jireh Belen",
      title: "Front-End Developer",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesettin industry.",
      linkedin: "javascript:void(0)",
      twitter: "javascript:void(0)",
      github: "javascript:void(0)"
  },
  {
      avatar: algen,
      name: "Algen Rey Ubang",
      title: "Scrum Master",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesettin industry.",
      linkedin: "javascript:void(0)",
      twitter: "javascript:void(0)",
      github: "javascript:void(0)"
  },
]

function About()  { 
  return (
    <div className='bg-neutral-50 dark:bg-neutral-900'>
    
      <div className=''>
     
          <Navbar/>

          <section className="py-14">
                <div className="max-w-screen-lg mx-auto md:px-8 mt-20">
                    <div className="items-center gap-x-12 sm:px-4 md:px-0 lg:flex">
                        <div className="flex-1 sm:hidden lg:block">
                            <img src="https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="md:max-w-lg sm:rounded-lg" alt="" />
                        </div>
                        <div className="max-w-xl px-4 space-y-3 mt-6 sm:px-0 md:mt-0 lg:max-w-2xl">
                            <h3 className="text-neutral-600 dark:text-neutral-100 font-semibold">
                                ABOUT US
                            </h3>
                            <p className="text-gray-800 dark:text-neutral-300 text-3xl font-semibold sm:text-4xl">
                                Deskme company founded on 2023.
                            </p>
                            <p className="mt-3 text-gray-600 dark:text-neutral-400">
                                Designed to streamline the process of reserving desks, 
                                our system offers a user-friendly interface that allows employees to effortlessly
                                book and manage their workspace needs.
                            </p>
                            <a href="javascript:void(0)" className="inline-flex gap-x-1 items-center text-neutral-600 dark:text-neutral-200 hover:text-neutral-500 duration-150 font-medium">
                                Learn more
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <span class="relative flex justify-center">
          <div class="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>

          <span class="relative z-10 bg-neutral-50 dark:bg-neutral-900 dark:text-white px-6">Team</span>
          </span>

          <section className="py-14">
            <div className="max-w-screen-lg mx-auto px-4 md:px-8">
                <div className="max-w-xl mx-auto text-center">
                    <h3 className="text-gray-800 dark:text-neutral-100 text-3xl font-semibold sm:text-4xl">
                        Meet our team
                    </h3>
                    <p className="text-gray-600 dark:text-neutral-300 mt-3">
                        We are a diverse group of dedicated professionals, each bringing unique skills and experiences to the table.
                        Our collaborative spirit and shared commitment to excellence drive us to innovate and deliver exceptional
                        results for our clients. 
                    </p>
                </div>
                <div className="mt-12">
                    <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                        {
                            team.map((item, idx) => (
                                <li key={idx}>
                                    <div className="w-full h-60 sm:h-52 md:h-56">
                                        <img
                                            src={item.avatar}
                                            className="w-full h-full object-cover object-center shadow-md rounded-xl"
                                            alt=""
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <h4 className="text-lg text-gray-700 dark:text-neutral-100 font-semibold">{item.name}</h4>
                                        <p className="text-neutral-500">{item.title}</p>
                                        <p className="text-gray-600 dark:text-neutral-400 mt-2">{item.desc}</p>
                                        <div className="mt-3 flex gap-4 text-gray-400">
                                            <a href={item.github}>
                                                <svg className="w-5 h-5 duration-150 hover:text-gray-500" fill="currentColor" viewBox="0 0 48 48"><g fill="currentColor" clip-path="url(#clip0_910_44)"><path fill-rule="evenodd" d="M24 1A24.086 24.086 0 008.454 6.693 23.834 23.834 0 00.319 21.044a23.754 23.754 0 003.153 16.172 23.98 23.98 0 0012.938 10.29c1.192.221 1.641-.518 1.641-1.146 0-.628-.024-2.45-.032-4.442-6.676 1.443-8.087-2.817-8.087-2.817-1.089-2.766-2.663-3.493-2.663-3.493-2.178-1.478.163-1.45.163-1.45 2.413.17 3.68 2.461 3.68 2.461 2.138 3.648 5.616 2.593 6.983 1.976.215-1.545.838-2.596 1.526-3.193-5.333-.6-10.937-2.647-10.937-11.791a9.213 9.213 0 012.472-6.406c-.246-.6-1.069-3.026.234-6.322 0 0 2.015-.64 6.602 2.446a22.904 22.904 0 0112.017 0c4.583-3.086 6.594-2.446 6.594-2.446 1.307 3.288.484 5.714.238 6.322a9.194 9.194 0 012.476 6.414c0 9.163-5.615 11.183-10.957 11.772.859.742 1.626 2.193 1.626 4.421 0 3.193-.028 5.762-.028 6.548 0 .636.433 1.38 1.65 1.146a23.98 23.98 0 0012.938-10.291 23.754 23.754 0 003.151-16.175A23.834 23.834 0 0039.56 6.69 24.086 24.086 0 0024.009 1H24z" clip-rule="evenodd" /><path d="M9.089 35.264c-.052.119-.243.154-.398.071-.155-.083-.27-.237-.214-.36.056-.122.242-.154.397-.07.155.082.274.24.215.359zM10.063 36.343a.4.4 0 01-.493-.11c-.155-.167-.187-.396-.068-.499.12-.102.334-.055.489.11.155.167.19.396.072.499zM11.008 37.714c-.147.103-.397 0-.536-.206a.395.395 0 010-.569c.147-.098.397 0 .537.202.139.202.143.47 0 .573zM12.292 39.042c-.131.146-.397.106-.616-.091-.219-.198-.27-.467-.139-.609.131-.142.397-.102.624.091.226.194.27.466.131.609zM14.092 39.816c-.06.186-.33.269-.6.19-.27-.08-.449-.3-.397-.49.051-.19.326-.277.6-.19.274.087.449.297.397.49zM16.056 39.95c0 .194-.223.36-.509.364-.286.004-.52-.154-.52-.348 0-.193.222-.36.508-.363.286-.004.52.15.52.347zM17.884 39.646c.036.194-.163.395-.45.443-.285.047-.536-.067-.572-.257-.035-.19.171-.395.45-.447.278-.05.536.068.572.261z" /></g><defs><clipPath id="clip0_910_44"><path fill="currentColor" d="M0 0h48v48H0z" /></clipPath></defs></svg>
                                            </a>
                                            <a href={item.linkedin}>
                                                <svg className="w-5 h-5 duration-150 hover:text-gray-500" fill="none" viewBox="0 0 48 48"><g clip-path="url(#clip0_17_68)"><path fill="currentColor" d="M44.447 0H3.544C1.584 0 0 1.547 0 3.46V44.53C0 46.444 1.584 48 3.544 48h40.903C46.407 48 48 46.444 48 44.54V3.46C48 1.546 46.406 0 44.447 0zM14.24 40.903H7.116V17.991h7.125v22.912zM10.678 14.87a4.127 4.127 0 01-4.134-4.125 4.127 4.127 0 014.134-4.125 4.125 4.125 0 010 8.25zm30.225 26.034h-7.115V29.766c0-2.653-.047-6.075-3.704-6.075-3.703 0-4.265 2.896-4.265 5.887v11.325h-7.107V17.991h6.826v3.13h.093c.947-1.8 3.272-3.702 6.731-3.702 7.21 0 8.541 4.744 8.541 10.912v12.572z" /></g><defs><clipPath id="clip0_17_68"><path fill="currentColor" d="M0 0h48v48H0z" /></clipPath></defs></svg>
                                            </a>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                
            </div>
        </section>

        <Footer/>                       

        </div>
    </div>
  )
}

export default About