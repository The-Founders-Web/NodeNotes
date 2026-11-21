import express from 'express';
import cors from 'cors';

const app = express();

// Middleware

app.use(cors());
app.use(express.json());

let data = [
    { id: 1, note: 'I am learning Node.js'},
    { id: 2, note: 'I am learning Express.js'},
    { id: 3, note: 'Why am I Alive?'},
];

// CRUD Operations
// C -> CREATE -> POST REQUEST
// R -> READ -> GET REQUEST
// U -> UPDATE -> PUT REQUEST
// D -> DELETE -> DELETE REQUEST

// API routes

// GET Request - READING DATA

app.get('/', (req, res) => {
    res.json(data);
});

// POST Request - CREATING DATA
app.post('/', (req, res) => {
    const { note } = req.body;
    data.push({ id: data.length + 1, note });

    // Send a response back to the client with status code 201 (Created) and a success message
    res.status(201).send('Note added successfully!');
});

// PUT Request

app.put('/', (req, res) => {
    const { id, note } = req.body;
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
        data[index] = { id, note };
        res.send('Note updated successfully!');
    } else {
        res.status(404).send('Note not found.');
    }
});

// DELETE Request

app.delete('/', (req, res) => {
    const { id } = req.body;
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
        data.splice(index, 1);
        res.send('Note deleted successfully.');
    } else {
        res.status(404).send('Note not found.');
    }
});



// Define the PORT number
const PORT = 3000; 

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});