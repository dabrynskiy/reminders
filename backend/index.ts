import { Express } from 'express';
import express from 'express';
import bodyParser from 'body-parser';

const PORT = process.env.port || 3001;

const app: Express = express();

app.use( bodyParser.urlencoded({extended: false}) );

app.use( bodyParser.json() );

app.listen(PORT, () => {
    console.log('Server starting');
});

app.get('/api/hello', (request, response) => {
    console.log('GET request is coming');
    
    response.json(
        { get: "Hello get request!" }
    );
});

app.post('/api/hello', (request, response) => {
    console.log('POST request is coming');

    response.json(
        { post: "Hello post request!", requestBody: request.body }
    )
});