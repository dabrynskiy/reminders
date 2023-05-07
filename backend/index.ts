import { Express } from 'express';
import express from 'express';
import router from './reminder.router';

const PORT = process.env.port || 3001;

const app: Express = express();

app.use( express.urlencoded({extended: false}) );

app.use( express.json() );

app.use('/api', router);

app.listen(PORT, () => {
    console.log('Server starting');
});