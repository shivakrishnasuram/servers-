const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json()); 
let users = [];
app.post('/users', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newUser = { id: users.length + 1, name, email, password };

  users.push(newUser);
  res.status(201).json(newUser);
});

app.get('/users', (req, res) => {
    res.status(200).json(users);
  });

app.listen(3000, () => console.log('Server started on port 3000'));
