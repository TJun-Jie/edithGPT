const functions = require('firebase-functions');
const axios = require('axios');

exports.canvasProxy = functions.https.onCall(async (data, context) => {
  const PROXY_URL = 'http://localhost:3000/proxy?url=';
  const API_URL = PROXY_URL + encodeURIComponent('https://northeastern.instructure.com/api/v1/users/self/todo');
  const API_TOKEN = '14523~JF03hRO6Xj2EER3V16ldypo38Rt1buNmJEGWaPArWPdRFSJu0kujW3ZCsRIoF71g';

  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'You must be signed in to access this resource.');
  }

  // The headers we want to forward to the Canvas API
  const headers = {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json'
  };

  try {
    const response = await axios.get(API_URL, { headers });
    if (response.status !== 200) {
      console.error("Received non-200 status code:", response.status);
      throw new Error(`Received status code: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching Canvas data:", error.message);
    throw new functions.https.HttpsError('unknown', error.message);
  }
});