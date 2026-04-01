const express = require("express");
const app = express();
const HOST = "http://localhost"
const PORT = 3000;
const SCHEME = HOST + ":" + PORT;

app.use((req, res, next) => {
    console.log(`${req.method} method from ${SCHEME}/`);
    next();
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send(`Hello World! Try to send some JSON files to
        <br> GET (any),
        <br> POST (param: user/:id),
        <br> PUT (param: user/:id, JSON: { "id": number }),
        <br> DELETE (param: users/:id)
        <br> using Postman or similar tool!
        <br>
        <br> Go to the <a href="${SCHEME}/params">/params</a> endpoint to see available params that you can handle`
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

// Handling diffenent parameters

// Starting point for params
app.get('/params', (req, res) => {
    res.send(`Params to handle (via GET method):
        <ul>
            <li>
                Route parameters
                (/params/route/:&lt;param. Could be anything, like string,
                number etc (but not arrays or objects for god's sake.
                Even though I think it's technically possible)&gt;)
            </li>
            <li>
                Query parameters (/params/query?&lt;query key&gt;=&lt;query value&gt;)
            </li>
        </ul>
        Params to handle (via POST or PUT method).
        <span style="font-weight: bold;">
            <br>Use Postman or similar tool to send POST/PUT
            request and get the response contents):
        </span>
        <ul>
            <li>
                Request body parameters (send JSON file)
            </li>
        </ul>
        Of couse, you could also combine these properties`
    );
});

// Route parameter
app.get('/params/route/:param', (req, res) => {
    res.send(`The route param is: ${req.params.param}`)
});

// Query parameter
app.get('/params/query', (req, res) => {
    const queryKey = req.query.query;
    res.send(`Searching for ${queryKey}`);
});

// Respinse body parameter (POST)

app.post('/params/body/post', (req, res) => {
    const body = req.body;
    res.send(`POST response body parameter contents: ${body}`);
});

app.listen(PORT, () => {
    console.log("Listening on port 3000");
});