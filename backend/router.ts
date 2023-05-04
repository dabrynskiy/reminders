import { Router, Request, Response } from "express";

const router = Router();

router.get('/hello', (request, response) => {
    console.log('GET request is coming to hello api');
    response.json({ reminders: "GET request is coming to hello api" });
});

export default router;