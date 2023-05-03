const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.port || 3001;

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log('Server starting');
});

app.get('/api/hello', (request, response) => {
    response.json(
        { get: "Hello get request!" }
    );
});

app.post('/api/hello', (request, response) => {
    response.json(
        { post: "Hello post request!", requestBody: request.body }
    )
})