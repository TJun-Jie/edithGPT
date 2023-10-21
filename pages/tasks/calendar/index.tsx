// src/components/CalendarGridView.tsx

import React from "react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarGridView: React.FC = () => {
  return (
    <div className="flex flex-col bg-gray-100 p-6 rounded-lg shadow-md overflow-x-auto text-black">
      <div className="grid grid-cols-25 w-full">
        {/* Hour Labels */}
        <div className=" flex flex-row border-r w-full justify-between align-center border-b-2">
          <div className="w-[50px]"></div>
          <div className=" flex row item-center w-full ">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="w-[200px] flex justify-between text-center border-l-2 "
              >
                {/* Content for each hour can be added here */}
                <div className="w-[200px] h-12 ">
                  {/* Content for each hour can be added here */}
                  {day}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between border-r-2 pr-2">
          {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
            <div key={hour} className=" flex row items-center">
              <div className="h-12 flex items-center justify-start w-[50px]">
                {hour}:00
              </div>
              <div className=" flex row item-center w-full justify-between">
                {Array.from({ length: 7 }, (_, i) => i).map((day) => (
                  <div
                    className="w-[200px] flex jsutify-center text-center"
                    key={day}
                  >
                    {/* Content for each hour can be added here */}
                    <div className="w-full h-12 border-b-2 border-l-2 border-gray-200">
                      {/* Content for each hour can be added here */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Days Grid */}
      </div>
    </div>
  );
};

export default CalendarGridView;
