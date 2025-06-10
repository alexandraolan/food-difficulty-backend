const express = require('express');
const cors = require('cors');
const multer = require('multer');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

app.post('/estimate', upload.single('image'), (req, res) => {
  const { dish, description, cuisine } = req.body;
  const difficulty_score = Math.random();
  const difficulty_level = difficulty_score > 0.66 ? 'Hard' : difficulty_score > 0.33 ? 'Moderate' : 'Easy';

  res.json({
    dish,
    cuisine,
    difficulty_score,
    difficulty_level,
    features: {
      prompt_clarity: Math.random().toFixed(2),
      ingredient_count: Math.floor(Math.random() * 10 + 1),
      cuisine_difficulty: Math.random().toFixed(2),
      image_score: Math.random(),
    }
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));