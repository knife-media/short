require('dotenv').config();

const express = require('express');
const database = require('./utils/database');
const requests = require('./utils/requests');

const app = express();

/**
 * Redirect content posts with social sources
 */
app.get('^/:source(tg|vk|fb|ok)/:keyword(*)', async (req, res, next) => {
  if (req.headers.host === process.env.PROMO_HOST) {
    return next();
  }

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

    res.redirect(process.env.CONTENT_ORIGIN + keyword + sources[req.params.source]);
  } catch(err) {
    return next(err);
  }
});

/**
 * Route ord location
 */
app.get('^/ord/?', async (req, res, next) => {
  if (Object.keys(req.query).length < 1) {
    return next();
  }

  const params = new URLSearchParams(req.query).toString();

  // Create source AdFox link
  const source = process.env.ADFOX_LINK + '?' + params;

  try {
    const [rows] = await database.query('SELECT * FROM ord WHERE params = ? LIMIT 1', [params]);

    if (rows.length < 1) {
      const destination = await requests.destination(source);

      if (destination !== null) {
        await database.query('INSERT INTO ord (params, destination, clicks) VALUES (?, ?, 1)', [params, destination]);
      }

      return res.redirect(source);
    }

    // Update clicks for this url
    await database.query('UPDATE ord SET clicks = clicks + 1 WHERE params = ?', [params]);

    const available = await requests.available(source);

    if (available) {
      return res.redirect(source);
    }

    res.redirect(rows[0].destination);
  } catch(err) {
    return next(err);
  }
});

/**
 * Route primary named location
 */
app.get('^/:keyword([a-z0-9-]{1,200})/?$', async (req, res, next) => {
  const query = 'SELECT * FROM urls WHERE keyword = ? AND host = ? LIMIT 1';

  try {
    const [rows] = await database.query(query, [req.params.keyword, req.headers.host]);

    if (rows.length === 0) {
      return next();
    }

    // Make database query
    await database.query('UPDATE urls SET clicks = clicks + 1 WHERE id = ?', [rows[0].id]);

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
  if (req.headers.host === process.env.PROMO_HOST) {
    return res.redirect(process.env.PROMO_ORIGIN);
  }

  res.sendFile('index.html', { root: __dirname });
});

/**
 * Let's roll
 */
app.listen(process.env.PORT || 3000);
