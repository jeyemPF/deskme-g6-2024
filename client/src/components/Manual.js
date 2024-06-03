import React from 'react';

const Manual = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-start mb-8 ">HotDesk Booking System User Manual</h1>
        <ol className="space-y-8">
          
          <li>
            <h2 className="text-xl font-semibold mb-2">Step 1: Access the Booking Page</h2>
            <p className="text-gray-700">1.1. Once logged in, you will be directed to the home page.</p>
            <p className="text-gray-700">1.2. In the sidebar menu, click on the "Booking" option.</p>
            <p className="text-gray-700">1.3. You will be directed to the Booking page.</p>
          </li>
          <li>
            <h2 className="text-xl font-semibold mb-2">Step 2: View Available Desks</h2>
            <p className="text-gray-700">2.1. On the booking page, you will see a map of available desks.</p>
            <p className="text-gray-700">2.2. .</p>
            <p className="text-gray-700">2.3. Enter your username and password.</p>
            <p className="text-gray-700">2.4. Click on the "Login" button.</p>
            <p className="text-gray-700">2.5. You will be directed to the dashboard page.</p>
          </li>
          

          <li>
            <h2 className="text-xl font-semibold mb-2">Step 3: Selecting a Desk</h2>
            <p className="text-gray-700">3.1. Click on the "Book a Desk" button on the top right of the page.</p>
            <p className="text-gray-700">3.2. You will be directed to the booking page.</p>
            <p className="text-gray-700">3.3. Select the desk you wish to book.</p>
            <p className="text-gray-700">3.4. Click on the "Book Desk" button.</p>
            <p className="text-gray-700">3.5. You will be directed to the booking confirmation page.</p>
          </li>
          <li>
            <h2 className="text-xl font-semibold mb-2">Step 4: Confirming Your Booking</h2>
            <p className="text-gray-700">4.1. Click on the "Confirm Booking" button on the top right of the page.</p>
            <p className="text-gray-700">4.2. You will be directed to the booking confirmation page.</p>
            <p className="text-gray-700">4.3. Click on the "Confirm Booking" button.</p>
            <p className="text-gray-700">4.4. You will be directed to the dashboard page.</p>
          </li>
          <li>
            <h2 className="text-xl font-semibold mb-2">Step 5: Logging Out</h2>
            <p className="text-gray-700">5.1. Click on the "Logout" button on the top right of the page.</p>
            <p className="text-gray-700">5.2. You will be directed to the login page.</p>
            <p className="text-gray-700">5.3. Enter your username and password.</p>
            <p className="text-gray-700">5.4. Click on the "Login" button.</p>
            <p className="text-gray-700">5.5. You will be directed to the dashboard page.</p>
          </li>
          
          
          {/* Repeat for other steps */}
          <li>
            <h2 className="text-xl font-semibold mb-2">Step 12: Enjoying Your Workspace</h2>
            <p className="text-gray-700">12.1. Once you've arrived at your booked desk, settle in and make the most of your workspace for the duration of your booking.</p>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Manual;
