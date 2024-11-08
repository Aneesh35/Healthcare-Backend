const express = require('express');
const verifyToken = require('../../../utils/verifyToken');
const UserMedications = require('../../../models/UserMedications');
const twilio = require('twilio');
const cron = require('node-cron');

const router = express.Router();

// Twilio configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const twilioClient = twilio(accountSid, authToken);
// Helper function to send the SMS notification
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

// Function to schedule notifications
const scheduleNotifications = (times, phoneNumber, name, dosage) => {
    const now = new Date();
    
    // Loop through each time in the schedule
    times.forEach(time => {
        // Split the time into hours and minutes
        const [hours, minutes] = time.split(':').map(num => parseInt(num));

        // Create the date object for that time today
        let scheduledTime = new Date(now);
        scheduledTime.setHours(hours);
        scheduledTime.setMinutes(minutes);
        scheduledTime.setSeconds(0); // Ensure seconds are zero

        // If the scheduled time is in the past today, schedule it for the next day
        if (scheduledTime <= now) {
            scheduledTime.setDate(scheduledTime.getDate() + 1);
        }

        // Schedule the notification using cron
        cron.schedule(`0 ${minutes} ${hours} * * *`, () => {
            sendNotification(phoneNumber, name, dosage, time);
        });

        console.log(`Scheduled notification for: ${scheduledTime}`);
    });
};

// POST route to add medication for a user
router.post('/add', verifyToken, async (req, res) => {
    const { name, dosage, times, phoneNumber } = req.body;

    if (!name || !dosage || !times || !phoneNumber) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const newMedication = { name, dosage, times, phoneNumber };

        // Add medication to the user's list
        await UserMedications.updateOne(
            { userId: req.user.id },
            { $push: { medications: newMedication } },
            { upsert: true }
        );

        // Schedule the notifications
        scheduleNotifications(times, phoneNumber, name, dosage);

        res.status(201).json({ message: 'Medication added and notifications scheduled successfully!' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to add medication.' });
    }
});

// PUT route to update a medication
router.put('/update/:medicationId', verifyToken, async (req, res) => {
    const { name, dosage, times, phoneNumber } = req.body;
    const { medicationId } = req.params;

    if (!name || !dosage || !times || !phoneNumber) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        await UserMedications.updateOne(
            { userId: req.user.id, 'medications._id': medicationId },
            {
                $set: {
                    'medications.$.name': name,
                    'medications.$.dosage': dosage,
                    'medications.$.times': times,
                    'medications.$.phoneNumber': phoneNumber,
                },
            }
        );

        // Reschedule notifications
        scheduleNotifications(times, phoneNumber, name, dosage);

        res.status(200).json({ message: 'Medication updated and notifications rescheduled!' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to update medication.' });
    }
});

// GET route to retrieve all medications for a user
router.get('/all', verifyToken, async (req, res) => {
    try {
        const userMedications = await UserMedications.findOne({ userId: req.user.id });

        if (!userMedications) {
            return res.status(404).json({ message: 'No medications found.' });
        }

        res.status(200).json(userMedications.medications);
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ error: 'Failed to fetch medications.' });
    }
});

module.exports = router;
