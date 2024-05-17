const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection
const databaseUrl = process.env.DATABASE_URL || 'sqlite:./moodmelodydatabase.db';
const sequelize = new Sequelize(databaseUrl, {
  dialect: databaseUrl.startsWith('postgres') ? 'postgres' : 'sqlite',
  logging: false,
  dialectOptions: databaseUrl.startsWith('postgres') ? {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  } : {}
});

// Models
const Music = sequelize.define('Music', {
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  mood: { type: DataTypes.STRING, allowNull: false },
  url: { type: DataTypes.STRING, unique: true, allowNull: false },
  ctg: { type: DataTypes.STRING, unique: true, allowNull: false }
}, { tableName: 'music' });

const Image = sequelize.define('Image', {
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  mood: { type: DataTypes.STRING, allowNull: false },
  url: { type: DataTypes.STRING, unique: true, allowNull: false },
  ctg: { type: DataTypes.STRING, unique: true, allowNull: false }
}, { tableName: 'images' });

// Synchronize all models with the database
sequelize.sync();

// Routes
app.get('/test', (req, res) => {
  res.json({ message: 'The server is running ooo..hhh.' });
});

app.post('/api/musics', async (req, res) => {
  try {
    const newMusics = await Music.bulkCreate(req.body, { validate: true });
    res.status(201).json(newMusics);
  } catch (error) {
    res.status(500).json({ message: 'Error creating music', error: error.message });
  }
});

app.get('/api/musics', async (req, res) => {
  try {
    const musics = await Music.findAll();
    res.status(200).json(musics);
  } catch (error) {
    res.status(500).json({ message: 'error getting musics', error: error.message });
  }
});

app.delete('/api/musics', async (req, res) => {
  try {
    await Music.destroy({ where: {} });
    res.status(200).json({ message: 'All data deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting data', error: error.message });
  }
});

// images

app.post('/api/images', async (req, res) => {
  try {
    const newImages = await Image.bulkCreate(req.body, { validate: true });
    res.status(201).json(newImages);
  } catch (error) {
    res.status(500).json({ message: 'Error creating image', error: error.message });
  }
});

app.get('/api/images', async (req, res) => {
  try {
    const images = await Image.findAll();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: 'error getting images', error: error.message });
  }
});

app.delete('/api/images', async (req, res) => {
  try {
    await Image.destroy({ where: {} });
    res.status(200).json({ message: 'All data deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting data', error: error.message });
  }
});


// Additional routes for images similarly...

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Music Mood API!' });
});

app.get('/favicon.ico', (req, res) => {
  res.status(204).json({ message: 'NO such file as favicon.ico!' });
});

// Start server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
