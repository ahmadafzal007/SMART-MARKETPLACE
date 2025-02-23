const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require('./config/db'); // Updated to use Mongoose connection
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());

// CORS setup
app.use(cors({
    origin: '*'
}));

// API Routes
app.use('/api/auth', authRoutes);

// Handle 404
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'API route not found' });
});

// Start server
const PORT = process.env.PORT || 5002;
mongoose.connection.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});