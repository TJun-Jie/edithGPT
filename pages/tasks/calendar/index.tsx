import React from "react";
import { CalendarEvent } from "..";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const exampleEvent: CalendarEvent = {
  id: "ABC1234567", // This is a placeholder ID; Firebase will generate a unique ID when adding the event
  title: "Team Building Workshop",
  description:
    "A workshop aimed at improving team collaboration and communication. All team members are encouraged to participate. There will be team activities, discussions, and a guest speaker on effective teamwork.",
  startDate: new Date("2023-11-15T09:00:00Z"), // November 15, 2023, at 9:00 AM
  endDate: new Date("2023-11-16T16:00:00Z"), // November 15, 2023, at 4:00 PM
  location: "Conference Room A, Company HQ",
};

const CalendarGridView: React.FC = () => {
  const event = exampleEvent;
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
                {daysOfWeek.map((day) => (
                  <div
                    className="tw-w-[200px] tw-flex tw-justify-center tw-text-center"
                    key={day}
                  >
                    {/* Content for each hour can be added here */}
                    <div className="tw-w-full tw-h-12 tw-border-b-2 tw-border-l-2 tw-border-gray-200">
                      {day === "Sun" && hour === 4 ? (
                        <div>{event.title}</div>
                      ) : (
                        ""
                      )}
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
