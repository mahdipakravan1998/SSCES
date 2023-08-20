import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors'; // Import the CORS middleware
const app = express();
const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkzMTU0MzE4LCJpYXQiOjE2OTI1NDk1MTgsImp0aSI6ImNhODc4MTZkMjM2MjQwMmViM2NmNmEyN2U1YTYxNjk0IiwidXNlcl9pZCI6MX0.0WAsIn-EaYf3tvyvfVZffrLprQeNgkc_HyFcGNO-2dI"; // Replace with your actual access token
const apiURL = 'https://ssces-fum.ir/central_members/central_members/';

// Use the CORS middleware
app.use(cors());

app.get('/api/members', async (req, res) => {
  try {
    const response = await fetch(apiURL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
