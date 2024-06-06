
export default () => {

const contactMethods = [
       
    {
        icon:
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
        ,
        contact: "La Verdad Christian College Inc. Apalit Pampanga."
    },
]


return (
    <main className="py-14 container">
        <div className="max-w-screen-lg mx-auto px-4 text-gray-600 md:px-8">
            <div className="max-w-lg mx-auto gap-12 justify-between lg:flex lg:max-w-none">
                <div className="max-w-lg space-y-3">
                    <h3 className="text-neutral-600 dark:text-neutral-200 text-xl font-semibold">
                        Contact
                    </h3>
                    <p className="text-gray-800 dark:text-neutral-100 text-3xl font-semibold sm:text-4xl">
                        Let us know how we can help
                    </p>
                    <p className="dark:text-neutral-300">
                        We’re here to help and answer any question you might have, We look forward to hearing from you! Please fill out the form, or the contact information on the right side.
                    </p>
                    <div>
                        <ul className="mt-6 flex  flex-wrap gap-x-10 gap-y-6 items-center">
                            {
                                contactMethods.map((item, idx) => (
                                    <li key={idx} className="flex gap-y-3">
                                        <div className="flex-none text-gray-400 dark:text-neutral-100">
                                            {item.icon}
                                        </div>
                                        <p className="dark:text-neutral-300">{item.contact}</p>
                                        
                                    </li>
                                    
                                ))
                            }

<iframe paddingleft="2" width="400" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=La%20Verdad%20Christian%20College,%20XQ55+J92,%20MacArthur%20Hwy,%20Apalit,%20Pampanga%22%20to%20%22La%20Verdad%20Christian%20College,%20XQ55+J92,%20MacArthur%20Hwy,%20Apalit,%20Pampanga+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps vehicle tracker</a></iframe>
                        </ul>
                    </div>
                </div>
                <div className="flex-1 mt-10 sm:max-w-lg lg:max-w-md p-5 rounded border-[1px] border-neutral-300">
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="space-y-5 mt-5"
                    >
                        <div>
                            <label className="font-medium dark:text-neutral-300">
                                Full name
                            </label>
                            <input
                                type="text"
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-neutral-600 shadow-sm rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="font-medium dark:text-neutral-300">
                                Email
                            </label>
                            <input
                                type="email"
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-neutral-600 shadow-sm rounded-lg"
                            />
                        </div>
                        
                        <div>
                            <label className="font-medium dark:text-neutral-300">
                                Message
                            </label>
                            <textarea required className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-neutral-600 shadow-sm rounded-lg"></textarea>
                        </div>
                        <button
                            className="w-full px-4 py-2 text-white font-normal bg-neutral-600 hover:bg-neutral-500 active:bg-neutral-600 rounded duration-150"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </main>
)
}
