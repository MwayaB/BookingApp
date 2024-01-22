// BookingList.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const BookingList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Make an API call to retrieve booking data
    const fetchData = async () => {
      try {

        const response = await axios.get('http://localhost:3000/booking/1');
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Booking List</h1>
      <Link to="/new-booking">
        <button>Create Booking</button>
      </Link>
      {bookings.length > 0 ? (
        <div>
          {bookings.map((booking) => (
            <div key={booking.firstname} className="booking-card">
              <p>{`First Name: ${booking.firstname}`}</p>
              <p>{`Last Name: ${booking.lastname}`}</p>
              <p>{`Total Price: ${booking.totalprice}`}</p>
              <p>{`Deposit Paid: ${booking.depositpaid ? 'Yes' : 'No'}`}</p>
              <div>
                <p>Booking Dates:</p>
                <ul>
                  <li>{`Check-in: ${booking.bookingdates.checkin}`}</li>
                  <li>{`Check-out: ${booking.bookingdates.checkout}`}</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BookingList;
