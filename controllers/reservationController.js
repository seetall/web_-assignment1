const Reservation = require("../models/reservationModels");

const makeReservation = async (req, res) => {
    const { userId, eventDate, numberOfGuests } = req.body;

    // Validation
    const currentDate = new Date();
    const reservationDate = new Date(eventDate);

    if (!userId || !eventDate || !numberOfGuests) {
        return res.status(400).json({ error: "All fields (userId, eventDate, numberOfGuests) are required." });
    }

    if (reservationDate <= currentDate) {
        return res.status(400).json({ error: "Event date must be in the future." });
    }

    if (numberOfGuests <= 0) {
        return res.status(400).json({ error: "Number of guests must be a positive number." });
    }

    try {
        // Save reservation to the database
        const newReservation = new Reservation({
            userId,
            eventDate,
            numberOfGuests,
        });
        await newReservation.save();
    
        // Respond with the saved reservation details
        res.status(201).json({ reservation: newReservation });
    } catch (error) {
        console.error("Error saving reservation:", error);
        res.status(500).json({ error: "Failed to save reservation." });
    }
    
};

module.exports = { makeReservation };
