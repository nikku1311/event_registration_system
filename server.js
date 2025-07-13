const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.post('/submit', (req, res) => {
  const { name, email, event_name } = req.body;
  const query = 'INSERT INTO registrations (name, email, event_name) VALUES (?, ?, ?)';
  connection.query(query, [name, email, event_name], (err) => {
    if (err) throw err;
    res.send('<h3>Thank you for registering!</h3><a href="/">Go Back</a>');
  });
});

app.get('/admin', (req, res) => {
  const query = 'SELECT * FROM registrations';
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.render('registrations', { registrations: results });
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});