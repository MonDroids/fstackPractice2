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

// Put - хэрэглэгчийн мэдээллийг шинэчлэх
app.put('/users/:id', (req, res) => {
    const {id} = req.params;
    const {name, email} = req.body;

    let updated = false;
    users = users.map((user) => {
        if (user.id === parseInt(id)) {
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

// Delete - Хэрэглэгч устгах
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    if (users.some((user) => user.id === parseInt(id))) {
        users = users.filter((user) => user.id !== parseInt(id));
        return res.status(204).json({ message: 'User deleted successfully' });
    } else {
        users = users.filter((user) => user.id !== parseInt(id));
        res.status(404).json({ message: 'User not found' });
    }
});



app.listen(port, () => {
    console.log(`Cэрвэр ажиллаж байна http://localhost:${port}`);
});