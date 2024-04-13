import React, { useState } from 'react';

function Calendar() {
  const [date, setDate] = useState(new Date());

  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(date.getFullYear(), date.getMonth());
    const firstDay = getFirstDayOfMonth(date.getFullYear(), date.getMonth());
    const calendarDays = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isWeekend = [0, 6].includes(new Date(date.getFullYear(), date.getMonth(), day).getDay());
      calendarDays.push(
        <div key={`day-${day}`} className={`calendar-day ${isWeekend ? 'weekend' : ''}`}>
          {day}
        </div>
      );
    }

    return calendarDays;
  };

  return (
    <div className="calendar bg-white p-5 rounded-xl" style={{ height: '400px', width: '1000px' }}>
      <div className="calendar-header flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="text-xl font-bold">&lt;</button>
        <h2 className=" text-white border w-[15%] text-center rounded-xl pt-2 h-10 bg-black font-semibold">{monthNames[date.getMonth()]} {date.getFullYear()}</h2>
        <button onClick={handleNextMonth} className="text-xl font-bold">&gt;</button>
      </div>
      <div className="calendar-grid grid grid-cols-7 gap-5 text-center font-medium">
        {weekdays.map((day, index) => (
          <div key={index} className="calendar-day-header text-sm   text-gray-500">{day}</div>
        ))}
        {renderCalendar()}
      </div>
    </div>
  );
}

export default Calendar;