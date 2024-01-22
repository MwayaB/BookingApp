import axios from 'axios';
import React, { useState } from 'react';

const NewBookingForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    totalprice: '',
    depositpaid: false,
    checkin: '',
    checkout: '',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        console.log(formData);
      // Make an API call to submit the new booking data to the /createbooking endpoint
      const response = await axios.post('http://localhost:3000/createbooking', formData);
      console.log('Booking created:', response.data);
      // You may want to update the state or perform other actions after successful submission
    } catch (error) {
      console.error('Error creating booking:', error.message);
    }
  };

  return (
    <div>
      <h1>New Booking Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Total Price:
          <input
            type="number"
            name="totalprice"
            value={formData.totalprice}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Deposit Paid:
          <input
            type="checkbox"
            name="depositpaid"
            checked={formData.depositpaid}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Check-in Date:
          <input
            type="date"
            name="checkin"
            value={formData.checkin}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Check-out Date:
          <input
            type="date"
            name="checkout"
            value={formData.checkout}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewBookingForm;
