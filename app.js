const express = require('express')
const app = express()
const cors = require('cors');

const searchRoutes = require('./routes/searchRoutes');

app.use(cors());
app.use(express.json());
app.use('/search', searchRoutes);

app.get('/*', (req, res) => {
    res.status(404).send('404 Not Found');
});

module.exports = app;
