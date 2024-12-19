import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';  // Required to write to a file
import path from 'path';  // Required to handle file paths
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const port = 5000;


// Path to the data.json file
// import data from ''

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(bodyParser.json());

// Now you can use __dirname as usual
const dataFilePath = path.join(__dirname, './../data.json');


// Read data from the JSON file
const readDataFromFile = () => {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(data);
}

// Write updated data to the JSON file
const writeDataToFile = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

// Send data.json on a GET request
app.get('/', (req, res) => {
    const data = readDataFromFile();
    res.json(data);  // Send JSON data as response
});

// Handle POST request, modify the data, and save it back
app.post('/', (req, res) => {
    const newData = req.body;  // Incoming data to be added
    const data = readDataFromFile();  // Read the current data
    
    // Add the new data to the existing data
    const updatedData = [...data, newData];

    // Write the updated data back to the file
    writeDataToFile(updatedData);

    // Respond to the client
    res.status(201).send('Data added successfully!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
