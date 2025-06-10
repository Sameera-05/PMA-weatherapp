
const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const { Parser } = require('json2csv');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


// SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './weather.db'
});


const Search = sequelize.define('Search', {
  location: { type: DataTypes.STRING, allowNull: false },
  temperature: { type: DataTypes.FLOAT, allowNull: false },
  timestamp: { type: DataTypes.DATE, allowNull: false }
});


sequelize.sync();

// POST 
app.post('/search', async (req, res) => {
  try {
    const { location, temperature } = req.body;
    const newSearch = await Search.create({
      location,
      temperature,
      timestamp: new Date()
    });
    res.status(201).json(newSearch);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save search' });
  }
});

// GET 
app.get('/searches', async (req, res) => {
  try {
    const allSearches = await Search.findAll({ order: [['timestamp', 'DESC']] });
    res.json(allSearches);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch searches' });
  }
});

// DELETE 
app.delete('/search/:id', async (req, res) => {
  try {
    await Search.destroy({ where: { id: req.params.id } });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

// PUT 
app.put('/search/:id', async (req, res) => {
  try {
    const { location } = req.body;
    if (!location || location.trim() === '') {
      return res.status(400).json({ error: 'Location is required' });
    }
    const updated = await Search.update(
      { location },
      { where: { id: req.params.id } }
    );
    if (updated[0] === 0) {
      return res.status(404).json({ error: 'Record not found' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
});

// GET 
app.get('/export/json', async (req, res) => {
  try {
    const searches = await Search.findAll();
    res.setHeader('Content-disposition', 'attachment; filename=searches.json');
    res.setHeader('Content-type', 'application/json');
    res.json(searches);
  } catch (err) {
    res.status(500).json({ error: 'Failed to export JSON' });
  }
});

// GET 
app.get('/export/csv', async (req, res) => {
  try {
    const searches = await Search.findAll();
    const jsonSearches = searches.map(entry => entry.toJSON());
    const parser = new Parser();
    const csv = parser.parse(jsonSearches);

    res.header('Content-Type', 'text/csv');
    res.attachment('searches.csv');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ error: 'Failed to export CSV' });
  }
});
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
