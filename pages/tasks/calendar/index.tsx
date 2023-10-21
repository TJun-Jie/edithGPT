import React from "react";
import dayjs from "dayjs";
import CalendarItem, { CalendarEvent } from "@/edith/components/CalendarItem";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const studyEvents: CalendarEvent[] = [
  {
    id: "STUDY123450",
    title: "Mathematics Study Session",
    description:
      "A collaborative study session focused on advanced calculus. Bring your textbooks and questions. Refreshments provided.",
    startDate: new Date("2023-11-22T14:00:00Z"), // November 22, 2023, at 2:00 PM
    endDate: new Date("2023-11-22T17:00:00Z"), // November 22, 2023, at 5:00 PM
    location: "Library Room 101",
  },
  {
    id: "STUDY123451",
    title: "Physics Group Discussion",
    description:
      "An interactive discussion on Quantum Mechanics. This session will delve deep into its principles and theories.",
    startDate: new Date("2023-11-23T14:00:00Z"),
    endDate: new Date("2023-11-23T16:00:00Z"),
    location: "Science Building, Room 205",
  },
  {
    id: "STUDY123452",
    title: "Literature Review Workshop",
    description:
      "A workshop to help students critically analyze and discuss classical literature. Bring your notes and thoughts.",
    startDate: new Date("2023-11-24T14:00:00Z"),
    endDate: new Date("2023-11-24T15:00:00Z"),
    location: "Arts Department, Room 15",
  },
  {
    id: "STUDY123453",
    title: "Biology Lab Study",
    description:
      "A practical study session where students can work on their lab assignments and experiments under guidance.",
    startDate: new Date("2023-11-25T14:00:00Z"),
    endDate: new Date("2023-11-25T16:00:00Z"),
    location: "Biology Lab, Ground Floor",
  },
  {
    id: "STUDY123454",
    title: "History Documentary Viewing",
    description:
      "A viewing of a documentary on the Renaissance period followed by a group discussion.",
    startDate: new Date("2023-11-27T14:00:00Z"),
    endDate: new Date("2023-11-27T15:00:00Z"),
    location: "Auditorium A",
  },
];

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
  const events = studyEvents;
  const getEventForTimeSlot = (day: string, hour: number) => {
    const matchedEvent = events.find((event) => {
      const eventStartDay = dayjs(event.startDate).format("ddd");
      const eventEndDay = dayjs(event.endDate).format("ddd");
      const eventStartHour = dayjs(event.startDate).hour();
      const eventEndHour = dayjs(event.endDate).hour();

      // Check if the current day is between the event's start and end day
      // and if the current hour is between the event's start and end hour
      return (
        daysOfWeek.indexOf(eventStartDay) <= daysOfWeek.indexOf(day) &&
        daysOfWeek.indexOf(day) <= daysOfWeek.indexOf(eventEndDay) &&
        eventStartHour <= hour &&
        hour <= eventEndHour
      );
    });
    return matchedEvent;
  };

  const isEventStart = (event: CalendarEvent, day: string, hour: number) => {
    const eventStartDay = dayjs(event.startDate).format("ddd");
    const eventStartHour = dayjs(event.startDate).hour();
    return eventStartDay === day && eventStartHour === hour;
  };

  const isWithinEventTime = (
    event: CalendarEvent,
    day: string,
    hour: number
  ) => {
    const eventStartDay = dayjs(event.startDate).format("ddd");
    const eventEndDay = dayjs(event.endDate).format("ddd");
    const eventStartHour = dayjs(event.startDate).hour();
    const eventEndHour = dayjs(event.endDate).hour();

    const isSameDayEvent = eventStartDay === eventEndDay;
    const isInDayRange =
      daysOfWeek.indexOf(eventStartDay) <= daysOfWeek.indexOf(day) &&
      daysOfWeek.indexOf(day) <= daysOfWeek.indexOf(eventEndDay);

    if (isSameDayEvent) {
      return (
        eventStartDay === day && hour >= eventStartHour && hour <= eventEndHour
      );
    }
    return (
      isInDayRange &&
      ((eventStartDay === day && hour >= eventStartHour) ||
        (eventEndDay === day && hour <= eventEndHour) ||
        (eventStartDay !== day && eventEndDay !== day))
    );
  };

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
                {daysOfWeek.map((day) => {
                  const currentEvent = getEventForTimeSlot(day, hour);
                  const shouldDisplayTitle =
                    currentEvent && isEventStart(currentEvent, day, hour);

                  if (currentEvent) {
                    return (
                      <div
                        className="tw-w-[200px] tw-flex tw-justify-center tw-text-center"
                        key={day}
                      >
                        {/* Content for each hour can be added here */}
                        <div className="tw-w-full tw-h-12  tw-border-l-2 tw-border-gray-200 tw-bg-[#3f50b5] tw-text-white">
                          {shouldDisplayTitle && (
                            <CalendarItem event={currentEvent} />
                          )}
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div
                      className="tw-w-[200px] tw-flex tw-justify-center tw-text-center"
                      key={day}
                    >
                      {/* Content for each hour can be added here */}
                      <div className="tw-w-full tw-h-12 tw-border-b-2 tw-border-l-2 tw-border-gray-200 "></div>
                    </div>
                  );
                })}
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
