"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const PORT = process.env.port || 3001;
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.listen(PORT, () => {
    console.log('Server starting');
});
app.get('/api/hello', (request, response) => {
    console.log('GET request is coming');
    response.json({ get: "Hello get request!" });
});
app.post('/api/hello', (request, response) => {
    console.log('POST request is coming');
    response.json({ post: "Hello post request!", requestBody: request.body });
});
