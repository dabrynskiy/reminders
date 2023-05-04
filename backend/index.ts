import { Express } from 'express';
import express from 'express';

const PORT = process.env.port || 3001;

const app: Express = express();

const reminders: string[] = []; // Список напоминаний, пока нет БД

app.use( express.urlencoded({extended: false}) );

app.use( express.json() );

app.listen(PORT, () => {
    console.log('Server starting');
});

app.get('/api/reminders', (request, response) => {
    console.log('GET request is coming');
    
    response.json(
        { reminders: reminders }
    );
});

app.post('/api/reminders', (request, response) => {
    console.log('POST request is coming');

    reminders.push(request.body.reminder)
    response.json(
        { reminders: reminders }
    )
});