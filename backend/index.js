const express = require('express');

const PORT = process.env.port || 3001;

const app = express();

app.listen(PORT, () => {
    console.log('Server starting');
});

app.get('/api/hello', (request, response) => {
    response.json(
        { greeting: "hello from api" }
    );
});