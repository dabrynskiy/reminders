"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/hello', (request, response) => {
    console.log('GET request is coming to hello api');
    response.json({ reminders: "GET request is coming to hello api" });
});
exports.default = router;
