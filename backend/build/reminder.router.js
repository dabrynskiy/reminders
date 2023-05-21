"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reminder_controller_1 = __importDefault(require("./controllers/reminder.controller"));
const router = (0, express_1.Router)();
// CREATE
router.post('/reminders', reminder_controller_1.default.create);
// READ
router.get('/reminders', reminder_controller_1.default.get);
router.get('/reminders/:id', reminder_controller_1.default.getById);
// UPDATE
router.put('/reminders/:id', reminder_controller_1.default.updateById);
// DELETE
router.delete('/reminders/:id', reminder_controller_1.default.delete);
exports.default = router;
