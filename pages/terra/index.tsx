import React, { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

function App() {
  useEffect(() => {
    // Listen to 'notification' event from the backend
    socket.on("terra", (data) => {
      console.log(data); // This logs the received notification message
    });

    // Cleanup the listener when the component is unmounted
    return () => {
      socket.off("terra");
    };
  }, []);

  // Function to call the backend /sendNotification endpoint
  const sendNotification = async () => {
    try {
      await fetch("http://localhost:4000/sendNotification");
      console.log("Notification request sent to backend.");
    } catch (error) {
      console.error("Failed to send notification:", error);
    }
  };

  return (
    <div className="App">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={sendNotification}
      >
        Send Notification
      </button>
    </div>
  );
}

export default App;
