import React from 'react'

const Footer = () => {
  return (
    <div>
            <footer
            className="text-center text-neutral-950 lg:text-left">
            <div
                className="flex items-center justify-center border-t-2 border-b-2 border-black p-6 lg:justify-between">
                <div className="mr-12 hidden lg:block font-semibold">
                <span>Get connected with us on social networks:</span>
                </div>
                {/* <!-- Social network icons container --> */}
                <div className="flex justify-center">
                <a className="mr-6 text-neutral-600 dark:text-neutral-950 transition duration-300 transform hover:scale-150 cursor-pointer">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path
                        d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                </a>
                <a className="mr-6 text-neutral-600 dark:text-neutral-950 transition duration-300 transform hover:scale-150 cursor-pointer">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path
                        d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                    </svg>
                </a>
                <a className="text-neutral-600 dark:text-neutral-950 transition duration-300 transform hover:scale-150 cursor-pointer">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path
                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                </a>
                </div>
            </div>

            {/* <!-- Main container div: holds the entire content of the footer, including four sections (TW Elements, Products, Useful links, and Contact), with responsive styling and appropriate padding/margins. --> */}
            <div className="mx-6 py-10 text-center md:text-left">
                <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-5">
                {/* <!-- DeskMe section --> */}
                <div className="">
                    <h6
                    className="mb-4 text-2xl flex items-center justify-center font-bold md:justify-start">
                    DeskMe
                    </h6>
                    <p>
                    Streamline your workspace experience with our intuitive booking system. 
                    We ensures your workspace is ready when you are.
                    </p>
                </div>
                {/* <!-- Useful links section --> */}
                <div className="">
                    <h6
                    className="mb-4 flex justify-center font-bold md:justify-start">
                    Quick links
                    </h6>
                    <p className="mb-4">
                    <a className="text-neutral-600 dark:text-neutral-950 hover:underline underline-offset-2 cursor-pointer"
                    >Home</a>
                    </p>
                    <p className="mb-4">
                    <a className="text-neutral-600 dark:text-neutral-950 hover:underline underline-offset-2 cursor-pointer"
                    >About us</a>
                    </p>
                    <p className="mb-4">
                    <a className="text-neutral-600 dark:text-neutral-950 hover:underline underline-offset-2 cursor-pointer"
                    >Services</a>
                    </p>
                    <p>
                    <a className="text-neutral-600 dark:text-neutral-950 hover:underline underline-offset-2 cursor-pointer"
                    >Contact Us</a>
                    </p>
                </div>
                {/* <!-- Company section --> */}
                <div className="">
                    <h6
                    className="mb-4 flex justify-center font-bold md:justify-start">
                    Company
                    </h6>
                    <p className="mb-4">
                    <a className="text-neutral-600 dark:text-neutral-950 hover:underline underline-offset-2 cursor-pointer"
                    >Pricing</a>
                    </p>
                    <p className="mb-4">
                    <a className="text-neutral-600 dark:text-neutral-950 hover:underline underline-offset-2 cursor-pointer"
                    >Terms & Conditions</a>
                    </p>
                    <p className="mb-4">
                    <a className="text-neutral-600 dark:text-neutral-950 hover:underline underline-offset-2 cursor-pointer"
                    >Privacy Policy</a>
                    </p>
                </div>
                {/* <!-- Contact section --> */}
                <div>
                    <h6
                    className="mb-4 flex justify-center font-bold md:justify-start">
                    Contact
                    </h6>
                    <p className="mb-4 flex items-center justify-center md:justify-start">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-3 h-5 w-5">
                        <path
                        d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                        <path
                        d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                    </svg>
                    Apalit, Pampanga 2016
                    </p>
                    <p className="mb-4 flex items-center justify-center md:justify-start">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-3 h-5 w-5">
                        <path
                        d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                        <path
                        d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                    </svg>
                    deskme@gmail.com
                    </p>
                    <p className="mb-4 flex items-center justify-center md:justify-start">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-3 h-5 w-5">
                        <path
                        fillRule="evenodd"
                        d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                        clipRule="evenodd" />
                    </svg>
                    +63 0143 1103
                    </p>
                </div>
                {/* <!-- Special thanks section --> */}
                <div className="">
                    <h6
                    className="mb-4 flex justify-center font-bold md:justify-start">
                    Help
                    </h6>
                    <p className="mb-4">
                    <a className="text-neutral-600 dark:text-neutral-950 hover:underline underline-offset-2 cursor-pointer"
                    >FAQs and Guides</a>
                    </p>
                    <p className="mb-4">
                    <a className="text-neutral-600 dark:text-neutral-950 hover:underline underline-offset-2 cursor-pointer"
                    >Customer Support</a>
                    </p>
                </div>
                </div>
            </div>

            {/* <!--Copyright section--> */}
            <div className="p-6 text-center border-t-2 border-black">
                <span>© 2023 DeskMe, All right reserved. </span>
            </div>
            </footer>
        </div>
  )
}
export default Footer
    