import { addDoc, collection } from "@firebase/firestore";
import { firestore } from "../../firebase";
import React, { useEffect, useState } from "react";
import { get } from "http";
import { getDocs } from "firebase/firestore";

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
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6 text-black">Upcoming Events</h1>
      <ul className="bg-white rounded shadow-lg p-4">
        {events.length === 0 && <p>No events found.</p>}
        {events.map((event) => (
          <li
            key={event?.id}
            className="border-b border-gray-200 last:border-b-0 pb-4 mb-4 last:mb-0"
          >
            <h2 className="text-xl font-semibold mb-2">{event?.title}</h2>
            <p className="text-gray-600 mb-2">{event?.description}</p>
            <p className="text-sm text-gray-500">
              <span className="font-medium">Start:</span>{" "}
              {event?.startDate.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium">End:</span>{" "}
              {event?.endDate.toLocaleString()}
            </p>
            {event?.location && (
              <p className="text-sm text-gray-500">
                <span className="font-medium">Location:</span> {event?.location}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarPage;
