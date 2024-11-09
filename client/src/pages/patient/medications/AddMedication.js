// AddMedication.js
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import Navbar from '/home/anuj/Documents/hackathon/CZ3002-Elder-Care-main/client/src/Components/patient/Navbar.js';
import './AddMedication.css';

const cookies = new Cookies();

const AddMedication = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    times: '',
    phoneNumber: ''
  });
  const [error, setError] = useState('');

  const isValidTime = (time) => {
    return /^([01]?[0-9]|2[0-3]):[0-5][0-9](,([01]?[0-9]|2[0-3]):[0-5][0-9])*$/.test(time);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.dosage || !formData.times || !formData.phoneNumber) {
      setError('All fields are required.');
      return;
    }

    if (!isValidTime(formData.times)) {
      setError('Please enter times in HH:MM format (e.g., 08:00, 14:00)');
      return;
    }

    try {
      const postData = {
        name: formData.name,
        dosage: formData.dosage,
        times: formData.times.split(',').map(time => time.trim()),
        phoneNumber: `+91${formData.phoneNumber}`
      };

      await axios.post('/api/rem/add', postData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.get('token')}`
        }
      });

    //   navigate('/medications');
      navigate('/patient/medications/all');
    } catch (error) {
      setError('Failed to add medication. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="MedWrapper">
        <div className="MedContainer">
          <div className="AddMedication">
            <h1>Add Medication</h1>
            <form onSubmit={handleSubmit}>
              <input
                className="credentials"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Medication Name"
              />
              <input
                className="credentials"
                type="text"
                name="dosage"
                value={formData.dosage}
                onChange={handleInputChange}
                placeholder="Dosage"
              />
              <input
                className="credentials"
                type="text"
                name="times"
                value={formData.times}
                onChange={handleInputChange}
                placeholder="Times (e.g., 08:00, 14:00)"
              />
              <input
                className="credentials"
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Phone Number"
              />
              <button className="AddButton" type="submit">
                Add Medication
              </button>
            </form>
            {error && <div className="error">{error}</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMedication;