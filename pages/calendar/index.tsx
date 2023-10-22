import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import CalendarItem, {
  CalendarEvent,
  PastCalendarEvent,
  StressLevelEnum,
} from "@/edith/components/CalendarItem";
import SpotifyDrawer from "@/edith/components/SpotifyDrawer";
import { io } from "socket.io-client";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import SendIcon from "@mui/icons-material/Send";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import LoadingButton from "@mui/lab/LoadingButton";

import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const pastEvents: PastCalendarEvent[] = [
  {
    id: "STUDY123455",
    title: "Computer Science Algorithms",
    description:
      "A detailed session on understanding and implementing advanced algorithms. Bring your laptops and problem sets.",
    startDate: new Date("2023-11-26T14:00:00Z"), // November 26, 2023, Sunday, at 2:00 PM
    endDate: new Date("2023-11-26T16:00:00Z"), // November 26, 2023, Sunday, at 4:00 PM
    location: "Technology Center, Room 302",
    stressLevel: StressLevelEnum.high,
  },
  {
    id: "STUDY123456",
    title: "Chemistry Problem Solving",
    description:
      "A focused session to tackle complex chemistry problems with peers. Guidance and solutions will be provided.",
    startDate: new Date("2023-11-27T10:00:00Z"), // November 27, 2023, Monday, at 10:00 AM
    endDate: new Date("2023-11-27T12:00:00Z"), // November 27, 2023, Monday, at 12:00 PM
    location: "Chemistry Building, Lab 5",
    stressLevel: StressLevelEnum.medium,
  },
  {
    id: "STUDY123457",
    title: "Economics Case Studies",
    description:
      "Analyze real-world economic case studies and brainstorm solutions with peers. Materials will be provided.",
    startDate: new Date("2023-11-26T17:00:00Z"), // November 26, 2023, Sunday, at 5:00 PM
    endDate: new Date("2023-11-26T19:00:00Z"), // November 26, 2023, Sunday, at 7:00 PM
    location: "Business Block, Room 204",
    stressLevel: StressLevelEnum.low,
  },
  {
    id: "STUDY123458",
    title: "Sociology Group Discussion",
    description:
      "A platform to discuss various sociological theories and their implications. Reading materials will be provided.",
    startDate: new Date("2023-11-27T13:00:00Z"), // November 27, 2023, Monday, at 1:00 PM
    endDate: new Date("2023-11-27T15:00:00Z"), // November 27, 2023, Monday, at 3:00 PM
    location: "Sociology Department, Room 105",
    stressLevel: StressLevelEnum.medium,
  },
  {
    id: "STUDY123459",
    title: "Engineering Projects Workshop",
    description:
      "A hands-on session to work on engineering projects and receive feedback from senior students and professors.",
    startDate: new Date("2023-11-26T10:00:00Z"), // November 26, 2023, Sunday, at 10:00 AM
    endDate: new Date("2023-11-26T12:00:00Z"), // November 26, 2023, Sunday, at 12:00 PM
    location: "Engineering Block, Lab 9",
    stressLevel: StressLevelEnum.high,
  },
  {
    id: "STUDY123459",
    title: "Dataset Implimentation for SNOMED CT",
    description:
      "Using SNOMED , need to have a Matex and a Latex set also a spreadsheet forn the dataset.",
    startDate: new Date("2023-11-28T16:00:00Z"), // November 28, 2023, Sunday, at 4:00 PM
    endDate: new Date("2023-11-28T20:00:00Z"), // November 28, 2023, Sunday, at 8:00 PM
    location: "Unified Science Center : 105",
    stressLevel: StressLevelEnum.high,
  },
  {
    id: "STUDY123459",
    title: "Driving Lession",
    description:
      "Go to ocean city for driving lession with Mr. Luke and get all the information about making an MVC appointment.",
    startDate: new Date("2023-11-27T20:00:00Z"), // November 28, 2023, Monday, at 11:00 AM
    endDate: new Date("2023-11-27T22:00:00Z"), // November 28, 2023, Monday, at 2:00 PM
    location: "134 Brighton Ave, Ocean City, NJ 08226",
    stressLevel: StressLevelEnum.low,
  },
  {
    id: "STUDY123459",
    title: "Research paper discussion",
    description:
      "A meeting with Professor about SNOMED CT paper dataset implication discussion.",
    startDate: new Date("2023-11-27T15:00:00Z"), // November 27, 2023, Sunday, at 3:00 PM
    endDate: new Date("2023-11-27T16:00:00Z"), // November 27, 2023, Sunday, at 4:00 PM
    location: "Academic Building : F203",
    stressLevel: StressLevelEnum.medium,
  },
];

