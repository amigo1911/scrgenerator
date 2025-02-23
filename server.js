const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors()); // Enable CORS for frontend requests

// Load airport data
const filePath = './airports.json';

app.post('/update-airport', (req, res) => {
    const updatedAirport = req.body;

    fs.readFile(filePath, (err, data) => {
        if (err) return res.status(500).json({ message: 'Error reading file' });

        let airports = JSON.parse(data);
        const index = airports.findIndex(a => a.code === updatedAirport.code);

        if (index !== -1) {
            airports[index] = updatedAirport;

            fs.writeFile(filePath, JSON.stringify(airports, null, 2), (err) => {
                if (err) return res.status(500).json({ message: 'Error saving data' });
                res.json({ message: 'Airport updated successfully!' });
            });
        } else {
            res.status(404).json({ message: 'Airport not found' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});