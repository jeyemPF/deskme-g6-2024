import { useState } from "react"
import desk1 from '../assets/desk1.avif';    
import desk2 from '../assets/desk2.avif';
import { PiShieldCheckBold } from "react-icons/pi";
import { PiUsersThreeBold } from "react-icons/pi";
import { PiFolderLockBold } from "react-icons/pi";
import { PiRocketFill } from "react-icons/pi";
import { PiBookBookmarkFill } from "react-icons/pi";
import { PiCloudArrowUpFill } from "react-icons/pi";
import { TbClockPlus } from "react-icons/tb";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import FAQ from "../components/FAQ";

const stats = [
  { id: 1, name: 'Daily Active Users', value: '20,203' },
  { id: 2, name: 'Market Value | Deskme', value: '$100 million' },
  { id: 3, name: 'New Users Annually', value: '3,000' },
]

function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Login');
  };

  const faqsList = [
    {
        q: "What are some random questions to ask?",
        a: "That's exactly the reason we created this random question generator. There are hundreds of random questions to choose from so you're able to find the perfect random question.",
        href: "javascript:void(0)",
    },
    {
        q: "Do you include common questions?",
        a: "This generator doesn't include most common questions. The thought is that you can come up with common questions on your own so most of the questions in this generator.",
        href: "javascript:void(0)",
    },
    {
        q: "Can I use this for 21 questions?",
        a: "Yes! there are two ways that you can use this question generator depending on what you're after. You can indicate that you want 21 questions generated.",
        href: "javascript:void(0)",
    },
    {
        q: "Are these questions for girls or for boys?",
        a: "The questions in this generator are gender neutral and can be used to ask either male of females (or any other gender the person identifies with).",
        href: "javascript:void(0)",
    },
    {
        q: "What do you wish you had more talent doing?",
        a: "If you've been searching for a way to get random questions, you've landed on the correct webpage. We created the Random Question Generator to ask you as many random questions as your heart desires.",
        href: "javascript:void(0)",
    }
]

