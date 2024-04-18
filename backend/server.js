// backend/server.js
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { analyzeSentiment } = require('./sentimentAnalysis');

const app = express();
const port = 3001;

app.use(cors()); // Enable CORS for all routes

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { file } = req;
    const text = await analyzeSentiment(file.path);
    res.send(text);
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    res.status(500).send('An error occurred');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
