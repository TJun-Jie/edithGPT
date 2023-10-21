import { addDoc, collection } from "@firebase/firestore";
import { firestore } from "../../firebase";
import React, { useEffect, useState } from "react";
import { get } from "http";
import { getDocs } from "firebase/firestore";
import { Button } from "@mui/material";

const addCalendarEvent = (event: CalendarEvent) => {
  const ref = collection(firestore, "event"); // Firebase creates this automatically

  let data = {
    event: event,
  };

  try {
    addDoc(ref, data);
  } catch (err) {
    console.log(err);
  }
};

interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  location?: string;
}

const exampleEvent: CalendarEvent = {
  id: "ABC1234567", // This is a placeholder ID; Firebase will generate a unique ID when adding the event
  title: "Team Building Workshop",
  description:
    "A workshop aimed at improving team collaboration and communication. All team members are encouraged to participate. There will be team activities, discussions, and a guest speaker on effective teamwork.",
  startDate: new Date("2023-11-15T09:00:00Z"), // November 15, 2023, at 9:00 AM
  endDate: new Date("2023-11-16T16:00:00Z"), // November 15, 2023, at 4:00 PM
  location: "Conference Room A, Company HQ",
};

// ... Firebase initialization ...

const CalendarPage: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "event"));
        const newData: CalendarEvent[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();

          return {
            id: doc.id,
            title: data.title,
            description: data.description,
            startDate: new Date(data.startDate.seconds * 1000), // Convert Firestore timestamp to JS Date
            endDate: new Date(data.endDate.seconds * 1000), // Convert Firestore timestamp to JS Date
            location: data.location,
          };
        });
        setEvents(newData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPost();
  }, []);

  if (events.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <div className="tw-min-h-screen tw-bg-gray-100 tw-p-8">
      <h1 className="tw-text-2xl tw-font-bold tw-mb-6 tw-text-black">
        Upcoming Events
      </h1>
      <ul className="tw-bg-white tw-rounded tw-shadow-lg tw-p-4">
        {events.length === 0 && <p>No events found.</p>}
        {events.map((event) => (
          <li
            key={event?.id}
            className="tw-border-b tw-border-gray-200 tw-last:border-b-0 tw-pb-4 tw-mb-4 tw-last:mb-0"
          >
            <h2 className="tw-text-xl tw-font-semibold tw-mb-2">
              {event?.title}
            </h2>
            <p className="tw-text-gray-600 tw-mb-2">{event?.description}</p>
            <p className="tw-text-sm tw-text-gray-500">
              <span className="tw-font-medium">Start:</span>{" "}
              {event?.startDate.toLocaleString()}
            </p>
            <p className="tw-text-sm tw-text-gray-500">
              <span className="tw-font-medium">End:</span>{" "}
              {event?.endDate.toLocaleString()}
            </p>
            {event?.location && (
              <p className="tw-text-sm tw-text-gray-500">
                <span className="tw-font-medium">Location:</span>{" "}
                {event?.location}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarPage;
