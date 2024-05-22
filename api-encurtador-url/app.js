const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { mongoURI } = require('./config');
const urlRoutes = require('./routes/url');

const app = express();

app.use(bodyParser.json());

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/url', urlRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
