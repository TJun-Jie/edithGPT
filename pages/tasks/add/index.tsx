import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../../../firebase";
import { CalendarEvent } from "..";

interface FormEvent {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
}

const AddEventPage: React.FC = () => {
  const [formData, setFormData] = useState<FormEvent>({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addDoc(collection(firestore, "event"), {
        title: formData.title,
        description: formData.description,
        startDate: {
          seconds: new Date(formData.startDate).getTime() / 1000,
          nanoseconds: 0,
        },
        endDate: {
          seconds: new Date(formData.endDate).getTime() / 1000,
          nanoseconds: 0,
        },
        location: formData.location,
      });
      alert("Event added successfully!");
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4 text-black">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded p-6 shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl mb-4">Add New Event</h2>

        <label className="block mb-4">
          Title:
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="mt-2 p-2 w-full border rounded"
            required
          />
        </label>

        <label className="block mb-4">
          descriptoin:
          <input
            type="text"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="mt-2 p-2 w-full border rounded"
            required
          />
        </label>

        <label className="block mb-4">
          lcoation:
          <input
            type="text"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="mt-2 p-2 w-full border rounded"
            required
          />
        </label>

        {/* ... Other form fields for description, startDate, endDate, location ... */}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
        >
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddEventPage;
