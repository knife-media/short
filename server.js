require('dotenv').config();

const express = require('express');
const database = require('./utils/database');

const app = express();

/**
 * Redirect knife.media posts with social sources
 */
app.get('^/:source(tg|vk|fb|ok)/:keyword(*)', async (req, res, next) => {
  try {
    if (!req.params.keyword) {
      return next();
    }

    // We make sure links are case insensitive
    let keyword = req.params.keyword.toLowerCase();

    if (!keyword.match(/^[a-z0-9-_\/]+$/)) {
      return next();
    }

    // Remove trailing slashes
    keyword = keyword.replace(/^\/+|\/+$/g, '');

    const sources = {
      tg: '?utm_source=telegram&utm_medium=editorial',
      vk: '?utm_source=vkontakte&utm_medium=editorial',
      ok: '?utm_source=odnoklassniki&utm_medium=editorial',
      fb: '?utm_source=facebook&utm_medium=editorial'
    };

    const query = 'INSERT INTO social (keyword, source) VALUES (?, ?) ON DUPLICATE KEY UPDATE clicks = clicks + 1';

    // Make database query
    await database.query(query, [keyword, req.params.source]);

    res.redirect('https://knife.media/' + keyword + sources[req.params.source]);
  } catch(err) {
    return next(err);
  }
});

/**
 * Route primary named location
 */
app.get('^/:keyword([a-z0-9-]{1,200})/?$', async (req, res, next) => {
  try {
    const [rows] = await database.query('SELECT * FROM urls WHERE keyword = ? LIMIT 1', [req.params.keyword]);

    if (rows.length === 0) {
      return next();
    }

    // Make database query
    await database.query('UPDATE urls SET clicks = clicks + 1 WHERE keyword = ?', [req.params.keyword]);

    res.redirect(rows[0].url);
  } catch(err) {
    return next(err);
  }
});

/**
 * Handle errors
 */
app.use((err, req, res, next) => {
  if (err.message) {
    console.error(err.message);
  }

  return next();
});

/**
 * Show default index template
 */
app.use((req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

/**
 * Let's roll
 */
app.listen(process.env.PORT || 3000);
