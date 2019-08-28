const express = require('express');
const mysql = require('mysql');

const cfg = {
  srv: {
    port: 5000
  },
  db: {
    mysql: {
      host: 'localhost',
      user: 'mysql_select',
      password: '123456',
      database: 'acme'
    }
  }
};

// MySQL DB connection
const db = mysql.createConnection(cfg.db.mysql);
db.connect(err => {
  if (err) console.error(err.code, ':', err.sqlMessage);
});

// Start the app
const app = express();
app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';

  db.query(query, (err, result) => {
    if (!err) {
      res.send(result);
    } else {
      console.error(err.sqlMessage);
    }
  });
});

app.get('/', (req, res) => {
  res.send(`Hello world, use the http://localhost:${cfg.srv.port}/users path to get the results of the query!`);
});
// db.end();

// Start server Listening
app.listen(cfg.srv.port, () => console.log(`Server started on ${cfg.srv.port}`));
