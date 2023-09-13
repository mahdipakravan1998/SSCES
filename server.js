import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors'; // Import the CORS middleware
const app = express();
const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk1MjExMjU4LCJpYXQiOjE2OTQ2MDY0NTgsImp0aSI6Ijc0NGIyNmI5Njc0NzQ2MmZhZGZhNWJlMDI4YjFiNzljIiwidXNlcl9pZCI6MX0.WRhDmCrHLQ5ScUE38SuNpnWwanWTSiP07pyuBd3HDPY"; // Replace with your actual access token


// Use the CORS middleware
app.use(cors());

app.get('/members', async (req, res) => {
  const membersApiURL = 'https://ssces-fum.ir/central_members/central_members/';
  try {
    const response = await fetch(membersApiURL, {
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

app.use(express.json());

app.post('/cooperation/', async (req, res) => {
  const { cooperation, text, phone_number, email } = req.body; // Destructure request body
  
  const cooperationApiURL = 'https://ssces-fum.ir/cooperation/cooperation_replies/';

  try {
    const response = await fetch(cooperationApiURL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cooperation: cooperation, // Replace with the appropriate cooperation ID
        text,
        phone_number,
        email,
      }),
    });

    const responseData = await response.json();
    console.log('Response Data:', responseData); // Log the response data

    if (response.ok) {
      // res.status(201).json(responseData); // Respond with status 201 for successful creation
      res.status(200).json({ success: true, message: 'Data sent successfully' });
    } else {
      console.error('Error sending data to API:', response.statusText);
      res.status(500).json({ error: 'Internal server error', responseData });
    }
  } catch (error) {
    console.error('Error sending data to API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
