// /pages/patient/medications/UpdateMedication.js
import React, { useState } from 'react';
import axios from 'axios';

const UpdateMedication = () => {
    const [medicationId, setMedicationId] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        dosage: '',
        times: '',
        phoneNumber: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/rem/update/${medicationId}`, formData);  // PUT to update medication
            alert(response.data.message);
            setMedicationId('');
            setFormData({ name: '', dosage: '', times: '', phoneNumber: '' });
        } catch (error) {
            console.error('Error updating medication:', error);
            alert('Failed to update medication.');
        }
    };

    return (
        <div>
            <h2>Update Medication</h2>
            <form onSubmit={handleUpdate}>
                <label>
                    Medication ID:
                    <input type="text" value={medicationId} onChange={(e) => setMedicationId(e.target.value)} required />
                </label>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </label>
                <label>
                    Dosage:
                    <input type="text" name="dosage" value={formData.dosage} onChange={handleChange} required />
                </label>
                <label>
                    Times (comma-separated, e.g., 08:00,14:00):
                    <input type="text" name="times" value={formData.times} onChange={handleChange} required />
                </label>
                <label>
                    Phone Number:
                    <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                </label>
                <button type="submit">Update Medication</button>
            </form>
        </div>
    );
};

export default UpdateMedication;
