const express = require('express'); //Import the express framework
cors = require('cors');
const app = express(); //Create an express app
const port = 3001; //port run the server on

app.use(express.json()); //Middleware to parse Json bodies
app.use(cors()); //CORS middleware

let user = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'John Smith', email: 'smith@example.com' },
];

app.get('/users', (req, res) => {
    res.status(200).json(users); //Send the user data as JSON response
});

app.post('/users', (req, res) => {
    const newUser = req.body; //Get the new user data from request body
    newUser.id = user.length + 1; //Assign a new ID
    newUser.id = id; //Assign the ID to new user object
    user.push(newUser); //Add the new user to the array
    res.status(201).json(newUser); //Send the newly created user as JSON response
});

app.listen(port, () => {
    console.log(`Cэрвэр ажиллаж байна http://localhost:${port}`); //Log the server URL
});


