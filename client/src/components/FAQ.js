import React from "react";
import Accordion from "./Accordion";

const FAQ = () => {
  return (
    <div className="flex justify-center mt-1">
    <div className="p-4 mx-1 rounded-lg w-[75%] ">
    <h1 className="font-bold text-2xl pb-5 text-center dark:text-neutral-100">Frequently Asked Questions:</h1>
      <Accordion
        title="How do I book a hot desk?"
        answer=" Simply log in first to our Hotdesk Booking system with your credentials, after logging in go to booking and then select your desired date and time, and choose an available hot desk location."
      />
      <Accordion
        title="Can I choose a specific desk?"
        answer="Yes, you can view a floor plan and select a specific desk based on availability and your preferences."
      />
      <Accordion title="Can I cancel or modify my booking?" answer="Yes, you can cancel or modify your booking through the system. Simply log in, go to your bookings, and select the option to cancel or change your reservation." />
      <Accordion
        title="What is the Hotdesk Booking System?"
        answer="The Hotdesk Booking System is an online platform that allows employees to reserve available desks in the office, ensuring efficient space utilization and compliance with health and safety guidelines."
      />
    
    </div>
    </div>
  );
};

export default FAQ;