return (
  <div className='bg-neutral-100 dark:bg-neutral-900'>
    <div className='container'>
      <Navbar/>
          <div className='flex flex-col xl:flex-row items-center'>
            <div className='w-full md:w-2/4y'>
              <h1 className='text-2xl xl:ml-32 xl:text-left sm:text-center sm:text-base sm:pt-12 sm:ml-0'>
                <span className='text-5xl text-neutral-800 font-extrabold leading-8 lg:text-5xl md:text-4xl sm:text-2xl dark:text-white'>Make every <i><span className='font-black text-neutral-800 dark:text-white'>click count.</span></i></span>
                <p className='font-normal text-neutral-700 text-lg pt-1 leading-5 lg:text-lg md:text-base sm:text-xs dark:text-neutral-300'>
                DeskMe is built to elevate individuals, providing a seamless <br /> intersection where booking meets brilliance,  empowering <br /> users to thrive through the power of connection <br /> and convenience.
                </p>
                <button onClick={handleClick} className='text-neutral-700 bg-white font-semibold text-lg rounded-lg border-2 border-neutral-700 hover:bg-neutral-700 hover:text-white transition-colors duration-300 mt-3 md:mx-auto md:px-7 md:py-3 sm:px-5 sm:py-2 dark:text-neutral-300 dark:bg-neutral-900 dark:border-neutral-300 dark:hover:bg-neutral-300 dark:hover:text-neutral-700 dark:transition-colors dark:duration-300'>Book Now</button>
              </h1>
            </div>

            <div className='flex items-center justify-center'>
              <div className='flex gap-4 mr-28'>
                <div className='pt-28'>
                  <img className='hidden xl:block lg:h-80 lg:w-96 rounded-xl border-2 border-neutral-700 shadow-xl transition duration-300 transform hover:scale-105 dark:border-neutral-300' src={desk1} alt="Desk 1"/>
                </div>
                <div className='pt-16'>
                  <img className='hidden xl:block lg:h-80 lg:w-96 rounded-xl border-2 border-neutral-700 shadow-xl transition duration-300 transform hover:scale-105 dark:border-neutral-300' src={desk2} alt="Desk 2"/>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-10 pt-20 flex-wrap xs:flex-col text-neutral-700 dark:text-neutral-300">
            <div className="flex items-center mb-10 sm:mb-3 md:mb-10 xs:w-full xs:text-center">
              <p className="p-2 text-2xl xs:text-xl"><PiShieldCheckBold /></p>
              <p className="text-xl xs:text-base xs:block xs:mx-auto">|</p>
              <p className="ml-2 text-base sm:text-lg xs:text-sm font-semibold xs:mx-auto">Security</p>
            </div>
            <div className="flex items-center mb-10 sm:mb-3 md:mb-10 xs:w-full xs:text-center">
              <p className="p-2 text-2xl xs:text-xl"><PiUsersThreeBold /></p>
              <p className="text-xl xs:text-base xs:block xs:mx-auto">|</p>
              <p className="ml-2 text-base sm:text-lg xs:text-sm font-semibold xs:mx-auto">Friendly</p>
            </div>
            <div className="flex items-center sm:mb-3 md:mb-10 xs:w-full xs:text-center">
              <p className="p-2 text-2xl xs:text-xl"><PiFolderLockBold /></p>
              <p className="text-xl xs:text-base xs:block xs:mx-auto">|</p>
              <p className="ml-2 text-base sm:text-lg xs:text-sm font-semibold xs:mx-auto">Privacy</p>
            </div>
            <div className="flex items-center sm:mb-3 md:mb-10 xs:w-full xs:text-center">
              <p className="p-2 text-2xl xs:text-xl"><TbClockPlus /></p>
              <p className="text-xl xs:text-base xs:block xs:mx-auto">|</p>
              <p className="ml-2 text-base sm:text-lg xs:text-sm font-semibold xs:mx-auto">Efficient</p>
            </div>
          </div>

          <span class="relative flex justify-center">
          <div class="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>

          <span class="relative z-10 bg-neutral-100 dark:bg-neutral-900 dark:text-white px-6">Reasons & Gallery</span>
          </span>

          <div className='container '>
            <div className='text-center'>
              <div className='text-4xl font-black pt-12 pb-5'>
                <h1 className='text-neutral-700 dark:text-white'>Reasons to choose DeskMe</h1>
              </div>

              <div className='text-xl pb-12 font-normal text-neutral-700 dark:text-neutral-300'>
                  <h1>Where booking becomes a breeze! Your easy pass to <br/> hassle-free reservations. Swift, seamless, and stress-free!</h1>
              </div>

              <div className='flex justify-center pb-10 md:flex-row sm:flex-col sm:items-center md:space-y-0 sm:space-y-4 xl:gap-28 lg:gap-10 md:gap-5'>
                <div className='flex flex-col justify-center items-center box-border h-64 w-64 p-4 border-2 rounded-xl text-neutral-700 border-neutral-700 shadow-lg dark:text-neutral-300 dark:border-neutral-300'>
                  <div className='text-7xl transition duration-300 transform hover:scale-105'><PiRocketFill /></div>
                  <div className='text-xl font-extrabold p-3 text-black-700 dark:text-white'>24/7 Online</div>
                  <div className='text-sm font-medium text-black-500'>
                    Round-the-clock excellence! We're here 24/7, because needs never sleep.
                  </div>
                </div>

                <div className='flex flex-col justify-center items-center box-border h-64 w-64 p-4 border-2 rounded-xl text-neutral-700 border-neutral-700 shadow-lg dark:text-neutral-300 dark:border-neutral-300'>
                  <div className='text-7xl transition duration-300 transform hover:scale-105'><PiBookBookmarkFill /></div>
                  <div className='text-xl font-extrabold p-3 text-black-700 dark:text-white'>Fast Booking</div>
                  <div className='text-sm font-medium text-black-500'>"Quick and easy! Fast booking, because your time matters."</div>
                </div>

                <div className='flex flex-col justify-center items-center box-border h-64 w-64 p-4 border-2 rounded-xl text-neutral-700 border-neutral-700 shadow-lg dark:text-neutral-300 dark:border-neutral-300'>
                  <div className='text-7xl transition duration-300 transform hover:scale-105'><PiCloudArrowUpFill /></div>
                  <div className='text-xl font-extrabold p-3 text-black-700 dark:text-white'>Cloud Storage</div>
                  <div className='text-sm font-medium text-black-500'>"Sky high storage, lightning-fast access your data's new home in the cloud!"</div>
                </div>
              </div>
            </div>
          </div>

          <div className='container lg:-mt-20 lg:-mb-20 sm:-mt-0 sm:mb-10'>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:p-36 sm:p-0">
            <div className="grid gap-4">
              <div>
                <img
                  className="h-auto max-w-full rounded-lg object-cover object-center border-2 border-neutral-700 dark:border-neutral-300 transition duration-300 transform hover:scale-105"
                  src="https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                  alt="gallery-photo"
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg object-cover object-center border-2 border-neutral-700 dark:border-neutral-300 transition duration-300 transform hover:scale-105"
                  src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
                  alt="gallery-photo"
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg object-cover object-center border-2 border-neutral-700 dark:border-neutral-300 transition duration-300 transform hover:scale-105"
                  src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                  alt="gallery-photo"
                />
              </div>
            </div>
            <div className="grid gap-4">
              <div>
                <img
                  className="h-auto max-w-full rounded-lg object-cover object-center border-2 border-neutral-700 dark:border-neutral-300 transition duration-300 transform hover:scale-105"
                  src="https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                  alt="gallery-photo"
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg object-cover object-center border-2 border-neutral-700 dark:border-neutral-300 transition duration-300 transform hover:scale-105"
                  src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                  alt="gallery-photo"
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg object-cover object-center border-2 border-neutral-700 dark:border-neutral-300 transition duration-300 transform hover:scale-105"
                  src="https://docs.material-tailwind.com/img/team-3.jpg"
                  alt="gallery-photo"
                />
              </div>
            </div>
            <div className="grid gap-4">
              <div>
                <img
                  className="h-auto max-w-full rounded-lg object-cover object-center border-2 border-neutral-700 dark:border-neutral-300 transition duration-300 transform hover:scale-105"
                  src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                  alt="gallery-photo"
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg object-cover object-center border-2 border-neutral-700 dark:border-neutral-300 transition duration-300 transform hover:scale-105"
                  src="https://docs.material-tailwind.com/img/team-3.jpg"
                  alt="gallery-photo"
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg object-cover object-center border-2 border-neutral-700 dark:border-neutral-300 transition duration-300 transform hover:scale-105"
                  src="https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                  alt="gallery-photo"
                />
              </div>
            </div>
            <div className="grid gap-4">
              <div>
                <img
                  className="h-auto max-w-full rounded-lg object-cover object-center border-2 border-neutral-700 dark:border-neutral-300 transition duration-300 transform hover:scale-105"
                  src="https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                  alt="gallery-photo"
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg object-cover object-center border-2 border-neutral-700 dark:border-neutral-300 transition duration-300 transform hover:scale-105"
                  src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
                  alt="gallery-photo"
                />
              </div>
            </div>
          </div>
          </div>

          <span class="relative flex justify-center">
          <div class="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>

          <span class="relative z-10 bg-neutral-100 dark:bg-neutral-900 dark:text-white px-6">Statistics & FAQs</span>
          </span>

          <div className='container'>
            <div className="pt-10 pb-10 mt-5 mx-auto max-w-7xl px-6 lg:px-8">
              <dl className="grid grid-cols-1 gap-x-6 gap-y-16 text-center lg:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                    <dt className="text-base leading-7 text-neutral-700 dark:text-neutral-300">{stat.name}</dt>
                    <dd className="order-first text-3xl font-semibold tracking-tight text-neutral-700 dark:text-neutral-100 sm:text-5xl">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className='container'>
            
          </div>

          <div className='container'>
            <FAQ />
          </div>
          
          <div className='container'>
            <div className="bg-neutral-100 dark:bg-neutral-900 mt-10 mb-16 sm:py-1">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <h2 className="text-center text-lg font-semibold leading-8 text-neutral-700 dark:text-neutral-300">
                Trusted by the world’s most innovative teams
              </h2>
              <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                <img
                  className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:bg-white dark:rounded-md"
                  src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
                  alt="Transistor"
                  width={158}
                  height={48}
                />
                <img
                  className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:bg-white dark:rounded-md"
                  src="https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg"
                  alt="Reform"
                  width={158}
                  height={48}
                />
                <img
                  className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:bg-white dark:rounded-md"
                  src="https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg"
                  alt="Tuple"
                  width={158}
                  height={48}
                />
                <img
                  className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1 dark:bg-white dark:rounded-md"
                  src="https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg"
                  alt="SavvyCal"
                  width={158}
                  height={48}
                />
                <img
                  className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1 dark:bg-white dark:rounded-md"
                  src="https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg"
                  alt="Statamic"
                  width={158}
                  height={48}
                />
              </div>
            </div>
          </div>
          </div>

          <Footer/>
      </div>
    </div>
  );
}

export default Home;