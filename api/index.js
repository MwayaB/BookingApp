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

// Function to authenticate and get the token
const authenticateAndGetToken = async () => {
    try {
      const authResponse = await axios.post('https://restful-booker.herokuapp.com/auth', {
        username: 'admin',
        password: 'password123'
      });
      return authResponse.data.token;
    } catch (error) {
      console.error('Authentication error:', error.message);
      throw error;
    }
  };


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
    try {
      // Authenticate and get the token
      const authToken = await authenticateAndGetToken();
        console.log(authToken);
      const newBooking = req.body;
      localBookingData.push(newBooking);
  
      // Forward the request to the remote API with authentication
      const response = await axios.post(remoteApiUrl, newBooking, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      });
  
      res.status(201).json({ message: 'Booking created successfully', remoteResponse: response.data });
    } catch (error) {
      console.error('Error creating booking:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  app.delete('/booking/:id', async (req, res) => {
    try {
      // Authenticate and get the token
      const authToken = await authenticateAndGetToken();
        console.log(authToken);

        const bookingId = req.params.id;

  
        const response = await axios.delete(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`
            }
          });
  
      response.status(201).json({ message: 'Booking deleted successfully', remoteResponse: response.data });
    } catch (error) {
      console.error('Error deleting booking:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  const deleteBooking = async (bookingId) => {
    try {
      const response = await axios.delete(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      });
      
      console.log(`Booking with ID ${bookingId} deleted successfully`);
      console.log(response.data); // Log the response from the server
    } catch (error) {
      console.error(`Error deleting booking with ID ${bookingId}:`, error.message);
    }
  };


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})