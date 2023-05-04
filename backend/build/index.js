"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const PORT = process.env.port || 3001;
const app = (0, express_1.default)();
const reminders = []; // Список напоминаний, пока нет БД
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use('/api', router_1.default);
app.listen(PORT, () => {
    console.log('Server starting');
});
app.get('/api/reminders', (request, response) => {
    console.log('GET request is coming');
    response.json({ reminders: reminders });
});
app.post('/api/reminders', (request, response) => {
    console.log('POST request is coming');
    reminders.push(request.body.reminder);
    response.json({ reminders: reminders });
});
