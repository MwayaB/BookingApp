const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const port = 3000

app.use(cors());
app.get('/bookingIds', async (req, res) => {
    try {
        // Make an API call to https://restful-booker.herokuapp.com/booking
        const response = await axios.get('https://restful-booker.herokuapp.com/booking');
        // Assuming the API response contains data you want to send to the client
        res.json(response.data);
      } catch (error) {
        // Handle errors, e.g., network issues or API response errors
        console.error('Error making API call:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});


const localBookingData = [
    {
      "firstname": "John",
      "lastname": "Doe",
      "totalprice": 500,
      "depositpaid": true,
      "bookingdates": {
        "checkin": "2023-05-15",
        "checkout": "2023-05-20"
      }
    },
    {
      "firstname": "Jane",
      "lastname": "Smith",
      "totalprice": 700,
      "depositpaid": false,
      "bookingdates": {
        "checkin": "2023-06-10",
        "checkout": "2023-06-15"
      }
    }
  ];

  app.get('/booking/:id', async (req, res) => {
    const bookingId = req.params.id;
    console.log(bookingId);
    const url = `https://restful-booker.herokuapp.com/booking/${bookingId}`;
  
    try {
     // const response = await axios.get(url);
      //console.log(response);
      res.json(localBookingData);
    } catch (error) {
      console.error('Error making API call:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Create a new booking
app.post('/createbooking', async (req, res) => {
  const newBooking = req.body;
  localBookingData.push(newBooking);

  try {
    // Forward the request to the remote API
    const response = await axios.post(remoteApiUrl, newBooking);
    res.status(201).json({ message: 'Booking created successfully', remoteResponse: response.data });
  } catch (error) {
    console.error('Error creating booking:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})