import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const features = [
    {
        icon:
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>,
        title: "Fast Refresh",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius."
    },
    {
        icon:
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>,
        title: "Analytics",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius."
    },
    {
        icon:
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>,
        title: "Datacenter security",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius."
    },
    {
        icon:
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
            </svg>,
        title: "Build on your terms",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius."
    },
    {
        icon:
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>,
        title: "Safe to use",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius."
    },
    {
        icon:
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
            </svg>,
        title: "Flexible",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius."
    },
]
function Services() {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/Login');
    };

  return (
   <div className='bg-neutral-50 dark:bg-neutral-900'>
    
      <div className=''>
     
          <Navbar/>

          <section className="py-14">
            <div className="max-w-screen-lg mx-auto px-4 text-gray-600 md:px-8 mt-14">
                <div className="relative max-w-2xl mx-auto sm:text-center">
                    <div className="relative z-10">
                        <h3 className="text-gray-800 dark:text-neutral-100 text-3xl font-semibold sm:text-4xl">
                            Features & Services
                        </h3>
                        <p className="mt-3 dark:text-neutral-300">
                            With the ever-evolving landscape of remote and hybrid work environments, Deskme's commitment
                            to innovation ensures that businesses stay ahead of the curve.
                        </p>
                    </div>
                </div>
                <div className="relative mt-12">
                    <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {
                            features.map((item, idx) => (
                                <li key={idx} className="bg-white dark:bg-neutral-800 space-y-3 p-4 border rounded-lg">
                                    <div className="text-neutral-900 dark:text-neutral-100 pb-3">
                                        {item.icon}
                                    </div>
                                    <h4 className="text-lg text-gray-800 dark:text-neutral-100 font-semibold">
                                        {item.title}
                                    </h4>
                                    <p className='dark:text-neutral-300'>
                                        {item.desc}
                                    </p>
                                </li>
                            ))
                        }
                    </ul>
                    </div>
                </div>
            </section>

            <span class="relative flex justify-center">
          <div class="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>

          <span class="relative z-10 bg-neutral-50 dark:bg-neutral-900 dark:text-white px-6">Services</span>
          </span>

            <section>
            <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 mt-10">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                <div className="relative h-64 overflow-hidden rounded sm:h-80 lg:order-last lg:h-full">
                    <img
                    alt=""
                    src="https://images.pexels.com/photos/1416530/pexels-photo-1416530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    className="absolute inset-0 h-full w-full object-cover border-[1px] border-neutral-400 shadow-lg"
                    />
                </div>

                <div className="lg:py-24">
                    <h2 className="text-3xl font-bold sm:text-4xl dark:text-neutral-100">Seamless Integration</h2>

                    <p className="mt-4 text-gray-600 dark:text-neutral-300">
                    Deskme understands the importance of seamless integration with existing business systems.
                    Our future services will be designed to integrate effortlessly with your current software and tools,
                    ensuring a smooth transition and minimal disruption to your workflow.
                    </p>

                    <button onClick={handleClick}
                    className="mt-8 inline-block rounded bg-neutral-900 dark:bg-neutral-400 px-12 py-3 text-sm font-medium text-white dark:text-neutral-100 transition hover:bg-neutral-700 dark:hover:text-neutral-700 focus:outline-none focus:ring focus:ring-neutral-400"
                    >
                    Get Started Today
                    </button>
                </div>
                </div>
            </div>
            </section>

          <Footer/>
        </div>
    </div>
  )
}

export default Services