const studyEvents: PastCalendarEvent[] = [
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

const socket = io("http://localhost:4000");

const allEvents = [...pastEvents, ...studyEvents];

const CalendarGridView: React.FC = () => {
  const [stress, setStress] = React.useState<StressLevelEnum>(
    StressLevelEnum.low
  );

  const [loading, setLoading] = useState(false);
  const [pastEvents, setPastEvents] = useState<PastCalendarEvent[]>(allEvents);

  useEffect(() => {
    // Listen to 'notification' event from the backend
    socket.on("stress", (data) => {
      // setStress(// This logs the received notification message
      setStress(data);
    });

    // Cleanup the listener when the component is unmounted
    return () => {
      socket.off("stress");
    };
  }, []);

  const events = studyEvents;
  console.log(pastEvents);
  const getEventForTimeSlot = (day: string, hour: number) => {
    const matchedEvent = pastEvents.find((event) => {
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

  const sendData = () => {
    setLoading(true);

    // Simulate an asynchronous action like fetching data or processing
    setTimeout(() => {
      const newEvent: PastCalendarEvent = {
        id: "STUDY12345678",
        title: "Lunch With Alice at 2PM on Wednesday ",
        description: "Reminder to return her book",
        startDate: new Date("2023-11-22T19:00:00Z"), // November 22, 2023, at 2:00 PM
        endDate: new Date("2023-11-22T20:00:00Z"), //// November 27, 2023, Monday, at 12:00 PM
        location: "Chemistry Building, Lab 5",
      };

      // Add the new event to the pastEvents array
      setPastEvents((prevEvents) => [...prevEvents, newEvent]);
      setLoading(false);
    }, 1000); // 2 seconds delay
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
  const [edithInput, setEdithInput] = useState<string>("");

  const getStatus = (stressLevel: StressLevelEnum) => {
    if (stressLevel === StressLevelEnum.high) {
      return <SentimentVeryDissatisfiedIcon style={{ color: "red" }} />;
    } else if (stressLevel === StressLevelEnum.medium) {
      return <SentimentNeutralIcon style={{ color: "yellow" }} />;
    } else {
      return <TagFacesIcon style={{ color: "lightgreen" }} />;
    }
  };

  return (
    <div className="tw-flex tw-flex-row tw-justify-center tw-gap-5">
      <div className="tw-mt-10 tw-w-[250px]  ">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            width: "100%",
          }}
        >
          <Typography variant="h6">Tell Edith Your Schedule</Typography>

          <div className="tw-flex tw-items-center">
            <TextField
              multiline
              variant="outlined"
              placeholder={"Tell me your schedule"}
              value={edithInput}
              onChange={(e) => setEdithInput(e.target.value)}
              fullWidth
            />
            <div onClick={() => sendData()}>
              <IconButton>
                {loading ? <LoadingButton loading /> : <SendIcon />}
              </IconButton>
            </div>
          </div>
        </Box>
      </div>
      <div className="">
        <div>
          <h1 className="tw-w-fit tw-text-xl tw-font-bold tw-text-start  tw-mb-4 tw-ml-auto tw-mr-auto tw-mt-3">
            AI Planner
          </h1>
        </div>
        <div className="tw-flex tw-flex-col  tw-px-6 tw-rounded-lg tw-shadow-md tw-overflow-x-auto tw-text-black tw-h-screen">
          <div className="tw-grid tw-grid-cols-25 tw-w-fit tw-ml-auto tw-mr-auto">
            {/* Hour Labels */}
            <div className="tw-sticky tw-top-0 tw-z-[100] tw-bg-white ">
              <div className="tw-flex tw-flex-row tw-w-max tw-justify-between tw-align-center ">
                <div className="tw-h-12 tw-flex tw-items-center tw-justify-start tw-w-[50px]"></div>
                <div className="tw-flex tw-row tw-item-center tw-w-full tw-justify-start ">
                  {daysOfWeek.map((day) => (
                    <div
                      key={day}
                      className="tw-w-[100px] tw-flex tw-justify-center tw-text-center"
                    >
                      <div className="tw-w-full tw-h-12  ">{day}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div
                style={{
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                }}
                className="tw-flex tw-flex-row tw-w-max tw-justify-between tw-align-center "
              >
                <div className="tw-h-3 tw-flex tw-items-center tw-justify-start tw-w-[50px]"></div>
                <div className="tw-flex tw-row tw-item-center tw-w-full tw-justify-start ">
                  {daysOfWeek.map((day) => {
                    if (day === "Sun") {
                      return (
                        <div
                          key={day}
                          className="tw-w-[100px] tw-flex tw-justify-center tw-text-center "
                        >
                          <div className="tw-w-full tw-h-3  tw-border-l-2"></div>
                        </div>
                      );
                    }
                    return (
                      <div
                        key={day}
                        className="tw-w-[100px] tw-flex tw-justify-center tw-text-center "
                      >
                        <div className="tw-w-full tw-h-3  tw-border-l-2"></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="tw-flex tw-flex-col tw-justify-between tw-w-max">
              {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                <div key={hour} className="tw-flex tw-row tw-items-center">
                  <div className="tw-h-12 tw-flex tw-items-center tw-justify-start tw-w-[50px]">
                    {hour}:00
                  </div>
                  <div className="tw-flex tw-row tw-item-center tw-w-full tw-justify-start">
                    {daysOfWeek.map((day) => {
                      const currentEvent = getEventForTimeSlot(day, hour);
                      const shouldDisplayTitle =
                        currentEvent && isEventStart(currentEvent, day, hour);

                      if (currentEvent) {
                        return (
                          <div
                            className="tw-w-[100px] tw-flex tw-justify-center tw-text-center"
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
                          className="tw-w-[100px] tw-flex tw-justify-center tw-text-center"
                          key={day}
                        >
                          {/* Content for each hour can be added here */}
                          <div className="tw-w-full tw-h-12 tw-border-b-2 tw-border-l-2  "></div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="tw-flex tw-flex-col tw-align-center tw-m-5 gap-5">
        <div className="tw-flex tw-flex-col tw-justify-start tw-items-center tw-mb-8 tw-mt-5 ">
          <div>Status</div>
          <div>{getStatus(stress)}</div>
        </div>
        <div className="">
          <SpotifyDrawer stress={stress} />
        </div>
      </div>
    </div>
  );
};

export default CalendarGridView;
