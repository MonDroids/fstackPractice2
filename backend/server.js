const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid'); // UUID импортлох
const app = express();
const port = 3002;

app.use(express.json());
app.use(cors());

let users = [
    { id: uuidv4(), name: 'John Doe', email: 'john@example.com' },
    { id: uuidv4(), name: 'John Smith', email: 'smith@example.com' },
];

// Хэрэглэгчид авах
app.get('/users', (req, res) => {
    res.status(200).json(users);
});

// Хэрэглэгч нэмэх
app.post('/users', (req, res) => {
    const newUser = req.body;
    newUser.id = uuidv4(); // дахин давтагдахгүй id
    users.push(newUser);
    res.status(201).json(newUser);
});

// Хэрэглэгч шинэчлэх
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    let updated = false;
    users = users.map((user) => {
        if (user.id === id) {
            user.name = name;
            user.email = email;
            updated = true;
        }
        return user;
    });

    if (updated) {
        res.status(200).json({ message: 'User updated successfully' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Хэрэглэгч устгах
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    if (users.some((user) => user.id === id)) {
        users = users.filter((user) => user.id !== id);
        return res.status(200).json({ message: 'User deleted successfully' });
    } else {
        return res.status(404).json({ message: 'User not found' });
    }
});

app.listen(port, () => {
    console.log(`Cэрвэр ажиллаж байна http://localhost:${port}`);
});
