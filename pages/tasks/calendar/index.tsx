import React from "react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarGridView: React.FC = () => {
  return (
    <div className="tw-flex tw-flex-col tw-bg-gray-100 tw-p-6 tw-rounded-lg tw-shadow-md tw-overflow-x-auto tw-text-black tw-h-screen">
      <div className="tw-grid tw-grid-cols-25 tw-w-full">
        {/* Hour Labels */}
        <div className="tw-flex tw-flex-row tw-border-r tw-w-full tw-justify-between tw-align-center tw-border-b-2">
          <div className="tw-h-12 tw-flex tw-items-center tw-justify-start tw-w-[50px]"></div>
          <div className="tw-flex tw-row tw-item-center tw-w-full tw-justify-between ">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="tw-w-[200px] tw-flex tw-justify-center tw-text-center"
              >
                {/* Content for each hour can be added here */}
                {/* Content for each hour can be added here */}
                <div className="tw-w-full tw-h-12 tw-border-l-2 tw-border-gray-200">
                  {day}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="tw-flex tw-flex-col tw-justify-between tw-border-r-2">
          {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
            <div key={hour} className="tw-flex tw-row tw-items-center">
              <div className="tw-h-12 tw-flex tw-items-center tw-justify-start tw-w-[50px]">
                {hour}:00
              </div>
              <div className="tw-flex tw-row tw-item-center tw-w-full tw-justify-between">
                {Array.from({ length: 7 }, (_, i) => i).map((day) => (
                  <div
                    className="tw-w-[200px] tw-flex tw-justify-center tw-text-center"
                    key={day}
                  >
                    {/* Content for each hour can be added here */}
                    <div className="tw-w-full tw-h-12 tw-border-b-2 tw-border-l-2 tw-border-gray-200">
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
