const Appointment = require('../models/appointmentModels');

const bookAppointment = async (req, res) => {
    const { date, time } = req.body;

    // Parse and validate input
    if (!date || !time || !isValidDateFormat(date) || !isValidTimeFormat(time)) {
        return res.status(400).json({ error: "Invalid date or time format." });
    }

    // Ensure the date is a future date
    const currentDate = new Date();
    const appointmentDate = new Date(date);
    if (appointmentDate <= currentDate) {
        return res.status(400).json({ error: "Appointment date must be in the future." });
    }

    // Simulate availability checking
    if (time === "15:00") {
        return res.status(400).json({ error: "Appointment slot is unavailable." });
    }

    // Confirm booking
    const appointment = new Appointment({ date, time });
    await appointment.save();
    res.status(201).json({ message: "Appointment booked successfully.", appointment });
};

// Helper function to validate date format (YYYY-MM-DD)
const isValidDateFormat = (date) => {
    const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
    return dateFormat.test(date);
};

// Helper function to validate time format (HH:mm)
const isValidTimeFormat = (time) => {
    const timeFormat = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return timeFormat.test(time);
};

module.exports = { bookAppointment };
