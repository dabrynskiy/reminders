import { Router } from "express";
import ReminderController from "./controllers/reminder.controller";

const router = Router();

// CREATE
router.post('/reminders', ReminderController.create);

// READ
router.get('/reminders', ReminderController.getAll);
router.get('/reminders/:id', ReminderController.getById);

// UPDATE
router.put('/reminders/:id', ReminderController.updateById);

// DELETE
router.delete('/reminders/:id', ReminderController.delete)

export default router;