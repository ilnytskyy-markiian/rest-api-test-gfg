const express = require("express");
const app = express();
const PORT = 3000;

app.use((req, res, next) => {
    console.log(`${req.method} method from http://localhost:${PORT}${req.url}`);
    next();
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send(`Hello World! Try to send some JSON files to
        GET (any),
        POST (param: user/:id),
        PUT (param: user/:id, JSON: { "id": number }),
        DELETE (param: users/:id)
        using Postman or similar tool!`
    );
});

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

app.listen(PORT, () => {
    console.log("Listening on port 3000");
});