// App.jsx
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BookingList from './BookingList';
import Login from './Login';
import NewBookingForm from './NewBookingForm'; // Import the NewBookingForm component

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/booking-list" element={<BookingList />} />
          <Route path="/new-booking" element={<NewBookingForm />} /> {/* Add a new route for the NewBookingForm component */}
          <Route path='/' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
