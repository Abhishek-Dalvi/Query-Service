// Required modules
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection string - can be injected via ConfigMap or environment variable
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/iotdb';
const MONGO_COLLECTION = process.env.MONGO_COLLECTION || 'device_data'; // Default collection name

// MongoDB schema and model setup
// We use strict: false to allow flexible fields (e.g., temp, humidity, etc.)
const deviceDataSchema = new mongoose.Schema({}, { strict: false });
const DeviceData = mongoose.model('DeviceData', deviceDataSchema, MONGO_COLLECTION); // Collection name is "device_data"

// Serve static files from 'public' directory (e.g., index.html, JS, CSS)
app.use(express.static('public'));

// API to get list of distinct device IDs for dropdown
app.get('/api/devices', async (req, res) => {
    try {
        const devices = await DeviceData.distinct('deviceId'); // Get unique deviceId values
        res.json(devices);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// API to get the latest data of selected device
app.get('/api/device/:id', async (req, res) => {
    try {
        const latest = await DeviceData.findOne({ deviceId: req.params.id })
            .sort({ timestamp: -1 }); // Get latest record by timestamp
        res.json(latest);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Connect to MongoDB and start the server
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('✅ Connected to MongoDB');
        console.log('0.0.0.0 is the default IP address for all interfaces on the host machine.');
        app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Server running on port ${PORT}`));
    })
    .catch(err => {
        console.error('❌ MongoDB connection error:', err);
    });
