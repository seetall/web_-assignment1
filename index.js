const express = require('express');
const connectDatabase = require('./database/database');
const dotenv = require('dotenv');

const app = express();
dotenv.config();
connectDatabase();

const PORT = process.env.PORT;

app.use(express.json());

app.get('/test', (req, res) => {
    res.send("Test API is working!...");
});

app.use('/api/user', require('./routes/contactRoutes'));
app.use('/api/reservations', require('./routes/reservationRoutes'));
app.use('/api/book-appointment', require('./routes/appointmentRoutes'));

app.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT} !`);
});
