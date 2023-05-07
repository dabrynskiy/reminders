"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reminder_router_1 = __importDefault(require("./reminder.router"));
const PORT = process.env.port || 3001;
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use('/api', reminder_router_1.default);
app.listen(PORT, () => {
    console.log('Server starting');
});
