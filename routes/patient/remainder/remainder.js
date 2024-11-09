const express = require('express');
const verifyToken = require('../../../utils/verifyToken');
const UserMedications = require('../../../models/UserMedications');
const twilio = require('twilio');
const cron = require('node-cron');

const router = express.Router();

// Twilio configuration remains the same...
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const twilioClient = twilio(accountSid, authToken);

// Helper functions remain the same...
const sendNotification = async (phoneNumber, name, dosage, times) => {
    try {
        await twilioClient.messages.create({
            body: `Medication reminder: ${name}, Dosage: ${dosage}, Time: ${times}`,
            from: twilioPhoneNumber,
            to: phoneNumber,
        });
        console.log('SMS sent successfully!');
    } catch (error) {
        console.error('Failed to send SMS:', error);
    }
};

const scheduleNotifications = (times, phoneNumber, name, dosage) => {
    times.forEach(time => {
        const [hours, minutes] = time.split(':').map(num => parseInt(num));
        cron.schedule(`0 ${minutes} ${hours} * * *`, () => {
            sendNotification(phoneNumber, name, dosage, time);
        });
        console.log(`Scheduled notification for: ${hours}:${minutes}`);
    });
};

// GET route - Fixed response format
router.get('/all', verifyToken, async (req, res) => {
    try {
        const userMedications = await UserMedications.findOne({ userId: req.user.id });
        if (!userMedications) {
            return res.status(200).json({ 
                medications: [],
                message: 'No medications found.'
            });
        }

        res.status(200).json({
            medications: userMedications.medications,
            userId: userMedications.userId
        });
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ error: 'Failed to fetch medications.' });
    }
});

// POST route
router.post('/add', verifyToken, async (req, res) => {
    const { name, dosage, times, phoneNumber } = req.body;
    const userId = req.user.id;

    if (!name || !dosage || !times || !phoneNumber) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const newMedication = { name, dosage, times, phoneNumber };

        await UserMedications.findOneAndUpdate(
            { userId },
            { $push: { medications: newMedication } },
            { upsert: true }
        );

        scheduleNotifications(times, phoneNumber, name, dosage);

        res.status(201).json({ 
            message: 'Medication added successfully!',
            medication: newMedication
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to add medication.' });
    }
});

// PUT route
router.put('/update/:medicationId', verifyToken, async (req, res) => {
    const { name, dosage, times, phoneNumber } = req.body;
    const { medicationId } = req.params;

    if (!name || !dosage || !times || !phoneNumber) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const result = await UserMedications.findOneAndUpdate(
            { 
                userId: req.user.id, 
                'medications._id': medicationId 
            },
            {
                $set: {
                    'medications.$.name': name,
                    'medications.$.dosage': dosage,
                    'medications.$.times': times,
                    'medications.$.phoneNumber': phoneNumber,
                },
            },
            { new: true }
        );

        if (!result) {
            return res.status(404).json({ error: 'Medication not found.' });
        }

        scheduleNotifications(times, phoneNumber, name, dosage);

        res.status(200).json({ 
            message: 'Medication updated successfully!',
            medication: result.medications.find(m => m._id.toString() === medicationId)
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to update medication.' });
    }
});

module.exports = router;