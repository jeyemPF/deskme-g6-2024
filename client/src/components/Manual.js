// Manual.js //

export default () => {

    const faqsList = [
        {
            label: "Booking A Desk",
            qas: [
                {
                   
                      q: "Access the Booking Page ",
                      a: "Once logged in, you will be directed to the home page. Click the Booking on Sidebar"
  
                  },
                  {
                      q:"Select Date and Time",
                      a:"Use the calendar to select the desired date. Choose the start time and end time for your booking."
                  },
                
                {
                    q: "Choose a Desk",
                    a: "The system will display a floor plan or a list of available desks for the selected date and time. Click on an available desk to select it. Available desks are typically marked in green."
                },
                {
                  q:"Confirm Booking",
                  a:"Review your selected date, time, and desk. Click the Book Desk button to confirm your reservation."
                },
                {
                  q:"Receive Confirmation",
                  a:"You will receive a confirmation message on the screen and an email with the booking details."
                },
            ]
        },
        {
            label: "Viewing Your Bookings",
            qas: [
                {
                    q: "Access My Bookings",
                    a: "From the sidebar menu, select My Bookings to view a list of your current and upcoming reservations."
                },
                {
                    q: "Details and Status",
                    a: "Each booking entry will show the date, time, desk number, and booking status."
                },
                
            ]
        },
        {
            label: "Canceling a Booking",
            qas: [
                {
                    q: "Select Booking",
                    a: "In the My Bookings section, click on the booking you wish to cancel"
                },
                {
                   q:"Confirm Cancellation",
                   a: "Click the Cancel Booking button"
                }
            ]
        },
    ]
  
    return (
        <section className='py-14'>
            <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                <div className="max-w-lg">
                    <h3 className='mt-3 text-gray-800 dark:text-neutral-100 text-3xl font-extrabold sm:text-4xl'>
                        Deskme User Manual
                    </h3>
                  
                </div>
                <div className='mt-12 divide-y sm:mt-20'>
                    {
                        faqsList.map((list, idx) => (
                            <div key={idx} className="py-5 gap-x-12 first:pt-0 sm:flex">
                                <div className="max-w-sm pt-8 pb-6 sm:pt-0 lg:flex-grow">
                                    <h4 className="text-gray-500 dark:text-neutral-300 font-semibold">
                                        {list.label}
                                    </h4>
                                </div>
                                <ul className='flex-1 sm:last:pb-6 sm:space-y-8'>
                                    {list.qas.map((item, idx) => (
                                        <li
                                            key={idx}>
                                            <summary
                                                className="flex items-center justify-between font-semibold text-gray-700 dark:text-neutral-300">
                                                {item.q}
                                            </summary>
                                            <p
                                                dangerouslySetInnerHTML={{ __html: item.a }}
                                                className='mt-3 text-gray-600 dark:text-neutral-400 leading-relaxed'>
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    }
                </div>
            </div>
  
           
        </section>
    );
  };