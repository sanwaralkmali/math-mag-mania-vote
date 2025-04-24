const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Schema
const magazineSchema = new mongoose.Schema({
  id: String,
  title: String,
  grade: String,
  coverImage: String,
  flipHtml5Url: String,
  qrCodeImage: String,
  votes: { type: Number, default: 0 }
});

const Magazine = mongoose.model('Magazine', magazineSchema);

// Routes
app.get('/api/magazines', async (req, res) => {
  try {
    const magazines = await Magazine.find();
    res.json(magazines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/vote/:magazineId', async (req, res) => {
  try {
    const magazine = await Magazine.findOne({ id: req.params.magazineId });
    if (!magazine) {
      return res.status(404).json({ message: 'Magazine not found' });
    }
    magazine.votes += 1;
    await magazine.save();
    res.json(magazine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/unvote/:magazineId', async (req, res) => {
  try {
    const magazine = await Magazine.findOne({ id: req.params.magazineId });
    if (!magazine) {
      return res.status(404).json({ message: 'Magazine not found' });
    }
    if (magazine.votes > 0) {
      magazine.votes -= 1;
      await magazine.save();
    }
    res.json(magazine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/math-mag-mania')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 