const express = require("express");
const app = express();

app.use(express.json());

app.get('/users', (req, res) => {
    res.json({ message: "Returning list of users" });
});

app.post('/users', (req, res) => {
    const newUser = req.body;
    res.json({ message: "User created", user: newUser });
});

app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const updateUser = req.body;
    res.json({ message: `User with ID #${userId} updated`, updateUser});
});

app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.json({ message: `User with ID #${userId} has been sucessfully deleted`});
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});