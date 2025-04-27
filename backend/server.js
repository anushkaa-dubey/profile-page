const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Route to receive resume data
app.post('/submit', (req, res) => {
  console.log('Received data:', req.body);
  // In real apps, you would save this to a database
  res.json({ message: 'Resume data received successfully!' });
});

app.get('/', (req, res) => {
    res.send('Backend server is running!');
  });
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
