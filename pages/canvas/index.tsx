import React, { useEffect, useState } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { initializeApp, getApps } from "firebase/app";

// Import firebaseConfig from firebase.js
import { firebaseConfig } from '../../firebase';

// Initialize Firebase app
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const CanvasPage = () => {
  const [todoList, setTodoList] = useState("Initial value to test rendering");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCanvasData = async () => {
      const functions = getFunctions();
      const canvasProxy = httpsCallable(functions, 'canvasProxy'); // Change here

      try {
        const result = await canvasProxy();
        console.log("Fetched data:", result.data);
        setTodoList(JSON.stringify(result.data, null, 2));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchCanvasData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <div>
        <h1>Canvas Raw Response</h1>
        <pre>{todoList}</pre>
      </div>
  );
}

export default CanvasPage;
