/**
 * Custom simple URL shortener
 */

let express = require('express');
let mysql = require('mysql');

let app = express();

/**
 * Require settings
 */
require('dotenv').config();


/**
 * Set application port
 */
let port = process.env.PORT || 3000;

/**
 * Create mysql pool
 */
let pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

/**
 * Route primary named location
 */
app.get('^/:keyword([a-z0-9-]{1,200})/?$', (req, res, next) => {
  pool.getConnection((err, database) => {
    if (err) {
      return next();
    }

    // Find long url by keyword
    database.query('SELECT * FROM `urls` WHERE `keyword` = ? LIMIT 1', req.params.keyword, (err, rows) => {
      if (err || rows.length === 0) {
        return next();
      }

      // Increment clicks field
      database.query('UPDATE `urls` SET `clicks` = clicks + 1 WHERE `keyword` = ?', req.params.keyword);

      // Redirect to long url
      res.redirect(rows[0].url);
    });

    database.release();
  });
});


/**
 * Handle errors
 */
app.use((req, res) => {
  res.sendFile('index.html', { root: __dirname });
});


/**
 * Let's roll
 */
app.listen(port);

