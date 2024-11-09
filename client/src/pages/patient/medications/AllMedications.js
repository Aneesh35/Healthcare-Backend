// MedicationsLists.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Navbar from '/home/anuj/Documents/hackathon/CZ3002-Elder-Care-main/client/src/Components/patient/Navbar.js';
import './AllMedications.css';

const cookies = new Cookies();

const MedicationsLists = () => {
	const [medications, setMedications] = useState([]);
	const [error, setError] = useState('');
	const [editingMedication, setEditingMedication] = useState(null);
	const [formData, setFormData] = useState({
	  name: '',
	  dosage: '',
	  times: '',
	  phoneNumber: ''
	});
  
	useEffect(() => {
	  fetchMedications();
	}, []);
  
	const fetchMedications = async () => {
	  try {
		const response = await axios.get('/api/rem/all', {
		  headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${cookies.get('token')}`
		  }
		});
  
		if (response.data && response.data.medications) {
		  setMedications(response.data.medications);
		} else {
		  setError('No medications found.');
		}
	  } catch (error) {
		setError('Failed to fetch medications.');
		console.error('Error:', error);
	  }
	};
  const handleEditClick = (medication) => {
    setEditingMedication(medication._id);
    setFormData({
      name: medication.name,
      dosage: medication.dosage,
      times: medication.times.join(', '),
      phoneNumber: medication.phoneNumber.replace('+91', '')
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateClick = async (medicationId) => {
    try {
      const updatedData = {
        name: formData.name,
        dosage: formData.dosage,
        times: formData.times.split(',').map(time => time.trim()),
        phoneNumber: `+91${formData.phoneNumber}`
      };

      await axios.put(`/api/rem/update/${medicationId}`, updatedData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.get('token')}`
        }
      });

      fetchMedications();
      setEditingMedication(null);
    } catch (error) {
      setError('Failed to update medication.');
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="MedWrapper">
        <div className="MedContainer">
          <h1>Your Medications</h1>
          <div className="Medications">
            {error && <div className="error">{error}</div>}
            
            {medications.length === 0 ? (
              <p>No medications found.</p>
            ) : (
              medications.map((medication) => (
                <div key={medication._id} className="medication-item">
                  {editingMedication === medication._id ? (
                    <div className="edit-form">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Medication Name"
                      />
                      <input
                        type="text"
                        name="dosage"
                        value={formData.dosage}
                        onChange={handleInputChange}
                        placeholder="Dosage"
                      />
                      <input
                        type="text"
                        name="times"
                        value={formData.times}
                        onChange={handleInputChange}
                        placeholder="Times (e.g., 08:00, 14:00)"
                      />
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                      />
                      <div className="button-group">
                        <button onClick={() => handleUpdateClick(medication._id)}>Save</button>
                        <button onClick={() => setEditingMedication(null)}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="medication-details">
                      <h3>{medication.name}</h3>
                      <p><strong>Dosage:</strong> {medication.dosage}</p>
                      <p><strong>Times:</strong> {medication.times.join(', ')}</p>
                      <p><strong>Phone Number:</strong> {medication.phoneNumber}</p>
                      <button onClick={() => handleEditClick(medication)}>Edit</button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MedicationsLists;
