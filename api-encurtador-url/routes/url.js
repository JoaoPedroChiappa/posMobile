const express = require('express');
const router = express.Router();
const Url = require('../models/Url');

router.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;
  try {
    let url = await Url.findOne({ originalUrl });
    if (url) {
      res.json(url);
    } else {
      url = new Url({ originalUrl });
      await url.save();
      res.json(url);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }
});

router.get('/:shortUrl', async (req, res) => {
  try {
    const url = await Url.findOne({ shortUrl: req.params.shortUrl });
    if (url) {
      res.redirect(url.originalUrl);
    } else {
      res.status(404).json('No URL found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }
});

router.get('/date/:date', async (req, res) => {
    const { date } = req.params;
    try {
      const urls = await Url.find({ date: { $gte: new Date(date), $lt: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000) } });
      res.json(urls);
    } catch (err) {
      console.error(err);
      res.status(500).json('Server error');
    }
  });

  router.get('/short/:shortUrl', async (req, res) => {
    try {
      const url = await Url.findOne({ shortUrl: req.params.shortUrl });
      if (url) {
        res.json(url);
      } else {
        res.status(404).json('No URL found');
      }
    } catch (err) {
      console.error(err);
      res.status(500).json('Server error');
    }
  });

module.exports = router;
