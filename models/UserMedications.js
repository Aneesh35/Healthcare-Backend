const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  times: [{ type: String, required: true }],  // e.g., ['08:00', '13:00']
  phoneNumber: { type: String, required: true }  // New field for user's phone number
});

// Example for UserMedications collection if it's nested within the user schema
const UserMedicationsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    medications: [
        {
            name: String,
            dosage: String,
            times: [String],
            phoneNumber: String
        }
    ]
});

const UserMedications = mongoose.model('UserMedications', UserMedicationsSchema);
module.exports = UserMedications;
