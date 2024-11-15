const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  times: [{ type: String, required: true }],  // e.g., ['08:00', '13:00']
  phoneNumber: { type: String, required: true }  // New field for user's phone number
});

// Example for UserMedications collection if it's nested within the user schema
const userMedicationsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  medications: [medicationSchema]
});

const UserMedications = mongoose.model('UserMedications', userMedicationsSchema);

module.exports = UserMedications;
