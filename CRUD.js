const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json()); //i don't know even  
let users = [];
app.post('/users', (req, res) => {
  const { name, email, password,karthiswifename } = req.body;
  const newUser = { id: users.length + 1, name, email, password,karthiswifename };
  users.push(newUser);
  res.status(201).json({massage:newUser});

});

app.get('/users', (req, res) => {
    res.status(200).json(users);
  });

app.put("/users/:id",(req,res)=>{
  
})

app.listen(3000, () => console.log('Server started on port 3000'));
