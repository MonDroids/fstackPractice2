const express = require('express');
const cors = require('cors');
const app = express();
const port = 3002;

app.use(express.json());
app.use(cors());

let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'John Smith', email: 'smith@example.com' },
];

app.get('/users', (req, res) => {
    res.status(200).json(users);
});

app.post('/users', (req, res) => {
    const newUser = req.body;
    newUser.id = users.length + 1;
    users.push(newUser);
    res.status(201).json(newUser);
});

app.listen(port, () => {
    console.log(`Cэрвэр ажиллаж байна http://localhost:${port}`);
});